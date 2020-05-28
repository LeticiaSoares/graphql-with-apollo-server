import fetch from 'node-fetch'

function buildHeaders(args) {
    const header = {
        'Content-Type': 'application/json',
        'user': args || "",
    };
    return header
}

export const save = (data) =>{
    console.log('data',data)
    const header = buildHeaders({ user : data.email})
    console.log('header',header)
    return fetch('http://localhost:3001/todo-api/todo',{
        method:'POST',
        body:  JSON.stringify(data),
        headers : header,
    })
}

export const getList = async (email) =>{
    const header = buildHeaders({ user : email})
    return fetch('http://localhost:3001/todo-api/list',{
        method:'GET',
        headers : header,
    })
}

export const login = async (data) =>{
    const header = buildHeaders()
    return fetch('http://localhost:3001/todo-api/login',{
        method : 'POST',
        body:  JSON.stringify(data),
        headers : header
    })
}
