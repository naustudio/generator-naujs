# generator-naujs [![Build Status](https://secure.travis-ci.org/naustudio/generator-naujs.png?branch=master)](https://travis-ci.org/naustudio/generator-naujs)

> This is an opinionated [Yeoman](http://yeoman.io) generator made exclusively for [Nau Studio](https://github.com/naustudio)'s projects scaffolding and kickstart purposes.

> Đây là một _bộ khởi tạo_ Yeoman được viết riêng cho Nâu Studio với mục đích khởi tạo nhanh các dự án theo quy trình của Nâu.

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](https://raw.githubusercontent.com/yeoman/media/master/optimized/yeoman-masthead.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### NauJS Generator

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install `generator-naujs` from npm, run:

```bash
npm install -g generator-naujs
```

Finally, initiate the generator:

```bash
yo naujs
```

Sub-generators:

```bash
# generate gulpfile and install its dependencies
yo naujs:gulp

# add iconfont task and install its dependencies
yo naujs:gulp-iconfont
```


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT](http://opensource.org/licenses/MIT). © 2017 Nâu Studio
