'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Tray = require('tray');
var Menu = require('menu');

require('crash-reporter').start();

// ---------------------------------------------------------
// original helper
var Helper = {};

Helper.url = function (path, onlyPath) {
  var filepath = path;
  if (path instanceof Array) { filepath = path.join('/'); }

  if (onlyPath) { return __dirname + '/' + filepath; }
  return 'file://' + __dirname + '/' + filepath;
};

Helper.filepath = function (path) {
  return Helper.url(path, true);
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


// ---------------------------------------------------------

// menu
var menu = Menu.buildFromTemplate([
  {
    label: 'Hello Electron',
    submenu: [
      {label: 'About'},
      {label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit(); }}
    ]
  },
  {
    label: 'File',
    submenu: [
      {label: 'New File'},
      {label: 'Paste'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
      {label: 'Paste', accelerator: 'Command+C', selector: 'paste'},
    ]
  }
]);


app.on('ready', function (){

  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // transparent: true,
    frame: false
  });
  mainWindow.loadUrl(Helper.url('index.html'));
  // show icon
  var appIcon = new Tray(Helper.filepath(['images','icon.png']));

  // メニュー追加
  var contextMenu = Menu.buildFromTemplate([
    {label: 'りんご', type: 'radio'},
    {label: 'ゴリラ', type: 'radio'},
    {type: 'separator'},
    {label: '朝ごはん', submenu: [
      {label: 'のむヨーグルト'},
      {label: 'サーターアンダギー'}
      ]},
  ]);
  appIcon.setContextMenu(contextMenu);
  // マウスオーバーすると
  appIcon.setToolTip('this is sample');

  mainWindow.on('closed', function () {
    console.log('main window closed :(');
    mainWindow = null;
  });
});

app.on('will-quit', function () {
});
