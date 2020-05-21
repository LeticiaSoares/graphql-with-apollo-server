import fetch from 'node-fetch'

function buildHeaders(args) {
    const header = {
        'Content-Type': 'application/json',
        'user': args.user,
    };
    return header
}

// return http(`${config.enduser.register}`, {
//     headers,
//     method: 'POST',
//     body: JSON.stringify(user),
//     credentials: 'include',
// });

export const save = (data) =>{
    console.log('data',data)
    const header = buildHeaders({ user : data.email})
    console.log('header',header)
    return fetch('http://localhost:3000/todo-api/todo',{
        method:'POST',
        body:  JSON.stringify(data),
        headers : header,
    })
}

export const getList = async (email) =>{
    const header = buildHeaders({ user : email})
    return fetch('http://localhost:3000/todo-api/list',{
        method:'GET',
        headers : header,
    })
}
