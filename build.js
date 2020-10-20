const { build } = require("esbuild");

// More details about esbuild: https://github.com/evanw/esbuild#command-line-usage
build({
  entryPoints: ["./src/index.js"],
  outfile: "./dist/main.js",
  minify: true, //Remove whitespace, shorten identifiers, and use equivalent but shorter syntax
  bundle: false, // Bundle all dependencies into the output files
  sourcemap: false, // Emit a source map
  platform: "node", // Platform target (browser or node, default browser)
  // eslint-disable-next-line no-process-exit
}).catch(() => process.exit(1));
