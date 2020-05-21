const { ApolloServer, gql } = require('apollo-server');
import { save, getList } from './services'

const typeDefs = gql`
    type Todo {
        id : Int
        title: String
        descricao: String
        status: String
    }
    type User {
        id : Int,
        email : String,
    }
    type Query {
        getList: [Todo],
        getTodoInfo(title: String) : [Todo]
    }
    type Mutation {
        saveTodo(title: String, descricao: String, status: String, email: String ): String
    }
`;

const resolvers =  {
    Query:{
        getList:(_, { email}) => {
             return getList(email).then( async response => {
                const {status} = response;
                const data = await response.json();
                if (status == 201) {
                    return data
                }
                return 'Erro no Cadastro'
            })
        },
    },
    Mutation : {
        saveTodo : (_,args) => {
            console.log('args',args)
            return save(args).then(response => {
                console.log('response',response)
                const {status} = response;
                if (status == 201) {
                    return "Salvo com Sucesso"
                }
                return 'Erro no Cadastro'
            })
        }
    }
};


// const resolvers =  {
//     Query:{
//         getAllUsers: (_,args) => queryDB("select * from users.users u").then(data => data),
//         getUserInfo: async (_, { name }) => {
//             const variable = `%${name}%`
//             return  queryDB( "select * from users.users u  where  u.name like ?",variable).then(data => data)
//         },
//     },
//     Mutation : {
//         updateUserInfo: (_,args) => queryDB("update users.users SET ? where id = ?", [args, args.id]).then(data => data),
//         createUser: (_,args) => queryDB( "insert into users.users SET ?", args).then(data => data),
//         deleteUser: (_,args) => queryDB( "delete from users.users where id = ?", [args.id]).then(data => data),
//     }
// };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
