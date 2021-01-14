import Teacher from './../models/teacher';

const getByUserid = (userid) => {
    const promise = Teacher.find({
       user: userid
     }).populate('user').exec();
    return promise;
}

export default {
    getByUserid: getByUserid

}
