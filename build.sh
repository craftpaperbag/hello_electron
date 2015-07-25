mkdir Built
electron-packager ./app 'Hello Electron' --out Built\
  --overwrite\
  --platform=darwin\
  --arch=x64 --version=0.30.1\
  --icon=./app/images/icon.icns
