import { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { likePost } from '../services/postService';

const PostCard = ({ post, onLike }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(
    user ? post.likedBy?.includes(user.id) : false
  );
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  const handleLike = () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    const updatedPost = likePost(post.id, user.id);
    if (updatedPost) {
      setIsLiked(updatedPost.likedBy.includes(user.id));
      setLikesCount(updatedPost.likes);
      if (onLike) onLike(updatedPost);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="card">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={post.userAvatar}
          alt={post.username}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{post.username}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{post.location}</span>
            <span className="mx-1">•</span>
            <Clock className="h-4 w-4" />
            <span>{formatTime(post.timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.location}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Post Description */}
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.description}</p>

      {/* Post Actions */}
      <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors ${
            isLiked
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments || 0}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors">
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;

