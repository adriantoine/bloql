#!/usr/bin/env sh

rm -rf node_modules

npm install &&
# npm test &&
npm version ${1:-patch} &&
npm run build

cd dist/
npm publish

git push origin master --follow-tags
