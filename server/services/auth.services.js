import User from './../models/user';
import Student from './../models/student';
import Teacher from './../models/teacher';

const login = (email, role) => {
    const promise = User.findOne({
      email: email,
      role: role
    });
    return promise;
}

const checkuser = (email) => {
    const promise = User.findOne({
      email: email
    });
    return promise;
}

const register = (newUser, role) => {
  const user = new User(newUser);
  user.save();
  //console.log(role);
  let promise;
  if (role == "Student") {
    const student = new Student({
      user: user._id
    });
    promise = student.save();
  } else if (role == "Teacher") {
    const teacher = new Teacher({
      user: user._id
    });
    promise = teacher.save();
  }
  // const promise = user.save();
  return promise;
}

export default {
    login: login,
    checkuser: checkuser,
    register: register
}
