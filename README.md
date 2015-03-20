#Grunt Boilerplate

My personal tool to start projects with Grunt.

---

## Includes
- [Uglify](https://npmjs.org/package/grunt-contrib-uglify)
- [Compass](https://npmjs.org/package/grunt-contrib-compass)
- [HTML Compressor](https://github.com/jney/grunt-htmlcompressor)
- [Image Min](https://npmjs.org/package/grunt-contrib-imagemin)
- [Watch](https://npmjs.org/package/grunt-contrib-watch)
- [FTP Deploy](https://github.com/zonak/grunt-ftp-deploy)
- [Menu](https://github.com/ruyadorno/grunt-menu)

## Getting Started

You need to have [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/) instaled!

- Clone the Grunt Boilerplate

```bash
$ git clone https://github.com/wallaceerick/grunt-boilerplate.git
```

- Enter in the folder

```bash
$ cd grunt-boilerplate
```

- Install Dependences

```bash
$ npm install
```

## Usage

#### Uglify 

```bash
uglify: {
	options: {
		mangle: false
	},
	//Create a File
	one: {
		files: {
			//Generated File
			'<%= yeoman.app %>/assets/js/one-and-two.js': [
				//Files Included
				'<%= yeoman.dist %>/assets/js/_one.js', 
				'<%= yeoman.dist %>/assets/js/_two.js'
			]
		},
		options: {
			//Banner to File
			banner: '/*\n***********************\nFile Name: One\nLast Update: <%= grunt.template.today("dd-mm-yyyy") %>\n***********************\n*/\n'
		}
	},
    
    //Create another File
	two: {
		files: {
			//Generated File
			'<%= yeoman.app %>/assets/js/three-and-four.js': [
				//Files Included
				'<%= yeoman.dist %>/assets/js/_three.js', 
				'<%= yeoman.dist %>/assets/js/_four.js'
			]
		},
		options: {
			//Banner to File
			banner: '/*\n***********************\nFile Name: Two\nLast Update: <%= grunt.template.today("dd-mm-yyyy") %>\n***********************\n*/\n'
		}
	}
}
```

#### Compass

```bash
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
}
```

#### HTML Compressor

```bash
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
}
```

#### Image Min

```bash
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
        }
```

#### Watch

```bash
watch: {
	dist: {
		files : [
			'<%= yeoman.dist %>/assets/css/*',
			'<%= yeoman.dist %>/assets/js/*'
                ],
		tasks : ['uglify', 'compass']
	}
}
```

- To watching files 

```bash
$ grunt watch
```


#### FTP Deploy

```bash
'ftp-deploy': {
	build: {
		auth: {
			host: 'ftp.server.com',
			port: 21,
			authKey: 'key1'
		},
		src: '<%= yeoman.app %>',
		dest: '/public_html/testes/grunt-boilerplate/',
		exclusions: [
			'<%= yeoman.dist %>/',
			'<%= yeoman.app %>/**/.DS_Store',
			'<%= yeoman.app %>/**/Thumbs.db'
		]
	}
}
```

- To make deploy 

```bash
$ grunt deploy
```

- Save this JSON as '.ftppass' at the root

```bash
{
	"key1": {
		"username": "your-username",
		"password": "your-password"
	}
}
```