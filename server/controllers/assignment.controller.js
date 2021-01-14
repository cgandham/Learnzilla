import AssignmentService from "../services/assignment.services";

//fetch all assignments
const index = (request, response) => {
    AssignmentService.search({ })
   .then( (assignments) => {
    response.status(200);
    response.json(assignments);
   })
   .catch( handleError(response));


};

//get specific assignment by id
const get = (request, response) => {
    const id = request.params.id;
    AssignmentService.get(id)
        .then((assignment) => {
            response.status(200);
            response.json(assignment == null? {message:"assignment not present"}: assignment);
        })
        .catch(handleError(response));
};

//add new assignment
const create = (request, response) => {
    const newCourse = Object.assign({ }, request.body);
    AssignmentService.create(newCourse)
    .then((assignment) => {
        response.status(200);
        response.json({
          "status": 200,
          "assignment": assignment,
          "message": "Course created Successfully"
        });
    })
    .catch(handleError(response));
};

//update specific assignment
const update = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    const updateassignment = Object.assign({ }, request.body);
    AssignmentService.update(id,updateassignment)
        .then((assignment) => {
            response.status(200);
            response.json(assignment == null? {message:"assignment not present"}: assignment);
          //  response.json(assignment);
        })
        .catch(handleError(response));

};

//delete a assignment
const remove = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    AssignmentService.remove(id)
        .then((assignment) => {
            response.status(200);
            response.json({
                message: "Delete Sucessful"
            });

        })
        .catch(handleError(response));

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
    remove: remove
}
