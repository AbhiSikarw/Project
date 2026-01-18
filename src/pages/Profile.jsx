import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Trash2, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getPostsByUser, deletePost } from '../services/postService';
import PostCard from '../components/PostCard';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // In production, fetch user profile by id
    // For now, use current user if id matches or is not provided
    const targetUserId = id || user.id;
    setProfileUser(user); // In production, fetch from API

    loadUserPosts(targetUserId);
  }, [id, user, navigate]);

  const loadUserPosts = (userId) => {
    setLoading(true);
    const userPosts = getPostsByUser(userId);
    setPosts(userPosts);
    setLoading(false);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
      loadUserPosts(user.id);
    }
  };

  if (!user || !profileUser) {
    return null;
  }

  const isOwnProfile = user.id === profileUser.id;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={profileUser.avatar}
              alt={profileUser.username}
              className="h-32 w-32 rounded-full border-4 border-primary-200"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profileUser.username}
              </h1>
              <p className="text-gray-600 mb-4">{profileUser.email}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{posts.length} {posts.length === 1 ? 'Post' : 'Posts'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isOwnProfile ? 'My Posts' : `${profileUser.username}'s Posts`}
            </h2>
            {isOwnProfile && (
              <button
                onClick={() => navigate('/create-post')}
                className="btn-primary flex items-center space-x-2"
              >
                <Edit className="h-5 w-5" />
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
              {isOwnProfile && (
                <button
                  onClick={() => navigate('/create-post')}
                  className="btn-primary"
                >
                  Create your first post!
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="relative">
                  <PostCard post={post} onLike={() => loadUserPosts(user.id)} />
                  {isOwnProfile && (
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

