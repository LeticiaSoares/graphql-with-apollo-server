const { RESTDataSource } = require('apollo-datasource-rest');

class LoginApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001/todo-api/';
    }
     async didReceiveResponse(response) {
        const session_id = response.headers.get("session_id")
        const body = await response.json()
         const { status = '500' } = response
         console.log('status',response.status)
         if(status == 404 || status == 500){
             return { error : response.statusText}
         }
        return { body, session_id: session_id }
    }
    willSendRequest(request) {
        console.log('session_id',this.context.session_id)
        request.headers.set('Authorization', this.context.session_id);
    }
    async login(data) {
        const response = await this.post(
            `login`,
            data
        );
        return JSON.stringify(response)
    }
}


export default LoginApi
