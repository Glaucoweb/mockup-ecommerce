module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['bower_components/jquery/dist/jquery.js', 'app/js/main.js'],
        dest: 'app/js/main.js',
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      custom: {
        src: 'build/js/main.js',
        dest: 'build/js/main.js'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app/css/main.css': 'app/css/scss/main.scss'
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['*.css'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },

    watch: {
      css: {
        files: 'app/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'app/js/main.js'
      }
    },

    clean: {
      dist: {
        src: ['build/']
      },
    },
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['app/*.html'],
          dest: 'build/'  
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['**/*.css', '**/*.js', '**/*.png'],
          dest: 'build/' 
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['concat','sass']);

  // Grunt build of project.
  grunt.registerTask('build', ['clean', 'copy', 'uglify', 'sass']);

};