const { execSync } = require('child_process');
const fs = require('fs');

(() => {
  try {
    const gitStatus = execSync('git status | grep package.json').toString();
    if (gitStatus) {
      const publishedPackages = gitStatus
        .replace(/(?:\n)/g, ',')
        .replace(/(?:\n|\s|modified:)/g, '')
        .split(',')
        .filter((v) => !!v)
        .map((path) => {
          const { name, version } = JSON.parse(fs.readFileSync(path, 'utf8'));

          return {
            name,
            version,
          };
        });

      console.log(JSON.stringify(publishedPackages));
    }
  } catch (e) {}
})();
