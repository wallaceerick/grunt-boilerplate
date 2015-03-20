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
                    '<%= yeoman.app %>/assets/js/application.js': [
                        '<%= yeoman.dist %>/assets/js/_one.js', 
                        '<%= yeoman.dist %>/assets/js/_two.js'
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
                    sassDir:        '<%= yeoman.dist %>/assets/css',
                    cssDir:         '<%= yeoman.app %>/assets/css',
                    imagesDir:      '<%= yeoman.dist %>/assets/images', 
                    fontsDir:       '<%= yeoman.dist %>/assets/fonts',
                    outputStyle:    'compressed',
                    environment:    'production',
                    specify:        '<%= yeoman.dist %>/assets/css/application.scss',
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
                    cwd:  '<%= yeoman.dist %>/assets/images/',
                    dest: '<%= yeoman.app %>/assets/images/',
                    src:  ['*.{png,jpg,gif}'] 
                }]
            }
        },

        // Sprite Generator 
        sprite: {
            all: {
                padding:    5,
                algorithm:  'binary-tree',
                src:        '<%= yeoman.dist %>/assets/images/sprites/*.png',
                dest:       '<%= yeoman.app %>/assets/images/sprite.png',
                destCss:    '<%= yeoman.dist %>/assets/css/modules/_sprite.scss',
                cssFormat:  'css',
                imgPath:    '../images/sprite.png',
                cssOpts: {
                    cssClass: function (item) {
                        return '.sprite-' + item.name;
                    }
                }
            }
        },

        // Watch
        watch: {
            options: {
                livereload: false,
            },
            dist: {
                files: [
                    '<%= yeoman.app %>/*'
                ],
                tasks: ['uglify', 'compass']
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
                dest: '/public_html/clientes/grunt-boilerplate/advanced',
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