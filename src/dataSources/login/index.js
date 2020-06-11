const { RESTDataSource } = require('apollo-datasource-rest');

class LoginApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001/todo-api/';
    }
     async didReceiveResponse(response) {
        const session_id = response.headers.get("Authorization")
        const user_id =  response.headers.get('user_id')
        const body = await response.json()
        const { status = '500' } = response

        if(status == 404 || status == 500){
            return { error : response.statusText}
        }

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
        console.log('login response',response)
        return { session_id : response.session_id, id : response.user_id}
    }
}

export default LoginApi
