const { RESTDataSource } = require('apollo-datasource-rest');

class TodoListApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001/todo-api/';
    }
    async didReceiveResponse(response) {
        const body = await response.json()
        const { status = '500' } = response
        if(status == 404 || status == 500){
            return { error : response.statusText}
        }
        return { body }
    }
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.session_id);
    }
    async getTodoList() {
        const url =`list/?user_id=${this.context.user_id}`
        const response = await this.get(
            url
        );
        const list = response.body
        console.log('list',list)
        return list
    }
}

export default TodoListApi
