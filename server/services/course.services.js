import courses from "../models/course"

//Methods to perform CRUD actions on todo collection

const search = (id) => {
    const promise = courses.find(id).exec();
    return promise;
}

const get = (id) => {
    const promise = courses.findById(id).exec();
    return promise;

}

const create = (course) => {
    const newCourse = new courses(course);
    const promise = newCourse.save();
    return promise;
}

const update = (id,course) => {

    const promise = courses.findByIdAndUpdate(
        { _id: id},
        course,
        {new: true}// add course if not present
    ).exec();
    return promise;
}

const remove = (id,course) => {
    const promise = courses.remove(
        { _id: id}
    ).exec();
    return promise;

}

var checkIDExists = (id) => {
    courses.findOne({ _id: id }).select("_id").lean().then(result => {
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
