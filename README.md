## Live Demo
https://lillianye.github.io/cos426_final_project/

## Writeup Link
https://docs.google.com/document/d/1k6xEVnqx_yA-u-RErjgPBHGbQ4oJ-sI04eA9oqAGgCA/edit?usp=sharing

## Video Presentation/Demo Link
https://drive.google.com/file/d/1nNoCx_ImsGZcSwc9nlgSYIVzkq6kLy3U/view?usp=drive_link

## Crispy Combat
Our project, Crispy Combat, is an interactive, 2-player game where each player’s objective is to remain alive for a longer time than their opponent. The theme and environment of our game is inspired by the frequent chaos of Princeton’s late meal dining. Thus, players in Crispy Combat must avoid moving tables and chairs by using their keyboard to move in 5 possible directions: left, right, forwards, backwards, and up (by jumping). In addition, players also have the opportunity to use either the space key or the “m” key to pelt chicken drumsticks at their opponent, who must then dodge the chicken in order to stay alive in the game. Player movements are restricted within the area of the floor. Players are allowed to bump into each other, but if they are hit by the opposing player’s chicken drumsticks or if they bump into furniture, then they lose.

## Installation on your own computer
Having made your own copy of the project at Github (previous step) you can clone your repository to your own computer. 

To build this project, you will need to use Node Package Manager (npm) to manage and install project dependencies. All npm settings, as well as your project dependencies and their versionings, are defined in the file `package.json`. We will unpack this file in the next section.

Node Package Manager, which is the world's largest software registry and supports over one million open source JavaScript packages and libraries, runs in a NodeJS runtime. The NodeJS runtime is essentially a port of Google Chrome's JavaScript V8 engine that will run directly in your terminal (instead of within a browser).

