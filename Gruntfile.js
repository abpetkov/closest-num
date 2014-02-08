module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var config = {
      buildDir: 'build/'
    , distDir: 'dist/'
    , name: 'closestNum'
  };

  grunt.initConfig({
      config: config
    , pkg: grunt.file.readJSON('package.json')

    , componentbuild: {
        development : {
              options: {
                  dev: true
                , sourceUrls: true
              }
            , dest: '<%= config.buildDir %>'
            , src: '.'
        }
        , standalone: {
              options: {
                  name: '<%= pkg.name %>'
                , standalone: '<%= config.name %>'
              }
            , dest: '<%= config.distDir %>'
            , src: '.'
          }
      }

    , uglify: {
        dist: {
            src: '<%= config.distDir %><%= pkg.name %>.js'
          , dest: '<%= config.distDir %><%= pkg.name %>.min.js'
        }
      }

    , watch: {
        js: {
            files: ['<%= pkg.name %>.js']
          , tasks: ['componentbuild:development']
        }
      }

    , clean: {
          development: ['<%= config.buildDir %>*']
        , standalone: ['<%= config.distDir %>*']
      }
  });

  grunt.registerTask('build', ['componentbuild', 'uglify:dist']);
  grunt.registerTask('default', 'build');
};