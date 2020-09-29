const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-first-program-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end()//包含icons目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      //    extract:false的意思是不要把它解析出文件来
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
    //使用svgo这个loader来清除svg的颜色
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)//其它SVG就排除icons目录
  }
}
