const { FuseBox, WebIndexPlugin, RawPlugin, ReplacePlugin, QuantumPlugin, Sparky } = require("fuse-box");

Sparky.task("default", ['clean', 'copy-assets'], devServer);
Sparky.task('clean', () => Sparky.src('/dist').clean('/dist'));
Sparky.task('copy-assets', () => Sparky.src("assets/**/**.*", { base: './' }).dest('./dist'));

function devServer() {
  const fuse = init(false);
  fuse.dev();
  fuse.bundle("app").instructions(" > index.js").hmr().watch()
  fuse.run();
}

function init(prod) {
  return FuseBox.init({
    homeDir: 'src',
    target: 'browser@es6',
    output: 'dist/$name.js',
    useTypescriptCompiler: true,
    plugins: [
      WebIndexPlugin({ template: 'src/index.html' }),
      RawPlugin(['.vert', '.frag']),
      ReplacePlugin({
        'CANVAS_RENDERER': JSON.stringify(true),
        'WEBGL_RENDERER': JSON.stringify(true),
      }),
      prod && QuantumPlugin({ uglify: true }),
    ]
  });

}
