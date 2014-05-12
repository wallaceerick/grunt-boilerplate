module.exports = function(grunt){
    'use strict';

    grunt.initConfig({

        // Package
        pkg: grunt.file.readJSON('package.json'),

        // JS Minifier
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'assets/js/application.js': [
                        'assets/js/_one.js', 
                        'assets/js/_two.js'
                    ]
                },
                options: {
                    banner: '/*\n***********************\n' + 
                            'File: Application JS\n' +
                            'Project: <%= pkg.title %>\n' +
                            'Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                            'Author URL: <%= pkg.author.url %>\n' +
                            'Last Update: <%= grunt.template.today("dd-mm-yyyy") %>\n' + 
                            '***********************\n*/\n'
                }
            }
        },

        // Compass
        compass: {
            dist: {
                options: {
                    relativeAssets: true,
                    sassDir:        'assets/css',
                    cssDir:         'assets/css',
                    imagesDir:      'assets/images', 
                    fontsDir:       'assets/fonts',
                    outputStyle:    'compressed',
                    environment:    'production',
                    specify:        'assets/css/application.scss',
                    banner:         '/*\n***********************\n' + 
                                    'File: Application CSS\n' +
                                    'Project: <%= pkg.title %>\n' +
                                    'Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                                    'Author URL: <%= pkg.author.url %>\n' +
                                    'Last Update: <%= grunt.template.today("dd-mm-yyyy") %>\n' + 
                                    '***********************\n*/\n'
                }
            }
        },

        // Image Minifier
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 4,
                    pngquant: true
                },
                files: [{
                    expand: true,
                    cwd:  'assets/images/',
                    dest: 'assets/images/compressed',
                    src:  ['*.{png,jpg,gif}'] 
                }]
            }
        },

        // Sprite Generator 
        sprite: {
            all: {
                padding:    5,
                algorithm:  'binary-tree',
                src:        'assets/images/sprites/*.png',
                destImg:    'assets/images/sprite.png',
                destCSS:    'assets/css/modules/_sprite.scss',
                cssFormat:  'css',
                imgPath:    '../images/sprite.png',
                cssClass: function (sprite){
                    sprite.name = 'sprite-' + sprite.name;
                },
            }
        },

        // Watch Files
        watch: {
            options: {
                livereload: false,
            },
            dist: {
                files: [
                    //'assets/js/*',
                    '*.php',
                    'assets/css/**/*.scss'
                ],
                //tasks: ['uglify', 'compass', 'sprite']
                tasks: ['compass']
            }
        },

        // Deploy
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'ftp.wallaceerick.com.br',
                    port: 21,
                    authKey: 'connection'
                },
                src: './',
                dest: '/public_html/clientes/grunt-boilerplate/simple',
                exclusions: [
                            // Useless Files
                            './node_modules',
                            './.sass-cache',
                            './**/.DS_Store',
                            './README.md',
                            './Gruntfile.js',
                            './Config.rb',
                            './package.json',
                            './.ftppass',
                            './.gitignore',
                            './.git',

                            // CSS
                            './assets/css/mixins/*',
                            './assets/css/modules/*',
                            './assets/css/partials/*',
                            './assets/css/application.scss',

                            // JS
                            './assets/js/_one.js',
                            './assets/js/_two.js',

                            // Images
                            './assets/images/sprites'
                ]
            }
        }

    });
 
    // Plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Taks
    grunt.registerTask('default', 
        [
            'uglify',
            'compass',
            'sprite'
        ]
    );
    grunt.registerTask('s', ['sprite']);
    grunt.registerTask('i', ['imagemin']);
    grunt.registerTask('d', ['ftp-deploy']);
    grunt.registerTask('w', ['watch']);
    
};