Before you begin, you will need to install [Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Then, open a new terminal instance, set your working directory to the root of the project, and run `npm install`.

**Note on node versions:** The current version of this scaffolding code is known to work with older versions of node such including `v14.17.0` and `v16.20.2`, but may be broken with newer versions (like 18.3.0 and beyond). Therefore recommend starting from one of the known stable versions. It is easy to switch among different versions of node on your computer by installing [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm).

## Setting Up Your Project
Before you start your project, look inside `package.json`. Take a note of the following fields, and adjust them where appropriate:

* `name`: This is your project name as it would appear on the npm registry (if published). You should replace this with your own project name, but make sure to preserve the all lowercase and hyphenated format.

* `repository`: This holds the name of your repository for this project. It should match name of your GitHub repository as it appears in the URL. For instance, "https://github.com/adamfinkelstein/cos426finalproject" would become "cos426finalproject".

* `version`: This field is used to version your project. The standard format for these is "MAJOR.MINOR.PATCH". You can update this as needed (for instance, setting it to "1.0.0" when you are finished with the project), or you can choose to ignore it.

* `title`: This field contains the "pretty" name of your project. When you run your project in the browser, this title will be injected into the site's HTML header. Most browsers will use this to label the browser tab.

* `description`: A really quick description of your project.

* `keywords`: A list of keywords for you project. Feel free to modify as needed, note that the last keyword should **not** be followed by a comma, since `package.json` must adhere to JSON format.

* `scripts`: This field contains several npm scripts that you will find useful. The first three commands (`start`, `prebuild`, and `build`) are used to build the development webserver, as well as the production bundle, for your project. `format` is used to "prettify" your JavaScript into a standardized format, as specified in `.prettierrc`. Finally, `deploy` is used to publish your project to GitHub Pages as a live demo. You can run any of these commands from the command line using `npm run <script-name>`.

The dependencies below these fields tell npm what libraries (and more specifically, which versions of these libraries) to download when you run `npm install`. If there are further packages you would like to add to your project, you can install them by running `npm install <package-name>`.

## Launching a Local Webserver
Now that your development environment is ready to go, you can spin up a local development webserver using `npm start`. This command will bundle the project code and start a development server at [http://localhost:8080/](http://localhost:8080/). Visit this in your web browser; every time you make changes to the code, *the page will automatically refresh!* If you did everything correctly, you should see something that looks like [this](https://adamfinkelstein.github.io/cos426finalproject/) in your browser. Congratulations --- now you are ready to work!

## Editing the Code
The first file you should open is `./src/app.js`. This includes the setup for your ThreeJS scene, as well important global-level operations like the render loop. At the top of the file, you will see both modular imports for objects from the ThreeJS library dependency, and also modular imports from the local project directory.

Next, navigate to `.src/components/scenes/SeedScene.js`. This file contains the definition for the class `SeedScene`, and the sets this class as the default export. The companion file `.src/components/scenes/index.js` then takes this default export and makes it visible as `SeedScene` to any files importing from the `scenes` folder. Note that if you want to add additional folders to the `.src/components` subdirectory, you will probably want to create additional `import` aliases (shortcuts) for these new folders in `webpack.config.js`.

Returning our focus to `SeedScene.js`, first take a look at the constructor. The call `super()` invokes the parent constructor for the class, which is `Scene()` here. Then we add an instance variable called `state`, and populate it with some default settings. One of these initialization, `new Dat.GUI()`, will create a simple user interface that should already be familiar to you. You can [learn more about dat.GUI here](https://github.com/dataarts/dat.gui/blob/master/API.md), or you can uninstall it from the project via `npm uninstall dat.gui`.

The next primary line after `this.state = ...` is not creating a new instance variable, but is rather modifying the `background` instance variable that was initialized in the `Scene` constructor (invoked by `super()`). Setting this property will alter the current color of the scene's background. Try changing this property to `0xff0000`, and see what happens to your pretty scene in the browser!

After (re)setting the background to a nice sky blue, turn your eyes to the next block of code, wherein we initialize and insert a few objects into the scene. Finally, at the end of the constructor, we tell the dat.GUI user interface to add a slider for the "rotationSpeed" property of `this.state`. The dat.GUI instance will automatically update `this.state.rotationSpeed` to whatever the user sets it to via the interface.

Real quickly, another interesting function in the `SeedScene` class is `update()`. If you  return to `app.js`, you will see that we invoke this function via `scene.update()` in the render loop. Be careful to understand what we are doing within `SeedScene.update()` and how it affects the dynamic behavior on the screen.

Once you understand the `SeedScene` class, the next place to look is `./src/components/objects/Flower/Flower.js`. Overall, this `Flower` class is fairly similar to `SeedScene`, but watch out for a few key differences: first, `Flower` extends `Group`, not `Scene`; second, the `Flower` constructor takes an argument, which is used to reference the `gui` property of the parent (`SeedScene` here). Finally, for a more advanced animation example, check out the `spin()` function to see how we time the flower's jump using TweenJS.

Note that if you want to add your own object folder within the `objects` directory, you will need to edit `objects/index.js`.

## Importing Local Files
Local files, such as images and 3D models, are imported into the application as URLs then loaded asynchronously with ThreeJS. Almost any filetype that ThreeJS might conceivably use should already be supported out of the box. For instance, shader files are loaded as raw text. For more information about this file loading system, as well as for instruction on how to add additional file loaders, see the [Webpack site](https://webpack.js.org/).

## Importing Modules from the Web
As mentioned above, if you want to add additional libraries to your project, you can search for packages on the [npm repository](https://www.npmjs.com/). Then, you can install them by running `npm install <package-name>`.

## Building the Project for the Web
Once you are happy with your project, try building a production bundle using `npm run build`. This will place an optimized and minified executable version of your project in the `./build/` directory. Test out this production build by setting `./build/` as your working directory and starting out a python server.

Once you have a working production build and are ready for the site to go live, you can deploy your project straight to GitHub Pages via `npm run deploy`. Note that this requires that (1) your project is part of a repository, and (2) you have correctly set up your project's `package.json` file.

## CC Attributes and Credits
Both models were downloaded from the Google Poly project:

* [Floating island](https://poly.google.com/view/eEz9hdknXOi)

* [Flower](https://poly.google.com/view/eydI4__jXpi)

This skeleton project was adapted from edwinwebb's ThreeJS [seed project](https://github.com/edwinwebb/three-seed) by Reilly Bova (Princeton ’20), and published [here on github](https://github.com/ReillyBova/three-seed). It was later slightly updated and setup as a github template by Adam Finkelstein and Joseph Lou, and is hosted [here on github](https://github.com/adamfinkelstein/cos426finalproject).

## License
[MIT](./LICENSE)
