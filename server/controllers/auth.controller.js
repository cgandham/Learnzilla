import AuthService from "./../services/auth.services";
import bcrypt from 'bcrypt';

const saltRounds = 10;

//login
const login = (request, response) => {

    const email = request.body.email;
    const password = request.body.password;
    const role = request.body.role;
    // console.log(email);
    // console.log(password);
    // console.log(role);
    AuthService.login(email, role)
      .then((foundUser) => {
        console.log(foundUser);
        if (foundUser) {
          bcrypt.compare(password, foundUser.password).then(result => {
            if (result === false) {
              return response.status(401).json({
                "status": 401,
                "message": "This is the wrong password"
              })
            } else {
              return response.status(200).json({
                "auth": role,
                "status": 200,
                "user": foundUser,
                "message": "Successfully Logged in"
              })
            }
          })
        } else {
          return response.status(401).json({
            "status": 401,
            "message": "No user with this email"
          })
        }
      })
      .catch(handleError(response));
};

//logout
const logout = (request, response) => {
    AuthService.logout({ })
   .then( (auth) => {
    response.status(200);
    response.json(auth);
   })
   .catch( handleError(response));
};

const register = (request, response) => {
    AuthService.checkuser(request.body.email)
      .then((foundUser) => {
        if (foundUser) {
          return response.status(409).json({
            "auth": request.body.role,
            "status": 409,
            "message": "Email already exsists"
          });
        } else {
          bcrypt.hash(request.body.password, saltRounds).then(hash => {
            request.body.password = hash;
            const newUser = Object.assign({}, request.body);
            console.log(newUser);
            AuthService.register(newUser, request.body.role)
          }).then((user) => {
            response.status(200);
            response.json({
              "auth": request.body.role,
              "status": 200,
              "user": user,
              "message": "Successfully Registered"
            });
          }).catch(handleError(response));
      }
  });
};




const handleError = (error, response) => {
    return (error) => {
        console.log(error);
        response.status(500);
        response.json({
          "auth": request.body.role,
          "status": 500,
          "message": error.message
        })

    };


}

export default {
    login: login,
    logout: logout,
    register: register
}
