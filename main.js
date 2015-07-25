'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Tray = require('tray');
var Menu = require('menu');

require('crash-reporter').start();

// ---------------------------------------------------------
// original helper
var Helper = {};

Helper.url = function (path) {
  var filepath = path;
  if (path instanceof Array) { filepath = path.join('/'); }
  return 'file://' + __dirname + '/' + filepath;
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
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // transparent: true,
    frame: false
  });
  mainWindow.loadUrl(Helper.url('index.html'));
  // show icon
  var appIcon = new Tray(__dirname + '/images/icon.png');

  // メニュー追加
  var contextMenu = Menu.buildFromTemplate([
    {label: 'りんご', type: 'radio'},
    {label: 'ゴリラ', type: 'radio'},
    {type: 'separator'},
    {label: '朝ごはん', submenu: [
      {label: 'のむヨーグルト'},
      {label: 'サーターアンダギー'}
      ]},
    {label: '終了', accelerator: 'Command+Q', click: function () { app.quit(); }}
  ]);
  appIcon.setContextMenu(contextMenu);
  // マウスオーバーすると
  appIcon.setToolTip('this is sample');

  mainWindow.on('closed', function () {
    console.log('main window closed :(');
    mainWindow = null;
  });
});
