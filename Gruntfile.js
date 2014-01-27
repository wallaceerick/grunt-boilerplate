module.exports = function(grunt){

    //Configuração
    grunt.initConfig({
 
        //Pastas
        yeoman: {
            dist: 'source',
            app: 'build'
        },

        //HTML Compressor
        htmlcompressor: {
            compile: {
                files: {
                    //Páginas
                    '<%= yeoman.app %>/index.php': '<%= yeoman.dist %>/index.php',

                    //Includes
                    '<%= yeoman.app %>/includes/include.php': '<%= yeoman.dist %>/includes/include.php',
                },
                options: {
                    type: 'html',
                    preserveServerScript: true
                }
            }
        },

        //Minficar JS
        uglify: {
            options: {
                mangle: false
            },
            //Cria o Arquivo
            one: {
                files: {
                    //Arquivo de Destino
                    '<%= yeoman.app %>/assets/js/application.js': [
                        //Arquivos Inclusos
                        '<%= yeoman.dist %>/assets/js/_one.js', 
                        '<%= yeoman.dist %>/assets/js/_two.js'
                    ]
                },
                options: {
                    banner: '/*\n***********************\nFile Name: One\nLast Update: <%= grunt.template.today("dd-mm-yyyy") %>\n***********************\n*/\n'
                }
            }
        },

        //Compass
        compass: {
            dist: {
                options: {
                    sassDir:         '<%= yeoman.dist %>/assets/css',
                    cssDir:          '<%= yeoman.app %>/assets/css',
                    imagesDir:       '<%= yeoman.dist %>/assets/images', 
                    fontsDir:        '<%= yeoman.dist %>/assets/fonts',
                    javascriptsDir:  '<%= yeoman.dist %>/assets/js',
                    outputStyle:     'expanded', //compressed
                    environment:     'development', //production
                    relativeAssets:  true
                }
            }
        },

        //Minificar Imagens
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,      
                    cwd:  '<%= yeoman.dist %>/',
                    dest: '<%= yeoman.app %>/',
                    src: ['**/*.png', '**/*.jpg']
                }],
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
        },

        //Deploy
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'ftp.wallaceerick.com.br',
                    port: 21,
                    authKey: 'key1'
                },
                src: '<%= yeoman.app %>',
                dest: '/public_html/clientes/grunt-boilerplate/',
                exclusions: [
                            '<%= yeoman.dist %>/',
                            '<%= yeoman.dist %>/**/.DS_Store',
                            '<%= yeoman.dist %>/**/Thumbs.db',
                            '<%= yeoman.dist %>/.sass-cache/'
                            ]
            }
        }

    });
 
    //Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-htmlcompressor');

    //Tarefas que serão Executadas
    grunt.registerTask('default', 
        [
            'htmlcompressor',
            'uglify',
            'compass',
            'imagemin'
        ]
    );
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('deploy', ['ftp-deploy']);
    
};

