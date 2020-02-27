const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootGraphQLQuery',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return 'world'
        }
      }
    }
  })
});

const source = `{ hello }`;

graphql({schema, source}).then(({data}) => {
  console.log(JSON.stringify(data,null, 2));
});