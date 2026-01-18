import { Shield, Globe, Heart, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Safar</h1>
          <p className="text-xl text-primary-100">
            A safe space for travelers to share their experiences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="card mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Safar is designed to create a positive and safe environment for travelers to share
            their experiences, connect with like-minded adventurers, and discover new destinations.
            Our AI-powered content moderation ensures that every story shared is respectful and
            appropriate for all audiences.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <Shield className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Safety</h3>
            <p className="text-gray-700">
              Advanced NLP technology automatically detects and moderates abusive content
              in real-time, ensuring a safe community for everyone.
            </p>
          </div>

          <div className="card">
            <Globe className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Community</h3>
            <p className="text-gray-700">
              Connect with travelers from around the world and discover amazing destinations
              through authentic stories and experiences.
            </p>
          </div>

          <div className="card">
            <Heart className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Journey</h3>
            <p className="text-gray-700">
              Document your travels with photos, stories, and locations. Your memories
              become inspiration for others.
            </p>
          </div>

          <div className="card">
            <Zap className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Moderation</h3>
            <p className="text-gray-700">
              Content is moderated as you type, providing instant feedback and ensuring
              your posts are appropriate before publishing.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="card">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Create an Account</h3>
                <p className="text-gray-700">
                  Sign up with your email and start your journey on Safar.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Share Your Story</h3>
                <p className="text-gray-700">
                  Write about your travel experience, add photos, and tag your location.
                  Our AI moderation ensures your content is appropriate.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Connect & Explore</h3>
                <p className="text-gray-700">
                  Discover amazing destinations, like and comment on posts, and connect
                  with fellow travelers from around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

