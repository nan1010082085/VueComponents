module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
          'es6.promise'
      ]
    }]
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}