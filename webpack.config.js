const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')
    
    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.js')
    .addEntry('fullcalendar', './assets/js/fullcalendar.js')
    .addEntry('modal-supprime', './assets/js/modal/modal-supprime.js')
    .addEntry('darkmode', './assets/js/darkmode.js')
    .addEntry('dropdown', './assets/js/dropdown.js')
    .addEntry('tinyMce', './assets/js/tinyMce.js')
    .addEntry('ajax-loader', './assets/js/lib/ajax-loader.js')
    .addEntry('scripts', './assets/js/scripts.js')
    .addEntry('dropdown-styles', './assets/styles/dropdown-styles.css')
    .addEntry('modal', './assets/styles/modal.css')
    .addEntry('flash-bag', './assets/js/flash-bag.js')
    .addEntry('message.index.reception', './assets/js/pages/message.index.reception.js')
    .addEntry('utilisateur.index', './assets/js/pages/utilisateur.index.js')
    .addEntry('message.index.corbeille', './assets/js/pages/message.index.corbeille.js')
    .addEntry('nice-alert', './assets/js/pages/message.index.corbeille.js')
    .addEntry('message.index.favoris', './assets/js/pages/message.index.favoris.js')
    .addEntry('message.show.reception', './assets/js/pages/message.show.reception.js')
    .addEntry('message.show.corbeille', './assets/js/pages/message.show.corbeille.js')
    .addEntry('message.show.favoris', './assets/js/pages/message.show.favoris.js')
    .addEntry('bootstrap.bundle.min', './assets/js/core/bootstrap.bundle.min.js')
    .addEntry('bootstrap.min', './assets/js/core/bootstrap.min.js')
    .addEntry('popper.min', './assets/js/core/popper.min.js')
    .addEntry('bootstrap-notify', './assets/js/plugins/bootstrap-notify.js')
    .addEntry('Chart.extension', './assets/js/plugins/Chart.extension.js')
    .addEntry('chartjs.min', './assets/js/plugins/chartjs.min.js')
    .addEntry('perfect-scrollbar.min', './assets/js/plugins/perfect-scrollbar.min.js')
    .addEntry('smooth-scrollbar.min', './assets/js/plugins/smooth-scrollbar.min.js')
    .addEntry('proscroll', './assets/js/proscroll.js')
    .addEntry('navbar-change', './assets/js/navbar-change.js')
    .addEntry('video-calling/video-call.index', './assets/js/video-calling/video-call.index.js')
   // .addEntry('get_token', './assets/js/video-calling/get_token.js')
    .addEntry('tchat-app-video', './assets/js/video-calling/tchat-app-video.js')
    .addEntry('cours.index', './assets/js/cours/cours.index.js')
    .addEntry('animation-book', './assets/js/animation-book.js')
    .addEntry('video-enter', './assets/styles/video-enter.css')
    .addEntry('toggle-menu-open', './assets/styles/toggle-menu-open.css')
    .addEntry('video-tchat', './assets/styles/video-tchat.css')
    .addEntry('video', './assets/styles/video.css')
    .addEntry('photo.index', './assets/js/photo/photo.index.js')
    .addEntry('closeelement', './assets/js/closeelement.js')
    .addEntry('chart.index', './assets/js/chart/chart.index.js')
    .addEntry('bar-chart', './assets/js/chart/bar-chart.js')
    .addEntry('toggle.menu', './assets/js/toggle/toggle.menu.js')
    .addEntry('side-navbar', './assets/js/sidebar/side-navbar.js')
    .addEntry('school-dashboard', './assets/styles/school-dashboard.css')
    .addEntry('flash-bag-index', './assets/styles/flash-bag-index.css')
    
    .copyFiles([
        {from: './node_modules/ckeditor/', to: 'ckeditor/[path][name].[ext]', pattern: /\.(js|css)$/, includeSubdirectories: false},
        {from: './node_modules/ckeditor/adapters', to: 'ckeditor/adapters/[path][name].[ext]'},
        {from: './node_modules/ckeditor/lang', to: 'ckeditor/lang/[path][name].[ext]'},
        {from: './node_modules/ckeditor/plugins', to: 'ckeditor/plugins/[path][name].[ext]'},
        {from: './node_modules/ckeditor/skins', to: 'ckeditor/skins/[path][name].[ext]'}
    ])
    
    
    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')
    
    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()
    
    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()
    .enableSassLoader()
    .enableReactPreset()
    
    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
    .enableTypeScriptLoader()
    
    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })
    
    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })
    .copyFiles({
        from: './assets/images',
        to: 'images/[path][name].[hash:8].[ext]'
    })
// enables Sass/SCSS support
//.enableSassLoader()

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

// uncomment if you use React
//.enableReactPreset()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()
;
module.exports = Encore.getWebpackConfig();
