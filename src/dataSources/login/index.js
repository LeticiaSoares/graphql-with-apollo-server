const { RESTDataSource } = require('apollo-datasource-rest');

class LoginApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001/todo-api/';
    }
     async didReceiveResponse(response) {
        const session_id = response.headers.get("Authorization").split(' ')[1]
         const user_id =  response.headers.get('user_id')
         console.log('user_id',user_id)
        const body = await response.json()
         const { status = '500' } = response
         //console.log('status',response.status)
         if(status == 404 || status == 500){
             return { error : response.statusText}
         }
         //console.log('body',body)
         //console.log('session_id',session_id)
        return { body, session_id, user_id }
    }
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.session_id);
    }
    async login(data) {
        const response = await this.post(
            `login`,
            data
        );
        console.log('response',response)
        return { session_id : response.session_id, id : response.user_id}
    }
}


export default LoginApi
