// Post Service - Handles all post-related operations
// In production, this would interact with a backend API (Firebase, MongoDB, etc.)

let posts = JSON.parse(localStorage.getItem('safar_posts') || '[]');

// Initialize with sample posts if empty
if (posts.length === 0) {
  posts = [
    {
      id: '1',
      userId: 'sample1',
      username: 'TravelEnthusiast',
      userAvatar: 'https://ui-avatars.com/api/?name=TravelEnthusiast&background=0ea5e9&color=fff',
      location: 'Paris, France',
      description: 'Just visited the Eiffel Tower! What an amazing experience. The view from the top is breathtaking.',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      likes: 42,
      comments: 8,
      likedBy: [],
    },
    {
      id: '2',
      userId: 'sample2',
      username: 'Wanderlust',
      userAvatar: 'https://ui-avatars.com/api/?name=Wanderlust&background=10b981&color=fff',
      location: 'Tokyo, Japan',
      description: 'Cherry blossoms in full bloom! Spring in Japan is absolutely magical.',
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      likes: 67,
      comments: 12,
      likedBy: [],
    },
  ];
  localStorage.setItem('safar_posts', JSON.stringify(posts));
}

export const getAllPosts = () => {
  const storedPosts = JSON.parse(localStorage.getItem('safar_posts') || '[]');
  return storedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getPostById = (id) => {
  const posts = getAllPosts();
  return posts.find(post => post.id === id);
};

export const getPostsByUser = (userId) => {
  const posts = getAllPosts();
  return posts.filter(post => post.userId === userId);
};

export const createPost = (postData) => {
  const newPost = {
    id: Date.now().toString(),
    ...postData,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    likedBy: [],
  };
  
  const posts = getAllPosts();
  posts.unshift(newPost);
  localStorage.setItem('safar_posts', JSON.stringify(posts));
  return newPost;
};

export const updatePost = (id, updates) => {
  const posts = getAllPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    localStorage.setItem('safar_posts', JSON.stringify(posts));
    return posts[index];
  }
  
  return null;
};

export const deletePost = (id) => {
  const posts = getAllPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  localStorage.setItem('safar_posts', JSON.stringify(filteredPosts));
  return true;
};

export const likePost = (postId, userId) => {
  const posts = getAllPosts();
  const post = posts.find(p => p.id === postId);
  
  if (post) {
    const isLiked = post.likedBy.includes(userId);
    
    if (isLiked) {
      post.likes = Math.max(0, post.likes - 1);
      post.likedBy = post.likedBy.filter(id => id !== userId);
    } else {
      post.likes += 1;
      post.likedBy.push(userId);
    }
    
    localStorage.setItem('safar_posts', JSON.stringify(posts));
    return post;
  }
  
  return null;
};

export const searchPosts = (query) => {
  const posts = getAllPosts();
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(post => 
    post.location.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.username.toLowerCase().includes(lowerQuery)
  );
};

