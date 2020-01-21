const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
}

module.exports = (env, argv) => {
  const isProduction = env === 'production'
  
  return {
    plugins: [
      new MiniCSSExtractPlugin({
        filename: 'styles.css',
        // chunkFilename: '[id].css',
        // ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
      })
    ],
    // Entry is the application starting component file
    entry: ['babel-polyfill', './src/app.js'],  
    // Output is the file index.html needs to script in
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader', // Matches npm installation name
        test: /\.js$/, // What files will babel run through
        exclude: /node_modules/, // Don't run babel for node_mod folder
      }, {
        // test: /\.s?css$/,
        test: /\.(sa|sc|c)ss$/,
        // Use allows multiple loaders
        // use: [
        //   'style-loader',
        //   'css-loader',
        //   'sass-loader',
        // ]
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              hmr: !isProduction,
              // reloadAll: true // use if hmr doesn't work
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
}