const { ApolloServer, gql } = require('apollo-server');
import database, {queryDB} from './database'

const typeDefs = gql`
    type User {
        id: String
        name: String
        job_title: String
        email: String
    }
    type Query {
        getAllUsers: [User],
        getUserInfo(name: String) : [User]
    }
    type Mutation {
        updateUserInfo(id: Int, name: String, email: String, job_title: String): Boolean
        createUser(name: String, email: String, job_title: String): Boolean
        deleteUser(id: Int): Boolean
    }
`;

const resolvers =  {
    Query:{
        getAllUsers: (_,args) => queryDB("select * from users.users u").then(data => data),
        getUserInfo: async (_, { name }) => {
            const variable = `%${name}%`
            return  queryDB( "select * from users.users u  where  u.name like ?",variable).then(data => data)
        },
    },
    Mutation : {
        updateUserInfo: (_,args) => queryDB("update users.users SET ? where id = ?", [args, args.id]).then(data => data),
        createUser: (_,args) => queryDB( "insert into users.users SET ?", args).then(data => data),
        deleteUser: (_,args) => queryDB( "delete from users.users where id = ?", [args.id]).then(data => data),
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

database.connect();

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
