import todos from "../models/sticky"

//Methods to perform CRUD actions on todo collection

const search = (id) => {
    const promise = todos.find(id).exec();
    return promise;

}

const get = (id) => {
    const promise = todos.findById(id).exec();
    return promise;

}

const create = (todo) => {
    const newtodo = new todos(todo);
    const promise = newtodo.save();
    return promise;

}

const update = (id,todo) => {
   
    const promise = todos.findByIdAndUpdate(
        { _id: id},
        todo,
        {new: true}// add todo if not present
    ).exec();
    return promise;

}

const remove = (id,todo) => {
    const promise = todos.remove(
        { _id: id}     
    ).exec();
    return promise;

}

var checkIDExists = (id) => {
    todos.findOne({ _id: id }).select("_id").lean().then(result => {
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