module.exports = function(grunt){
    'use strict';

    grunt.initConfig({

        // Package
        pkg: grunt.file.readJSON('package.json'),

        // Folders
        yeoman: {
            dist: 'source',
            app: 'public'
        },

        // JS Minifier
        uglify: {
            options: {
                mangle: false
            },

            javascript: {
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
            compile: {
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
            png: {
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

        // Watch
        watch: {
            options: {
                livereload: false,
            },
            styles: {
                files: ['assets/css/{,*/}*.scss'],
                tasks: ['compass']
            },
            javascripts: {
                files: ['assets/js/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['**/*.php']
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
                src: '<%= yeoman.app %>',
                dest: '/public_html/clientes/grunt-boilerplate/',
                exclusions: [
                            '**/.DS_Store',
                            '**/Thumbs.db',
                            '.sass-cache/'
                ]
            }
        },

        // Replace Files
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                },
 
                files: [
                    {
                        expand: true, 
                        flatten: true, 
                        src: ['*.php'], 
                        dest: '<%= yeoman.app %>/'
                    }
                ]
            }
        }

    });
 
    //Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-replace');

    //Tarefas que serão Executadas
    grunt.registerTask('default', 
        [
            'uglify',
            'compass'
        ]
    );
    grunt.registerTask('s', ['sprite']);
    grunt.registerTask('i', ['imagemin']);
    grunt.registerTask('h', ['htmlmin']);
    grunt.registerTask('d', ['ftp-deploy']);
    grunt.registerTask('r', ['replace']);
    grunt.registerTask('w', ['watch']);
    
};