import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        id : Int,
        name: String,
        email : String,
        password: String,
        session_id: String,
    }
    type ResponseMessage {
        msg: String,
        error: String,
    }
    type Todo {
        id : String,
        title : String,
        descricao: String,
        status: String,
        color: String,
    }
    type Mutation {
        loginUser(email: String,password: String): User
        createTodo(title: String,descricao: String,color: String,status : String,user_id : String): ResponseMessage
    }
    type Query{
        getList(user_id : Int): [Todo]
    }
`

export default typeDefs
