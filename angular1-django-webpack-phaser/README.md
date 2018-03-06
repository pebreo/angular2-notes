
## INSTALLATION
```
# if you don't have node 9.x
brew install node
npm install --save-dev

# or manual

for windows (install "git for windows" then open: git cmd)
npm install --save-dev webpack webpack-cli 
npm install --save-dev @uirouter/angularjs 

# django
pip install django-webpack-loader

```

## WATCH
```
# compile
./node_modules/.bin/webpack --config NAME.webpack.config.js --watch


# watch
./node_modules/.bin/webpack --config NAME.webpack.config.js --watch
```