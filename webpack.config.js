const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        // entry point of our app
        src: './client/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.jsx?/, // tests for both js and jsx
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                }
            }
          },
          // style loader
          {
            test: /\.(sass|less|css|scss)$/,
            
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              
              // Compiles Sass to CSS
              "sass-loader",
              
            ]
          },
        ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
    ],
    //Used in development only
    devServer: {
      // host: 'localhost',
      // port: 8080,
      // // match the output path
      static: {
        publicPath: '/',
        directory: path.resolve(__dirname, 'build')
      },
      //hot: true,
      proxy: {
        '/api' : 'http://localhost:3000',
        cookieDomainRewrite: 'localhost',
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    
    
}

/*
new webpack.EnvironmentPlugin(['NODE_ENV'])
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
}),

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    // entry point of our app
    './client/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080,
    // match the output path
    static: {
      directory: path.resolve(__dirname, 'dist'),
      // match the output 'publicPath'
      publicPath: '/',
    },
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};
*/


