import students from "../models/student"
import studentService from "./studentbyuser.services";

//Methods to perform CRUD actions on user collection

const search = (id) => {
    const promise = students.find(id).exec();
    return promise;

}

const get = (id) => {
    console.log("getting student object in get")
    const promise = students.findById(id).exec();
    return Promise.resolve(promise) ;
}

const create = (student) => {
    const newUser = new students(student);
    const promise = newUser.save();
    return promise;
}

const update = (id,student) => {
    console.log(id);
    console.log(student)
    const promise = students.findByIdAndUpdate(
        { _id: id},
        student,
        {new: true}
    ).exec();
    return promise;
}

const remove = (id,user) => {
    const promise = students.remove(
        { _id: id}
    ).exec();
    return promise;
}

var checkIDExists = (id) => {
    students.findOne({ _id: id }).select("_id").lean().then(result => {
        if (result)
            return true;  //ID exists
        else
            return false;//ID does not exist
    });
}

// const getStudentCourses = (id) => {
//     console.log("id in services is "+id);
//     console.log("getStudentCourses in student services")
//     const promise = students.findById(id).exec();
//     console.log("findby id executed "+promise)
//         promise.then((student) => {
//             var studentCourseList = student.courses.map((c, i) => {
//                 return c;
//             });

//         })
//         .catch(handleError());
//         console.log("returning studentCourseList "+studentCourseList)
//         return studentCourseList;
// }


// const getStudentCourseAssignment = (id) => {
//     console.log("id in services is "+id);
//     console.log("getStudentCourses in student services")
//     const promise = students.findById(id).exec();
//     console.log("findby id executed "+promise)
//         promise.then((student) => {
//             let studentCourseList = student.courses.map((c, i) => {
//                 return c;
//             });
//             console.log("returning studentCourseList "+studentCourseList)
//             return studentCourseList;
//         })
//         .catch(handleError());

//     students.findById(id)
//     .then((student) => {
//       console.log(student)
//     });
// }

const handleError = () => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}

export default {
    search: search,
    get: get,
    create: create,
    update:update,
    remove: remove,
    checkIDExists: checkIDExists,
    // getStudentCourses: getStudentCourses,
    // getStudentCourseAssignment: getStudentCourseAssignment,
    handleError: handleError
}
