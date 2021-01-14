import teachers from "../models/teacher"

//Methods to perform CRUD actions on user collection

const search = (id) => {
    const promise = teachers.find(id).exec();
    return promise;

}

const get = (id) => {
    const promise = teachers.findById(id).exec();
    return promise;
}

const create = (teacher) => {
    const newUser = new teachers(teacher);
    const promise = newUser.save();
    return promise;
}

const update = (id,teacher) => {
    const promise = teachers.findByIdAndUpdate(
        { _id: id},
        teacher,
        {new: true}
    ).exec();
    return promise;
}

const remove = (id,user) => {
    const promise = teachers.remove(
        { _id: id}
    ).exec();
    return promise;

}

var checkIDExists = (id) => {
    teachers.findOne({ _id: id }).select("_id").lean().then(result => {
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
