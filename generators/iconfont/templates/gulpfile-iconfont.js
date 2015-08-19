/**
 * Task: iconfont
 * Generate icon font from assets/icons SVG folder
 */
g.iconfont = require('gulp-iconfont');
g.consolidate = require('gulp-consolidate');

gulp.task('iconfont', function(){
	var fontName = 'icons';

	gulp.src([path.join(paths.assets, '/icons/*.svg')])
		.pipe(g.iconfont({
			fontName: fontName,
			// autohint: true,
			formats: ['ttf', 'eot', 'woff2', 'woff']
		}))
		.on('glyphs', function(glyphs/*, options*/) {
			var opts = {
				glyphs: glyphs.map(function(glyph) {
					// this line is needed because gulp-iconfont has changed the api from 2.0
					return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) };
				}),
				fontName: fontName,
				fontPath: '../fonts/',
				className: 'icon',
				fontPath: '<%= props.iconfontPath %>'
			};

			// generate _icons.scss
			gulp.src('assets/iconfont-templates/_icons.scss')
				.pipe(g.consolidate('lodash', opts ))
				.pipe(gulp.dest('<%= props.iconfontSCSSPath %>')); // change icons.scss output folder here

			// // generate icons.html for previewing
			gulp.src('assets/iconfont-templates/icons.html')
				.pipe(g.consolidate('lodash', opts))
				.pipe(gulp.dest('<%= props.iconfontSamplePath %>')); // set path to export your sample HTML
		})
		.pipe(gulp.dest('<%= props.iconfontPath %>')); // set path to generate the font file to
});

// ----------------------------------------------------------------------------
