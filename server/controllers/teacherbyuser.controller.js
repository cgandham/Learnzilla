import TeacherByUserService from "./../services/teacherbyuser.services";

//get specific teacher by userid
const getByUserid = (request, response) => {
    const id = request.params.userid;
    console.log(request);
    TeacherByUserService.getByUserid(id)
        .then((teacher) => {
            response.status(200);
            response.json({message: teacher});
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
