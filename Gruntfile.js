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
                    'src/external/spamjs-datatable/spamjs.datatable.css': 'src/external/spamjs-datatable/spamjs.datatable.scss'
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
                projectPrefix: "olp", sort: false,
                indexBundles: ["webmodules/bootloader", "olp/app"],// ["webmodules/bootloader","unicom/external","unicom/abstracts"],
                src: "./",
                dest: "dist",
                resourceJson: "dist/resource.json",
                resourcesInline: true,
                livereloadUrl: "http://localhost:8081/livereload.js",
                bootServer: {
                    port: 8087,
                    indexMatch: /^\/olp\//
                }
            }
        },
        jsbeautifier: {
            files: ["src/**/*.js", "!src/external/components/**/*.js", "!src/customerTrack//**/*.js"],
            options: {
                config: ".jsbeautifyrc"
            }
        },
        jshint: {
            files: ["src/**/*.js", "!src/external//**/*.js", "!src/customerTrack//**/*.js"],
            options: { jshintrc: true }
        },
        sprite: {
            all: {
                src: 'src/img/sprite/*.png',
                dest: 'dist/img/sprite/olpSprite-' + new Date().getTime() + '.png',
                destCss: 'src/scss/_olpSprite.scss',
                padding: 10,
                cssTemplate: 'src/img/sprite/spriteTemplate/template.handlebars'
            }
        },
        webfont: {
            icons: {
                src: 'src/img/custom-icons/*.svg',
                dest: 'src/fonts/',
                destCss: 'src/fonts/style',
                options: {
                    font: 'icons',
                    stylesheet: 'scss',
                    relativeFontPath: "../../src/fonts/",
                    htmlDemo: true,
                    hashes: true
                }
            }
        },
        cssmin: {
            options: {
                target: "WebUI/dist/style",
                advanced: true,
                keepSpecialComments: 0
            },
            target: {
                files: {
                    'dist/style/library.css': [
                        'src/external/components/webmodules-bootstrap/css/bootstrap.min.css',
                        'src/external/components/jqmodules-select2/select2.css',
                        'src/external/components/jqmodules-bootstrap-select/dist/css/bootstrap-select.min.css',
                        'src/external/components/font-awesome/css/font-awesome.min.css',
                        'src/external/components/toastr/toastr.min.css',
                        'src/external/components/datatables/media/css/jquery.dataTables.min.css',
                        'src/external/components/datetimepicker/jquery.datetimepicker.css'
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
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bootloader');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-gitinfo');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'webfont', 'cssmin']);

    // Custom task
    grunt.registerTask('start-cdn-server', ['bootloader:server', 'watch']);
    grunt.registerTask('check', ["jshint", 'jsbeautifier']);
    grunt.registerTask('scan', ['bootloader:scan:skip', 'webfont', 'cssmin', 'sprite', 'sass:dist',"check"]);
    grunt.registerTask('bundlify', ['bootloader:bundlify', 'webfont', 'sprite', 'sass:dist', 'cssmin']);
    grunt.registerTask('build', ['gitinfo','bundlify']);
    grunt.registerTask('boot', ['start-cdn-server']);

};