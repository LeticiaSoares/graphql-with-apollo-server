const resolvers =  {
    Query:{
        getList: async (_,{ user_id },{ dataSources}) =>{
            return await dataSources.todoApi.getTodoList(user_id)
        }
    },
    Mutation : {
        loginUser : async (_,args,{ dataSources}) =>{
            return await dataSources.loginApi.login(args)
        },
        createTodo: async (_,args,{ dataSources})=>{
            return await dataSources.todoApi.createTodo(args)
        },
    },
};

export default resolvers
