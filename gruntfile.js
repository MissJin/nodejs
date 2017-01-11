module.exports = function(grunt){

	grunt.initConfig({
	    watch: {
	      jade: {
	        files: ['views/**'],
	        options: {
	          livereload: true
	        }
	      },
	      js: {
	        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
	        //tasks: ['jshint'],
	        options: {
	          livereload: true
	        }
	      }
	    },

	    

	    nodemon: {
	      dev: {
	        options: {
	          file: 'app.js',
	          args: [],
	          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
	          watchedExtensions: ['js'],
	          watchedFolders: ['./'],
	          debug: false,
	          delayTime: 1,
	          env: {
	            PORT: 2016
	          },
	          cwd: __dirname
	        }
	      }
	    },

	    concurrent: {
	      tasks: ['nodemon', 'watch'],
	      options: {
	        logConcurrentOutput: true
	      }
	    }
	});
	grunt.option('force', true);
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.registerTask('default', ['concurrent']);
	
}