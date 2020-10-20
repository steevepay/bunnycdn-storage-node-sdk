/* eslint-disable no-undef */
const { build } = require("esbuild");

// More details about esbuild: https://github.com/evanw/esbuild#command-line-usage
build({
  entryPoints: ["./src/index.js"],
  outfile: "./dist/main.js",
  minify: true, //Remove whitespace, shorten identifiers, and use equivalent but shorter syntax
  bundle: false, // Bundle all dependencies into the output files
  sourcemap: true, // Emit a source map
  platform: "node" // Platform target (browser or node, default browser)
}).catch(() => process.exit(1));