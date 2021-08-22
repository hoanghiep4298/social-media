const { join } = require('path');
const { readdirSync, readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers')
const dirPath = join(__dirname, './typedefs');
// const dirPath = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';
// let files = [];
function getFileDeep(dirPath) {
  let files = [];
  const fileList = readdirSync(dirPath, { withFileTypes: true });
  if (fileList && fileList.length === 0) return;
  fileList.forEach((dirent) => {
    if (dirent.isDirectory()) {
      files.push(...getFileDeep(join(dirPath, dirent.name)));
    } else {
      files.push(join(dirPath, dirent.name));
    }
  });
  return files
}

const gqlFiles = getFileDeep(dirPath);

gqlFiles.forEach((filePath) => {
  if (filePath) {
    typeDefs += readFileSync((filePath), {
      encoding: 'utf8',
    });
  }
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;