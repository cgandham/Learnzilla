import CourseService from "../services/course.services";
import StudentService from "../services/student.services"
import mongoose from 'mongoose';

//fetch all courses
const index = (request, response) => {
    CourseService.search({ })
   .then( (courses) => {
    response.status(200);
    response.json(courses);
   })
   .catch( handleError(response));


};

//get specific course by id
const get = (request, response) => {
    const id = request.params.id;
    CourseService.get(id)
        .then((course) => {
            response.status(200);
            response.json(course == null? {message:"course not present"}: course);

        })
        .catch(handleError(response));

};

//add new course
const create = (request, response) => {
    const newCourse = Object.assign({ }, request.body);
    CourseService.create(newCourse)
    .then((course) => {
        response.status(200);
        response.json({
          "status": 200,
          "course": course,
          "message": "Course created Successfully"
        });
    })
    .catch(handleError(response));


};

//update specific course
const update = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    const updatecourse = Object.assign({ }, request.body);
    CourseService.update(id,updatecourse)
        .then((course) => {
            response.status(200);
            response.json(course == null? {message:"course not present"}: course);

        })
        .catch(handleError(response));
};

//delete a course
const remove = (request, response) => {
    const id = request.params.id;
    if(id == undefined){
        response.status(200);
        response.json("Invalid Input");
        return response;
    }
    CourseService.remove(id)
        .then((course) => {
            response.status(200);
            response.json({
                message: "Delete Sucessful"
            });

        })
        .catch(handleError(response));

};

const getStudents = (request, response) => {
    const id = request.params.id;
    //get all students and add them to a list
    StudentService.search({ })
    .then( (students) => {
    var allStudentList = students.map((c,i) => {
        return c;
    })
    let mySet = new Set()
    for (let index = 0; index < allStudentList.length; index++) {
                for (let index1 = 0; index1 < allStudentList[index].courses.length; index1++) {
            if(allStudentList[index].courses[index1] == id){
                //if course id is present then add them to new student list
                // console.log("match found")
                mySet.add(allStudentList[index].id)
            }
        }
    }
    let studentArray = Array.from(mySet);
    response.status(200);
            response.json({
                students: studentArray
            });
            console.log(students);

   })
   .catch( handleError(response));
}

const handleError = (response) => {
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
    getStudents : getStudents
}
