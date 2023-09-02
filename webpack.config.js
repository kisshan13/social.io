const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Your TypeScript entry point file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply TypeScript loader to .ts files
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  target: "node", // Set the target to Node.js
  externals: [/node_modules/], // Exclude node_modules from bundling
  // Add any necessary plugins or additional configurations here.
};
