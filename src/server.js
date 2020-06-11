import {ApolloServer} from 'apollo-server';

import LoginApi from './dataSources/login'
import TodoListApi from './dataSources/todolist'

import typeDefs from './typeDefs'
import resolvers from './resolvers'


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
    console.log(`Apollo server started ${url}`);
});
