const { snacksDb, ratingsDb, commentsDb } = require('./db/supabaseDb');

// Transform Supabase snack format to API format
const transformSnack = (snack) => {
  return {
    id: snack.id,
    name: snack.name,
    country: snack.country,
    description: snack.description,
    type: snack.type,
    imageUrl: snack.image_url,
    photographer: snack.photographer,
    tags: snack.tags || [],
    ratings: {
      taste: Number(snack.base_taste_rating),
      spiciness: Number(snack.base_spiciness_rating),
      uniqueness: Number(snack.base_uniqueness_rating),
      count: snack.base_rating_count
    }
  };
};

// Transform rating entry format
const transformRating = (rating) => {
  return {
    taste: rating.taste,
    spiciness: rating.spiciness,
    uniqueness: rating.uniqueness,
    timestamp: new Date(rating.created_at).getTime()
  };
};

// Transform comment format
const transformComment = (comment) => {
  return {
    text: comment.text,
    author: comment.author,
    timestamp: new Date(comment.created_at).getTime()
  };
};

const buildRatingSummary = (snack, ratingEntries = []) => {
  const base = snack.ratings || { taste: 0, spiciness: 0, uniqueness: 0, count: 0 };
  const totalTaste = base.taste * (base.count || 0) + ratingEntries.reduce((acc, r) => acc + (r.taste || 0), 0);
  const totalSpice = base.spiciness * (base.count || 0) + ratingEntries.reduce((acc, r) => acc + (r.spiciness || 0), 0);
  const totalUnique = base.uniqueness * (base.count || 0) + ratingEntries.reduce((acc, r) => acc + (r.uniqueness || 0), 0);
  const count = (base.count || 0) + ratingEntries.length;

  if (count === 0) {
    return { taste: 0, spiciness: 0, uniqueness: 0, count: 0 };
  }

  return {
    taste: Number((totalTaste / count).toFixed(1)),
    spiciness: Number((totalSpice / count).toFixed(1)),
    uniqueness: Number((totalUnique / count).toFixed(1)),
    count
  };
};

const listSnacks = async () => {
  const snacks = await snacksDb.getAll();
  const results = [];

  for (const snack of snacks) {
    const transformedSnack = transformSnack(snack);
    const ratingEntries = await ratingsDb.getBySnackId(snack.id);
    const transformedRatings = ratingEntries.map(transformRating);
    const summary = buildRatingSummary(transformedSnack, transformedRatings);
    results.push({ ...transformedSnack, ratingSummary: summary });
  }

  return results;
};

const getSnack = async (id) => {
  const snack = await snacksDb.getById(id);
  if (!snack) return null;

  const transformedSnack = transformSnack(snack);
  const ratingEntries = await ratingsDb.getBySnackId(id);
  const transformedRatings = ratingEntries.map(transformRating);
  const summary = buildRatingSummary(transformedSnack, transformedRatings);

  return {
    snack: transformedSnack,
    ratingSummary: summary,
    ratingEntries: transformedRatings
  };
};

const addSnack = async (data) => {
  const required = ['name', 'country', 'description', 'type', 'imageUrl'];
  for (const field of required) {
    if (!data[field]) {
      return { error: `Missing field: ${field}` };
    }
  }

  const sanitizeNumber = (value, min = 1, max = 5) => {
    const num = Number(value);
    if (Number.isNaN(num)) return null;
    return Math.min(Math.max(num, min), max);
  };

  const snackData = {
    name: data.name,
    country: data.country,
    description: data.description,
    type: data.type,
    imageUrl: data.imageUrl,
    photographer: data.photographer || 'Photo by User',
    tags: Array.isArray(data.tags) && data.tags.length ? data.tags : [data.type],
    taste: sanitizeNumber(data.taste, 1, 5) || 3,
    spiciness: sanitizeNumber(data.spiciness, 1, 5) || 1,
    uniqueness: sanitizeNumber(data.uniqueness, 1, 5) || 3
  };

  const created = await snacksDb.create(snackData);
  return transformSnack(created);
};

