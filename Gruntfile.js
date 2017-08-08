
module.exports = function(grunt){
	grunt.initConfig({
		typescript: {
			base: {
			  src: ['ts/**/*.ts'],
			  dest: 'js',
			  options: {
				module: 'commonjs', //or commonjs 
				target: 'es5', //or es3 
				basePath: 'ts',
				sourceMap: false,
				declaration: false
			  }
			}
		  },
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['ts/**/*.ts'],
				tasks: ['process']
			}
		},
		concat: {
			dist:{
				src:['js/**/*.js'],
				dest:'dist/data/body.js'
			}
		},
		uglify:{
			dist:{
				options:{
					banner: '/* Created by Olphabet */'
				},
				files:{
					'dist/data/body.min.js':['dist/data/body.js']
				}
			}
		},
		express: {
			all: {
				options: {
					port:9339,
					hostname: 'localhost',
					bases: ['.'],
					livereload:true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-express');
	
	//grunt.registerTask('process', ['newer:typescript', 'concat', 'uglify']);
	//grunt.registerTask('default', ['typescript', 'concat', 'uglify', 'express', 'watch']);
	
	grunt.registerTask('process', ['newer:typescript', 'concat']);
	grunt.registerTask('default', ['typescript', 'concat', 'express', 'watch']);
	
	grunt.registerTask('release', ['typescript', 'concat', 'uglify']);
	grunt.registerTask('debug', ['typescript', 'concat']);
}