const { ApolloServer, gql } = require('apollo-server');
import { save, getList , login} from './services'
import LoginApi from './dataSources/login'

const typeDefs = gql`
    type User {
        id : Int,
        name: String,
        email : String,
        password: String
    }
    type Mutation {
        loginUser(email: String,password: String): String
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
            return save(args).then(response => {
                const {status} = response;
                if (status == 201) {
                    return "Salvo com Sucesso"
                }
                return 'Erro no Cadastro'
            })
        },
        loginUser : async (_,args,{ dataSources}) =>{
            return await dataSources.loginApi.login(args)
        }
    }
};

const context = ({ req, res }) => ({
    request: req,
    response: res,
    session_id : req.headers.authorization
});

const server = new ApolloServer(
    {
        resolvers,
        typeDefs,
        context,
        dataSources: () =>{
            return {
                loginApi: new LoginApi(),
            }
        }
    }
);

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
