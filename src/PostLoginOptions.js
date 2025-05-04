import React from 'react';
import { Link } from 'react-router-dom';

const PostLoginOptions = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 rounded-3xl p-10 shadow-xl max-w-5xl w-full mx-4 border border-blue-600">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-wide">
            <span className="text-blue-500">AccessPilot</span> Portal
          </h1>
          <p className="text-gray-400 text-lg">Choose an option to get started with your journey.</p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Option 1: AccessPilot Download */}
          <div className="group relative bg-gray-800 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-blue-500">
            <div className="text-6xl mb-4 text-blue-500 animate-bounce">📥</div>
            <h2 className="text-2xl font-bold text-white mb-3">AccessPilot Download</h2>
            <p className="text-gray-300 mb-5 text-sm">
              Get the latest version of AccessPilot for your system and start exploring its features.
            </p>
            <a
              href="#download"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Download Now
            </a>
          </div>

          {/* Option 2: Setup Documentation */}
          <div className="group relative bg-gray-800 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-blue-500">
            <div className="text-6xl mb-4 text-blue-500 animate-bounce">📖</div>
            <h2 className="text-2xl font-bold text-white mb-3">Setup Documentation</h2>
            <p className="text-gray-300 mb-5 text-sm">
              Explore our detailed step-by-step guide and discover all the features of AccessPilot.
            </p>
            <Link
              to="/setup-documentation"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Read Docs
            </Link>
          </div>

          {/* Option 3: Access Dashboard */}
          <div className="group relative bg-gray-800 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-blue-500">
            <div className="text-6xl mb-4 text-blue-500 animate-bounce">📊</div>
            <h2 className="text-2xl font-bold text-white mb-3">Access Dashboard</h2>
            <p className="text-gray-300 mb-5 text-sm">
              Monitor and manage your AccessPilot system with our intuitive dashboard.
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Need help?{' '}
            <a href="#support" className="text-blue-400 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostLoginOptions;