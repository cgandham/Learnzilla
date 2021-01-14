import todoService from "../services/sticky.services";

//fetch all todos
const index = (request, response) => {
  todoService.search({ })
   .then( (todos) => {
    response.status(200);
    response.json(todos);

   })
   .catch( handleError(response));
   

};

//get specific todo by id
const get = (request, response) => {
    const id = request.params.id;
    todoService.get(id)
        .then((todos) => {
            response.status(200);
            response.json(todos == null? {message:"Todo not present"}: todos);

        })
        .catch(handleError(response));

};

//add new toto
const create = (request, response) => {
    const newTodo = Object.assign({ }, request.body);
    todoService.create(newTodo)
    .then((todos) => {
        response.status(200);
        response.json(todos);

    })
    .catch(handleError(response));


};

//update specific todo
const update = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    const updateTodo = Object.assign({ }, request.body);
    todoService.update(id,updateTodo)
        .then((todos) => {
            response.status(200);
            response.json(todos == null? {message:"Todo not present"}: todos);

        })
        .catch(handleError(response));

};

//delete a todo
const remove = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    todoService.remove(id)
        .then((todos) => {
            response.status(200);
            response.json({
                message: "Delete Sucessful"
            });

        })
        .catch(handleError(response));

};


//fetch specific todo by id
const fetch = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    todoService.checkIDExists(id).then((check)=>{
        if(check){

            todoService.get(id)
            .then((todos) => {
                response.status(200);
                response.json(todos == null? {message:"Todo not present"}: todos);
    
            })
            .catch(handleError(response));
    
        }
        else{
            response.status(200);
            response.json("Invalid Input");
        }


    });

};


const handleError = (error, response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })

    };
    

}

export default {
    index: index,
    get: get,
    create: create,
    update: update,
    remove: remove,
    fetch: fetch
}