import assignments from "../models/assignment";
import courses from "../models/course";

//Methods to perform CRUD actions on todo collection

const search = (id) => {
    const promise = assignments.find(id).exec();
    return promise;

}

const get = (id) => {
    const promise = assignments.findById(id).exec();
    return promise;
}

const create = (assignment) => {
    const newAssignment = new assignments(assignment);
    const promise = newAssignment.save();
    return promise;
}

// const create = (assignment) => {
//     const newAssignment = new assignments({
//       'assignmentname': assignment.assignmentname,
//       'assignmentdescription': assignment.assignmentdescription,
//       'assignmentstartdate': assignment.assignmentstartdate,
//       'assignmentenddate': assignment.assignmentenddate,
//       'assignmentscrore': assignment.assignmentscrore,
//       'courseid': assignment.courseid
//     });
//     const promise = newAssignment.save();
//     return promise;
// }

const update = (id,assignment) => {
    const promise = assignments.findByIdAndUpdate(
        { _id: id},
        assignment,
        {new: true}// add assignment if not present
    ).exec();
}

const remove = (id,assignment) => {
    const promise = assignments.remove(
        { _id: id}
    ).exec();
    return promise;

}

var checkIDExists = (id) => {
    assignments.findOne({ _id: id }).select("_id").lean().then(result => {
        if (result)
            return true;  //ID exists
        else
            return false;//ID does not exist
    });
}

export default {
    search: search,
    get: get,
    create: create,
    update:update,
    remove: remove,
    checkIDExists: checkIDExists

}
