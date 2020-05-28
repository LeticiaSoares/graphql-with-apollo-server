const { ApolloServer, gql } = require('apollo-server');
import LoginApi from './dataSources/login'
import TodoListApi from './dataSources/todolist'

const typeDefs = gql`
    type User {
        id : Int,
        name: String,
        email : String,
        password: String,
        session_id: String,
    }
    type Todo {
        id : Int,
        title : String,
        descricao: String,
        status: String,
        color: String,
    }
    type Mutation {
        loginUser(email: String,password: String): User
    }
    type Query{
        getList(user_id : Int): [Todo]
    }
`;

const resolvers =  {
    Query:{
        getList:async (_,args,{ dataSources}) =>{
            return await dataSources.todoApi.getTodoList(args)
        }
    },
    Mutation : {
        loginUser : async (_,args,{ dataSources}) =>{
            return await dataSources.loginApi.login(args)
        }
    },
};

const context = ({ req, res }) => ({
    request: req,
    response: res,
    session_id : req.headers.authorization,
    user_id: req.headers.user_id ? req.headers.user_id : null
});

const server = new ApolloServer(
    {
        resolvers,
        typeDefs,
        context,
        dataSources: () =>{
            return {
                loginApi: new LoginApi(),
                todoApi: new TodoListApi(),
            }
        }
    }
);

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
