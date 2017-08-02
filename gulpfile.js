/* eslint-disable */
var babel = require('gulp-babel')
var gulp = require('gulp')
var path = require('path')

var dest = './lib'
var theBase = { base: './src' }

// This function will copy the transpiled files to
// the customer folder. You can specify the customer folder path
// by running gulp command  like
// `CUSTOMER_FOLDER=/home/nick/codes/twreporter-react gulp run dev`,
// and those transpiled files will be copyed into
// `/home/nick/codes/twreporter-react/node_modules/twreporter-react-index-page-components/lib`
function copyToCustomerFolder() {
  let customerFolder = process.env.CUSTOMER_FOLDER
  if (typeof customerFolder !== 'string') {
    customerFolder = path.resolve(__dirname + '/../twreporter-react')
  }
  return gulp
    .src('./lib/**/*')
    .pipe(gulp.dest(customerFolder+'/node_modules/twreporter-react-index-page-components/lib'))
}

function transpile() {
  return gulp.src('./src/**/*.js', theBase)
    .pipe(babel())
    .pipe(gulp.dest(dest))
}

function watch() {
  gulp.watch('./src/**/*.js', transpile)
}

gulp.task('build', transpile)

gulp.task('dev', () => {
  const watcher = gulp.watch(['src/**'], gulp.series('build', copyToCustomerFolder))
  watcher.on('change', (filePath) => {
    console.log(`File ${filePath} was changed, running tasks...`)
  })
})
