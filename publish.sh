
#!/usr/bin/env sh
./node_modules/.bin/trash node_modules &>/dev/null;
git pull --rebase &&
npm install &&
# npm test &&
npm version ${1:-patch} &&
npm publish &&
git tag $(node -e 'process.stdout.write(require("./package.json").version)') &&
git push --follow-tags
