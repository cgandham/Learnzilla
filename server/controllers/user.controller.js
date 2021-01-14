import UserService from "./../services/user.services";

//fetch all users
const index = (request, response) => {
    UserService.search({ })
   .then( (users) => {
    response.status(200);
    response.json(users);

   })
   .catch( handleError(response));
   

};

//get specific user by id
const get = (request, response) => {
    const id = request.params.id;
    UserService.get(id)
        .then((user) => {
            response.status(200);
            response.json(user == null? {message:"User not present"}: user);

        })
        .catch(handleError(response));

};

//add new user
const create = (request, response) => {
    const newUser = Object.assign({ }, request.body);
    UserService.create(newUser)
    .then((user) => {
        response.status(200);
        response.json(user);

    })
    .catch(handleError(response));


};

//update specific user
const update = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    const updateUser = Object.assign({ }, request.body);
    UserService.update(id,updateUser)
        .then((user) => {
            response.status(200);
            response.json(user == null? {message:"User not present"}: user);

        })
        .catch(handleError(response));

};

//delete a user
const remove = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    UserService.remove(id)
        .then((user) => {
            response.status(200);
            response.json({
                message: "Delete Sucessful"
            });

        })
        .catch(handleError(response));

};

const handleError = (response) => {
    console.log(response)
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
    remove: remove
}