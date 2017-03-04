var fs = require('fs');
var resources = [
  'node_modules/core-js/client/shim.min.js',
  'node_modules/zone.js/dist/zone.min.js',
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'css/typography.css'
];
resources.map(function (f) {
    var path = f.split('/');
    var t = 'aot/' + path[path.length - 1];
    fs.createReadStream(f).pipe(fs.createWriteStream(t));
});

var images = [
  'images/gears.gif',
  'images/loader.gif',
  'images/newlogo.png',
  'images/logo_grey_services.png',
  'maple-glazed-brioche-bun.jpg',
  'milk-rolls-with-bacon.jpg',
  'smoked-ham-cheese-pancakes.jpg'
];

images.map(function (f) {
    var path = f.split('/');
    var t = 'aot/images/' + path[path.length - 1];
    fs.createReadStream(f).pipe(fs.createWriteStream(t));
});

