var config = {

    dist: 'dist',


    banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n'),

    oopsieFiles: [
        'src/index.js',
        'src/RestHelper.js',
        'src/Oopsie.js',
        'src/OopsieService.js',
        'src/OopsieObject.js',
        'src/Promise.js',
    ],


};

module.exports = config;
