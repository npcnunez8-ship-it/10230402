const { supabase } = require('../supabase');

if (!supabase) {
  throw new Error('Supabase client not initialized. Check your .env file for SUPABASE_URL and SUPABASE_ANON_KEY');
}

// Snacks operations
const snacksDb = {
  // Get all snacks
  async getAll() {
    const { data, error } = await supabase
      .from('snacks')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get snack by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('snacks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw error;
    }
    return data;
  },

  // Create a new snack
  async create(snackData) {
    const { data, error } = await supabase
      .from('snacks')
      .insert({
        name: snackData.name,
        country: snackData.country,
        description: snackData.description,
        type: snackData.type,
        image_url: snackData.imageUrl,
        photographer: snackData.photographer || 'Photo by User',
        tags: snackData.tags || [snackData.type],
        base_taste_rating: snackData.taste || 3.0,
        base_spiciness_rating: snackData.spiciness || 1.0,
        base_uniqueness_rating: snackData.uniqueness || 3.0,
        base_rating_count: 1
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update snack
  async update(id, updates) {
    const { data, error } = await supabase
      .from('snacks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete snack
  async delete(id) {
    const { error } = await supabase
      .from('snacks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Ratings operations
const ratingsDb = {
  // Get all ratings for a snack
  async getBySnackId(snackId) {
    const { data, error } = await supabase
      .from('ratings')
      .select('*')
      .eq('snack_id', snackId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Add a rating
  async create(snackId, ratingData) {
    const { data, error } = await supabase
      .from('ratings')
      .insert({
        snack_id: snackId,
        taste: ratingData.taste,
        spiciness: ratingData.spiciness,
        uniqueness: ratingData.uniqueness
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Comments operations
const commentsDb = {
  // Get all comments for a snack
  async getBySnackId(snackId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('snack_id', snackId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Add a comment
  async create(snackId, commentData) {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        snack_id: snackId,
        text: commentData.text.trim(),
        author: commentData.author || 'Anonymous'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

module.exports = {
  snacksDb,
  ratingsDb,
  commentsDb
};

