import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { getAllPosts, searchPosts } from '../services/postService';
import PostCard from '../components/PostCard';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchPosts(searchQuery);
      setFilteredPosts(results);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const loadPosts = () => {
    setLoading(true);
    const allPosts = getAllPosts();
    setPosts(allPosts);
    setFilteredPosts(allPosts);
    setLoading(false);
  };

  // Get unique locations for filter
  const uniqueLocations = [...new Set(posts.map(post => post.location))];

  const filterByLocation = (location) => {
    if (location === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.location === location));
    }
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Explore Travel Stories</h1>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, description, or username..."
              className="input-field pl-10"
            />
          </div>

          {/* Location Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => filterByLocation('all')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              All Locations
            </button>
            {uniqueLocations.slice(0, 10).map((location) => (
              <button
                key={location}
                onClick={() => filterByLocation(location)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-colors flex items-center space-x-1"
              >
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'} found
          </p>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No posts found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onLike={loadPosts} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

