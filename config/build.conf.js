var pkg = require('../package.json');
var fs = require('fs');

module.exports = {

    dist: 'dist',


    banner:
        '/*!\n' +
        ' * Copyright 2015 Drifty Co.\n' +
        ' * http://drifty.com/\n' +
        ' *\n' +
        ' * Ionic, v<%= pkg.version %>\n' +
        ' * A powerful HTML5 mobile app framework.\n' +
        ' * http://ionicframework.com/\n' +
        ' *\n' +
        ' * By @maxlynch, @benjsperry, @adamdbradley <3\n' +
        ' *\n' +
        ' * Licensed under the MIT license. Please see LICENSE for more information.\n'+
        ' *\n' +
        ' */\n\n',

    closureStart: '(function() {\n',
    closureEnd: '\n})();',

    oopsieFiles: [
        'src/index.js',
        'src/RestHelper.js',
        'src/Oopsie.js',
        'src/OopsieMeta.js',
        'src/OopsieService.js',
        'src/OopsieObject.js',
        'src/Promise.js',
    ],


};