const addRating = async (snackId, rating) => {
  const taste = Number(rating.taste);
  const spiciness = Number(rating.spiciness);
  const uniqueness = Number(rating.uniqueness);

  if ([taste, spiciness, uniqueness].some((v) => Number.isNaN(v) || v < 1 || v > 5)) {
    return { error: 'Ratings must be numbers between 1 and 5' };
  }

  // Check if snack exists
  const snack = await snacksDb.getById(snackId);
  if (!snack) {
    return { error: 'Snack not found' };
  }

  // Add rating
  await ratingsDb.create(snackId, { taste, spiciness, uniqueness });

  // Get all ratings for summary
  const ratingEntries = await ratingsDb.getBySnackId(snackId);
  const transformedRatings = ratingEntries.map(transformRating);
  const transformedSnack = transformSnack(snack);
  const summary = buildRatingSummary(transformedSnack, transformedRatings);

  return { summary, entries: transformedRatings };
};

const getRatings = async (snackId) => {
  const snack = await snacksDb.getById(snackId);
  if (!snack) {
    return { error: 'Snack not found' };
  }

  const ratingEntries = await ratingsDb.getBySnackId(snackId);
  const transformedRatings = ratingEntries.map(transformRating);
  const transformedSnack = transformSnack(snack);
  const summary = buildRatingSummary(transformedSnack, transformedRatings);

  return { summary, entries: transformedRatings };
};

const addComment = async (snackId, comment) => {
  if (!comment || !comment.text) {
    return { error: 'Comment text is required' };
  }

  const snack = await snacksDb.getById(snackId);
  if (!snack) {
    return { error: 'Snack not found' };
  }

  await commentsDb.create(snackId, {
    text: comment.text.trim(),
    author: comment.author || 'Anonymous'
  });

  // Return all comments
  const comments = await commentsDb.getBySnackId(snackId);
  return comments.map(transformComment);
};

const getComments = async (snackId) => {
  const snack = await snacksDb.getById(snackId);
  if (!snack) {
    return { error: 'Snack not found' };
  }

  const comments = await commentsDb.getBySnackId(snackId);
  return comments.map(transformComment);
};

const computeOverallAverage = (summary) => {
  if (!summary || summary.count === 0) return 0;
  return Number(((summary.taste + summary.spiciness + summary.uniqueness) / 3).toFixed(2));
};

const getLeaderboard = async () => {
  const snacks = await listSnacks();

  const topRated = [...snacks].sort((a, b) => computeOverallAverage(b.ratingSummary) - computeOverallAverage(a.ratingSummary));

  const spiciest = [...snacks].sort((a, b) => b.ratingSummary.spiciness - a.ratingSummary.spiciness);

  const mostUnique = [...snacks].sort((a, b) => b.ratingSummary.uniqueness - a.ratingSummary.uniqueness);

  const byCountry = Object.values(
    snacks.reduce((acc, snack) => {
      if (!acc[snack.country]) {
        acc[snack.country] = [];
      }
      acc[snack.country].push(snack);
      return acc;
    }, {})
  )
    .map((countrySnacks) => countrySnacks.sort((a, b) => computeOverallAverage(b.ratingSummary) - computeOverallAverage(a.ratingSummary))[0])
    .sort((a, b) => computeOverallAverage(b.ratingSummary) - computeOverallAverage(a.ratingSummary));

  const sweetFoods = snacks
    .filter((snack) => snack.type === 'dessert' || (snack.tags || []).includes('sweet'))
    .sort((a, b) => computeOverallAverage(b.ratingSummary) - computeOverallAverage(a.ratingSummary));

  return {
    topRated,
    spiciest,
    mostUnique,
    byCountry,
    sweetFoods
  };
};

module.exports = {
  listSnacks,
  getSnack,
  addSnack,
  addRating,
  getRatings,
  addComment,
  getComments,
  getLeaderboard,
  computeOverallAverage
};
