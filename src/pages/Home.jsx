import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllPosts } from '../services/postService';
import PostCard from '../components/PostCard';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    setLoading(true);
    const allPosts = getAllPosts();
    setPosts(allPosts);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Safar</h1>
          <p className="text-xl mb-8 text-primary-100">
            Share your travel experiences safely with AI-powered content moderation
          </p>
          {user ? (
            <button
              onClick={() => navigate('/create-post')}
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Share Your Story</span>
            </button>
          ) : (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Travel Stories</h2>
          {user && (
            <button
              onClick={() => navigate('/create-post')}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No posts yet</p>
            {user ? (
              <button
                onClick={() => navigate('/create-post')}
                className="btn-primary"
              >
                Create the first post!
              </button>
            ) : (
              <p className="text-gray-500">Sign up to share your travel experiences</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={loadPosts} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

