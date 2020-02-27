const  { graphql, buildSchema } = require('graphql');
const readFile = require('./readFileList.js');

const schema = buildSchema(`
  type Query {
    hello: String
    hello2: String
    hello3: String
    hello4: String
    fileList: String
  }
`);

// console.log('schema', schema);

rootValue = {
  hello: 'world',
  hello2: () => {
    throw new Error('hello2 ERROR')
  },
  hello3: async () => 'world',
  hello4: () => {
    throw new Error('hello4 ERROR')
  },
  fileList: () => readFile()
}

source = '{hello hello2 hello3 hello4, fileList}'

graphql({ schema, rootValue, source}).then(({data, errors}) => {
  console.log(JSON.stringify(data));
  console.log(JSON.stringify(errors));
});