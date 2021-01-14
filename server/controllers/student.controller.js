import StudentService from "./../services/student.services";
import CourseService from "./../services/course.services"

//fetch all users
const index = (request, response) => {
    StudentService.search({ })
   .then( (students) => {
    response.status(200);
    response.json(students);
   })
   .catch( handleError(response));
};

//get specific user by id
const get = (request, response) => {
    const id = request.params.id;
    // console.log(id);
    StudentService.get(id)
        .then((student) => {
            response.status(200);
            response.json({message: student});
        })
        .catch(handleError(response));
};

//add new user
const create = (request, response) => {
    const newUser = Object.assign({ }, request.body);
    StudentService.create(newUser)
    .then((student) => {
        response.status(200);
        response.json(student);
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
    const updateStudent = Object.assign({}, request.body);

    StudentService.update(id,updateStudent)
        .then((student) => {
            response.status(200);
            response.json({message:"Student Updated Successfully"});
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
    StudentService.remove(id)
        .then((user) => {
            response.status(200);
            response.json({
                message: "Delete Sucessful"
            });
        })
        .catch(handleError(response));

};

const getCourses = (request, response) => {
    console.log("in student controller getcourses")
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    console.log("id is "+id);
    StudentService.get(id)
        .then((student) => {
            var studentCourseList = student.courses.map((c, i) => {
                return c;
            });
            response.status(200);
            response.json({
                courses: studentCourseList
            });
            console.log(courses);

        })
};


const getAssignments = (request, response) => {
    console.log("in student controller getAssignments")
    const studentid = request.params.studentid;
    const courseid = request.params.courseid;
    console.log("studentid is "+studentid);
    console.log("courseid is "+courseid);
    if(studentid == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    StudentService.get(studentid)
        .then((student) => {
            var studentCourseList = student.courses.map((c, i) => {
                return c;
            });
            console.log("Fetching courses succesful "+studentCourseList)
            var assignmentList = [];
            for (let i in studentCourseList) {
                console.log(studentCourseList[i])
                if(studentCourseList[i] == courseid){
                    console.log("found course ")
                   CourseService.get(studentCourseList[i])
                    .then((course) => {
                        console.log("got course obj")
                        for(let j in course.assignment){
                            console.log("push each assignment")
                            assignmentList.push(course.assignment[j]);
                            response.status(200);
                            response.json({
                                assignments: assignmentList
                            });
                        }
                    })
                }
            }
            
        })
    }


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
    remove: remove,
    getCourses: getCourses,
    getAssignments: getAssignments
}
