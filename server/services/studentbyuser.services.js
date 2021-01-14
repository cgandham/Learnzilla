import Student from '../models/student';

const getByUserid = (userid) => {
    const promise = Student.find({
       user: userid
     }).populate('user').exec();
    return promise;
}

export default {
    getByUserid: getByUserid

}
