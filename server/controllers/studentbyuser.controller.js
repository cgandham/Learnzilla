import StudentByUserService from "./../services/studentbyuser.services";

//get specific student by userid
const getByUserid = (request, response) => {
    const id = request.params.userid;
    console.log(request);
    StudentByUserService.getByUserid(id)
        .then((student) => {
            response.status(200);
            response.json({message: student});
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
    getByUserid: getByUserid
}
