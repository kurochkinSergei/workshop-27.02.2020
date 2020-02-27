const  { graphql, buildSchema } = require('graphql');

class User {
  constructor({ firstName, lastName }) {
    this.firstName = firstName;
    this.lastName = lastName;  
  }

  ip(args, context) {
    return context.toString();
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

rootValue = {
  user: {
    firstName: () => {
      return 'Pupa';
    },
    lastName: () => {
      return 'Lupa';
    },
    friends: async () => [
      new User({firstName: 'Poruchik'}),
      new User({ firstName: 'Pet\'ka'}),
    ]
  }
}

source = `{
  user {
    ip,
    firstName,
    friends {
      ip,
      firstName,
      friends {
        ip,
        firstName
      }
    }
  }
}`

graphql({ schema, rootValue, source, context}).then(({data, errors}) => {
  console.log('DATA::', '\n', JSON.stringify(data, null, 2), '\n');
  console.log('ERRORS::', '\n', JSON.stringify(errors, null, 2));
});