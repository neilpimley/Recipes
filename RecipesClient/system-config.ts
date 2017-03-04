/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
declare var System: any;

System.config({
  paths: {
      'npm:': 'node_modules/'
  },
  map: {
    'app': 'app',
    'main': 'app/main.js',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

    // other libraries
    'rxjs': 'npm:rxjs',
    //'jquery': 'npm:jquery/dist/jquery.js',
    'moment': 'npm:moment/moment.js',
    'ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
    'ng2-table': 'npm:ng2-table',
    'angular2-jwt': 'npm:angular2-jwt/angular2-jwt.js',
    'ng2-modal': 'npm:ng2-modal',
    'angular2-notifications': 'npm:angular2-notifications'
  },
  packages: {
    'app': { main: './app/main.js', defaultExtension: 'js' },
    'api' : { defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'angular2-jwt': { defaultExtension: 'js' },
    'angular2-notifications': { main: 'components.js', defaultExtension: 'js' },
    'ng2-modal': { main: 'index.js', defaultExtension: 'js' },
    'ng2-table': { defaultExtension: 'js' }

    // barrels
    // 'app/core':   { main: 'index'},
    // 'app/models': { main: 'index'},
  }
});
