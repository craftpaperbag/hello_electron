'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

// ---------------------------------------------------------
// original helper
var Helper = {};

Helper.url = function (path) {
  var filepath = path;
  if (path instanceof Array) { filepath = path.join('/'); }
  return 'file://' + __dirname + '/' + filename;
};

// ---------------------------------------------------------


// avoid GC
var mainWindow = null;

app.on('window-all-closed', function () {
  console.log('all window closed');
  if (process.platform != 'darwin') {
    app.quit();
  }
});


app.on('ready', function (){
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl(Helper.url('index.html'));

  mainWindow.on('closed', function () {
    console.log('main window closed :(');
    mainWindow = null;
  });
});
