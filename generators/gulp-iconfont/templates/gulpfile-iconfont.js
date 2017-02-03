/**
 * Task: iconfont
 * Generate icon font from assets/icons SVG folder
 */
gulp.task('iconfont', function() {
	var fontName = '<%= iconfontName %>';

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
				className: 'icon',
				fontName: fontName,
				fontPath: '<%= iconfontPath %>'
			};

			// generate _icons.scss
			gulp.src('<%= assets %>/iconfont-templates/_icons.scss')
				.pipe(g.consolidate('lodash', opts ))
				.pipe(gulp.dest('<%= iconfontSCSSPath %>')); // change icons.scss output folder here

			// // generate icons.html for previewing
			gulp.src('<%= assets %>/iconfont-templates/icons.html')
				.pipe(g.consolidate('lodash', opts))
				.pipe(gulp.dest('<%= assets %>')); // set path to export your sample HTML
		})
		.pipe(gulp.dest('<%= iconfontPath %>')); // set path to generate the font file to
});

// ----------------------------------------------------------------------------
