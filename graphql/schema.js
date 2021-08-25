const { join } = require('path');
const { readdirSync, readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');

function getFileDeep(dirPath) {
  const files = [];
  const fileList = readdirSync(dirPath, { withFileTypes: true });
  if (fileList && fileList.length === 0) return;
  fileList.forEach((dirent) => {
    if (dirent.isDirectory()) {
      files.push(...getFileDeep(join(dirPath, dirent.name)));
    } else {
      files.push(join(dirPath, dirent.name));
    }
  });
  return files;
}

const typeDefsPath = join(__dirname, './typeDefs');
const gqlFiles = getFileDeep(typeDefsPath);

let typeDefs = '';
gqlFiles.forEach((filePath) => {
  if (filePath) {
    typeDefs += readFileSync((filePath), {
      encoding: 'utf8'
    });
  }
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
