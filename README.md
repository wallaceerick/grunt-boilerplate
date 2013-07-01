#Grunt Boilerplate

My personal tool to start projects with Grunt.

---

## Includes
- [Uglify] (https://npmjs.org/package/grunt-contrib-uglify)
- [Compass] (https://npmjs.org/package/grunt-contrib-compass)
- [HTML Min] (https://npmjs.org/package/grunt-contrib-htmlmin)
- [Image Min] (https://npmjs.org/package/grunt-contrib-imagemin)
- [Watch] (https://npmjs.org/package/grunt-contrib-watch)

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
	scripts: {
		files: {
			//Arquivo de Destino
			'<%= yeoman.app %>/assets/js/application.js': [
				//Arquivos Inclusos
				'<%= yeoman.dist %>/assets/js/_add.js', 
				'<%= yeoman.dist %>/assets/js/_divide.js', 
				'<%= yeoman.dist %>/assets/js/_multiply.js',
				'<%= yeoman.dist %>/assets/js/_subtract.js'
			]
		}
	}
}
```

#### Compass

```bash
compass: {
	dist: {
		options: {
			sassDir: '<%= yeoman.dist %>/assets/css',
			cssDir:  '<%= yeoman.app %>/assets/css', 
			config:  'config.rb',
			environment: 'development'
		}
	}
}
```

#### HTML Min

```bash
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
$ grunt w
```