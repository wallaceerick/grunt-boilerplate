module.exports = function(grunt ){

    //Configuração
    grunt.initConfig({

        //Variáveis
        yeoman: {
            app: 'build',
            dist: 'source'
        },

        //Minficar JS
        uglify: {
            options: {
                mangle: false
            },
            //Cria um Arquivo
            one: {
                files: {
                    //Arquivo de Destino
                    '<%= yeoman.app %>/assets/js/one-and-two.js': [
                        //Arquivos Inclusos
                        '<%= yeoman.dist %>/assets/js/_one.js', 
                        '<%= yeoman.dist %>/assets/js/_two.js'
                    ]
                },
                options: {
                    banner: '/*\n***********************\nFile Name: One\nLast Update: <%= grunt.template.today("dd-mm-yyyy") %>\n***********************\n*/\n'
                }
            },
            //Cria outro Arquivo
            two: {
                files: {
                    //Arquivo de Destino
                    '<%= yeoman.app %>/assets/js/three-and-four.js': [
                        //Arquivos Inclusos
                        '<%= yeoman.dist %>/assets/js/_three.js', 
                        '<%= yeoman.dist %>/assets/js/_four.js'
                    ]
                },
                options: {
                    banner: '/*\n***********************\nFile Name: Two\nLast Update: <%= grunt.template.today("dd-mm-yyyy") %>\n***********************\n*/\n'
                }
            }
        },

        //Minificar HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= yeoman.app %>/index.html': '<%= yeoman.dist %>/index.html'
                }
            }
        },

        //Compass
        compass: {
            dist: {
                options: {
                    sassDir:         '<%= yeoman.dist %>/assets/css',
                    cssDir:          '<%= yeoman.app %>/assets/css',
                    imagesDir:       '<%= yeoman.app %>/assets/images', 
                    fontsDir:        '<%= yeoman.app %>/assets/fonts',
                    javascriptsDir:  '<%= yeoman.app %>/assets/js',
                    outputStyle:     'expanded', //compressed
                    environment:     'development', //production
                    relativeAssets: true
                }
            }
        },

        //Minificar Imagens
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: {
                    '<%= yeoman.app %>/assets/images/test.png': '<%= yeoman.dist %>/assets/images/test.png',
                    '<%= yeoman.app %>/assets/images/test.jpg': '<%= yeoman.dist %>/assets/images/test.jpg'
                }
            }
        },

        //Watch
        watch: {
            options: {
                livereload: true,
            },
            dist: {
                files: [
                '<%= yeoman.dist %>/assets/css/**/*.scss',
                '<%= yeoman.dist %>/assets/js/*',
                '<%= yeoman.dist %>/*'
                ],
                tasks: ['uglify', 'htmlmin', 'compass']
            }
        }



    });
 
    //Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    //Tarefas que serão Executadas
    grunt.registerTask('default', 
        [
            'uglify',
            'htmlmin',
            'compass',
            'imagemin'
        ]
    );
    grunt.registerTask('w', ['watch']);
    
};

