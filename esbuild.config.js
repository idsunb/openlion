const esbuildConfig = () => require('esbuild').build({
    entryPoints: ['./src/index.jsx'],
    bundle: true,
    platform: 'node',
    target: ['es2022','node18'], // 'es2017', 'chrome58', 'firefox57', 'safari11', 'edge16', 'node12', 'electron12', 'esnext'
    outfile: './esbuild/index.js',
    loader:{ '.js': 'jsx' },
    external:['electron'],
  })

  const esbuildConfig1 = () => require('esbuild').build({
    entryPoints: ['./src/main.js','./src/preload.js'],
    bundle: true,
    format: 'cjs',
    minify: true,
    platform: 'node',
    outdir: './esbuild',
    target: 'chrome89',
    external:['electron'], // 'es2017', 'chrome58', 'firefox57', 'safari11', 'edge16', 'node12', 'electron12', 'esnext'
})
  esbuildConfig()
  esbuildConfig1()

//  require('esbuild').context().then(async (ctx) => {
//   ctx.watch()}  )


//   node ./esbuild.config.js
//   electron esbuild/main.js
// npx vite --config vite.chat_extension.config.mjs