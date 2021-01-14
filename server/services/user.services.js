import users from "../models/user"

//Methods to perform CRUD actions on user collection

const search = (id) => {
    const promise = users.find(id).exec();
    return promise;

}

const get = (id) => {
    const promise = users.findById(id).exec();
    return promise;

}

const create = (user) => {
    const newUser = new users(user);
    const promise = newUser.save();
    return promise;
}

const update = (id,user) => {
   
    const promise = users.findByIdAndUpdate(
        { _id: id},
        user,
        {new: true}// add user if not present
    ).exec();
    return promise;
}

const remove = (id,user) => {
    const promise = users.remove(
        { _id: id}     
    ).exec();
    return promise;

}

var checkIDExists = (id) => {
    users.findOne({ _id: id }).select("_id").lean().then(result => {
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