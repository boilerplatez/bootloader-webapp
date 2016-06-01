/**
 * Description
 * @method exports
 * @param {} grunt
 * @return
 */
module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        uglify: {
            options: {
                // compress: false,
                //  mangle: false,
                //  beautify: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            }
        },
        sass: {
            options: {
                sourceMap: false,
                outputStyle: 'nested',
                sourceComments: false
            },
            dist: {
                files: {
                    'dist/style/main.css': 'src/scss/main.scss'
                }
            },
            extfiles: {
                files: {
                }
            }
        },
        watch: {
            sass: {
                files: [
                    'src/modules/**/*.scss',
                    'src/scss/**/*.scss'
                ],
                tasks: ['sass:dist'],
                options: {
                    // Sets livereload to true for livereload to work
                    // (livereload is not covered in this article)
                    livereload: false
                }
            },
            sprite: {
                files: ['src/img/sprite/**/*.png'],
                tasks: ['sprite']
            }
        },
        bootloader: {
            options: {
                projectPrefix: "webapp", sort: false,
                indexBundles: ["webmodules/bootloader", "sample/app"],// ["webmodules/bootloader","unicom/external","unicom/abstracts"],
                src: "./",
                dest: "dist",
                resourceJson: "dist/resource.json",
                resourcesInline: true,
                livereloadUrl: "http://localhost:8081/livereload.js",
                bootServer: {
                    port: 8087,
                    //indexMatch: /^\/webapp\//
                }
            }
        },
        jsbeautifier: {
            files: ["src/**/*.js", "!src/external/components/**/*.js"],
            options: {
                config: ".jsbeautifyrc"
            }
        },
        jshint: {
            files: ["src/**/*.js", "!src/external//**/*.js"],
            options: { jshintrc: true }
        },
        cssmin: {
            options: {
                target: "bootloader-webapp/dist/style",
                advanced: true,
                keepSpecialComments: 0
            },
            target: {
                files: {
                    'dist/style/library.css': [
                        'src/external/components/webmodules-bootstrap/css/bootstrap.min.css',
                        'src/external/components/font-awesome/css/font-awesome.min.css'
                    ]
                }
            }
        },
        clean: {
            spriteimage: ['dist/img/sprite/**/*.png']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bootloader');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-gitinfo');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);

    // Custom task
    grunt.registerTask('check', ["jshint", 'jsbeautifier']);
    grunt.registerTask('scan', ['bootloader:scan:skip', 'cssmin', 'sass:dist', "check"]);
    grunt.registerTask('bundlify', ['bootloader:bundlify', 'sass:dist', 'cssmin']);
    grunt.registerTask('build', ['gitinfo', 'bundlify']);
    grunt.registerTask('boot', ['bootloader:server', 'watch']);

};