const ChromeExtensionReloader = require("webpack-chrome-extension-reloader");
const path = require("path");

module.exports = {
  entry: {
    "content-script": path.join(__dirname, "src/index.ts"),
    background: path.join(__dirname, "src/background.ts")
  },
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "[name].js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        // The entries used for the content/background scripts
        contentScript: "index", // Use the entry names, not the file name or the path
        background: "background" // *REQUIRED
      }
    })
  ]
};
