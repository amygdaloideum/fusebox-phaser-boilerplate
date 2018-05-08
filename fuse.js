const { FuseBox, WebIndexPlugin, RawPlugin, ReplacePlugin } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir : "src",
    target : 'browser@es6',
    output : "dist/$name.js",
    useTypescriptCompiler : true,
    plugins : [
        WebIndexPlugin({ template: 'src/index.html'}),
        RawPlugin(['.vert', '.frag']),
        ReplacePlugin({
          'CANVAS_RENDERER': JSON.stringify(true),
          'WEBGL_RENDERER': JSON.stringify(true),
        }),
    ]
});

fuse.dev(); // launch http server
fuse.bundle("app").instructions(" > index.js").hmr().watch()
fuse.run();