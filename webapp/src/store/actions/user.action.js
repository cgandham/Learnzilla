import * as ActionTypes from './action-types';

export const logoutUser = () => dispatch => {
  dispatch({
    type: ActionTypes.LOGOUT_USER
  })
};

export const loginUser = userData => dispatch => {
  let loginUrl = '/auth/login/';
  fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify({
      "email": userData.email,
      "password": userData.password,
      "role": userData.role
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((responseJson) => {
    if (responseJson.status >= 200 && responseJson.status < 300) {
      dispatch({ type: ActionTypes.LOGIN_USER, payload: responseJson})
    } else {
      alert(JSON.stringify(responseJson.status + " : " + responseJson.message));
      dispatch({ type:ActionTypes.ERRORS, responseJson})
    }
  })
  .catch(err =>
    {
     // alert(JSON.stringify(err));
      dispatch({
        type: ActionTypes.ERRORS,
        payload: err.response
      })
    }

  );
};


export const registerUser = userData => dispatch => {
  let registerUrl = '/auth/register/';
  fetch(registerUrl, {
    method: 'POST',
    body: JSON.stringify({
      'name': userData.name,
      'address': userData.address,
      'email': userData.email,
      'password': userData.password,
      'university': userData.university,
      'role': userData.role
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((responseJson) => {
   alert(responseJson.message);
    if (responseJson.status >= 200 && responseJson.status < 300) {
      dispatch({ type: ActionTypes.REGISTER_USER, payload: responseJson})
    } else {
      dispatch({ type:ActionTypes.ERRORS, responseJson})
    }
  })
  .catch(err =>
    dispatch({
      type: ActionTypes.ERRORS,
      payload: err.response
    })
  );
};

export const updateUser = (id,data) => dispatch => {
  let registerUrl = '/users/'+id;
  fetch(registerUrl, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((responseJson) => {
    alert("Update Sucessful");
    if (responseJson.status >= 200 && responseJson.status < 300) {
      dispatch({ type: ActionTypes.UPDATE_USER, payload: responseJson})
    } else {
      dispatch({ type:ActionTypes.ERRORS, responseJson})
    }
  })
  .catch(err =>
    dispatch({
      type: ActionTypes.ERRORS,
      payload: err.responseJson
    })
  );
};
