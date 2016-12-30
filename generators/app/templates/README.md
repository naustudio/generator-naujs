<%= name %>
==============================

<%= description %>

- Mockup URL: [TBD]
- Issue tracker URL: [TBD]


GETTING STARTED WITH DEVELOPMENT
--------------------------------

1. Software installation:
    - Sublime Text 3 or Visual Studio Code
    - [Nau dotfiles][]
    - Currently stable Google Chrome
    - [NodeJS][] (for testing, previewing, compiling and optimizing processes)
    - Others:
        + _Please list_
2. Setting up development environment
    - Install development dependencies: In terminal, cd to __this__ folder and run: `npm install`
    - Open the __this__ folder in favorite editor
3. Preview the app:
    - Execute `npm start`
4. Optimize source code and prepare bundle for deployment:
    - Execute `npm run build`
5. Prepare upload bundle and upload to server: [TBD]


TECHNICAL SOLUTIONS
-------------------

**[TBD]**

- Minimum browser's supports:
    + Chrome ???
    + Firefox ???
    + Opera ???
    + Internet Explorer ???
    + Android ???
    + Safari ???
    + Blackberry ???

FOLDER STRUCTURE
----------------

    /                           : git root
    ├── private                 : (directory for dev assets like editable PSDs, install templates, icons for icon fonts)
<% if(src) { %>    └── <%= src %>                     : main source folder
<% } %>

CONVENTIONS & BEST PRACTICES
----------------------------

### General

- Files are named with **kebab-case**. (Reasons: to minimize case sensitivity issues on Linux).
    - Exceptions: single class files should be named with PascalCase to link the file with the Class being declared inside.
-

### JavaScript

- Use [Nau JavaScript Code Styles][], with below main points:
    - Code indentation by **TABs**, and fine alignment by **SPACEs**. (Tab width is up to authors, but 4 is recommended.)
    - Open brackets `{, (, [` on the same line.
    - Single quotes ('...') for String literal in js, jsx files.
    - Naming with **camcelCase** for variables, **CAPITALIZED_CASE** for enum constants, PascalCase for Class and Singleton.
    - Use **spaces** frequently to enhance code readability.
    - Comment code at Class level and public methods with [JSDoc][] and wherever logic is unclear.
- [eslint][] MUST BE USED to validate JavaScript syntax to maintain sanity & clarity of the code.

    Refer to `.eslintrc.js` for project-wise rules

### CSS / SCSS
- __Code styles__: follow [Nau Front End Code Guide][] and [BEM][] methodology
    + BEM convention: `.block`, `.block--modifier`, `.block__element`
    + Add prefixes to indicate:
        - `js` - JS Hook: `.js-menu`, `.js-sidebar`
        - `u` - utility class: `.u-hidden`, `.u-clearfix`
- [stylelint][] MUST BE USED to validate code style and common mistakes
- __Comments__: every CSS components, BEM Blocks, wherever intent is unclear
- __OOCSS__:
    + NO **IDs** in CSS
    + Avoid attaching classes to elements (i.e. don’t do div.header or h1.title)
    + Except for utilitily classes, avoid using !important
    + Separate structure and skin: define repeating visual features (like background and border styles) as separate “skins” that you can mix-and-match
    + Separate container and content: rarely use location-dependent styles, an object should look the same no matter where you put it.
- __SCSS file naming__:
    + Prefix underscore `_` to included .scss files, that are not compiled separately.
    + Don't add `_` or `.scss` in the `@import` statements
- __Autoprefixer__: Don't add browser prefixes by yourself, let the gulp/grunt task autoprefixer do it for you.

###HTML

- __Code styles__: follow [Nau Front End Code Guide][]

## KNOWLEDGE BASE

[TBC]

[BEM]: https://css-tricks.com/bem-101/
[eslint]: http://eslint.org/
[GulpJS]: http://gulpjs.com/
[Handlebars]: http://handlebarsjs.com/
[JSDoc]: http://usejsdoc.org/
[Nau dotfiles]: https://github.com/naustudio/dotfiles
[Nau Front End Code Guide]: http://code.naustud.io/code-guide
[Nau JavaScript Code Styles]: http://code.naustud.io/javascript
[NodeJS]: http://nodejs.org/
[SASS]: http://sass-lang.com/
[stylelint]: http://stylelint.io
