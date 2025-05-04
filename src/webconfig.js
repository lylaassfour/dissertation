const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry file
  output: {
    path: path.resolve(__dirname, 'build'), // The build folder
    filename: 'bundle.js', // The output bundle
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // File extensions Webpack should resolve
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Handle JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets for React
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Handle images
        type: 'asset/resource',
      },
      {
        test: /\.html$/, // Handle HTML files
        use: ['html-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Serve static files from 'public' folder
    compress: true, // Enable gzip compression
    port: 3000, // Port number
    hot: true, // Enable hot module replacement (HMR)
    historyApiFallback: true, // Fallback to index.html for single-page apps (React Router)
    setupMiddlewares: (middlewares, devServer) => {
      // Custom middleware can be added here
      console.log('Setting up middlewares...');
      return middlewares;
    },
    // Remove 'onAfterSetupMiddleware' from here
  },
  devtool: 'source-map', // Generate source maps for debugging
  mode: 'development', // Set mode to 'development' or 'production'
};
