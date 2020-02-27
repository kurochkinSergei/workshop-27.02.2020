const  { graphql, buildSchema } = require('graphql');

class User {
  constructor({ firstName, lastName }) {
    this.firstName = firstName;
    this.lastName = lastName;  
  }

  friends() {
    return [
      new User({ firstName: `${this.firstName} - friend 1`}),
      new User({ firstName: `${this.firstName} - friend 2`}),
    ]
  }
}

const schema = buildSchema(`
  type Query {
    user: User
  }

  type User {
    firstName: String
    lastName: String
    friends: [User]
  }
`);

// console.log('schema', schema);

rootValue = {
  user: {
    firstName: () => {
      return 'Pupa';
    },
    lastName: () => {
      return 'Lupa';
    },
    friends: async () => [new User({firstName: 'Poruchik'}), new User({ firstName: 'Pet\'ka'})]
  }
}

source = '{user { firstName, friends { firstName, friends { firstName } }}}'

graphql({ schema, rootValue, source}).then(({data, errors}) => {
  console.log('DATA::', '\n', JSON.stringify(data, null, 2), '\n');
  console.log('ERRORS::', '\n', JSON.stringify(errors, null, 2));
});