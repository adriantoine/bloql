
#!/usr/bin/env sh
./node_modules/.bin/trash node_modules &>/dev/null;

npm install &&
# npm test &&
npm version ${1:-patch} &&
npm run build &&
git tag $(node -e 'process.stdout.write(require("./package.json").version)') &&
git push origin master --follow-tags

cd dist
npm publish &&
