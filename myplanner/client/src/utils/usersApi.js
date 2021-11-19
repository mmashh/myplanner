import apiHelpers from "./apiHelpers";



const login = async function(user){
  var response = await apiHelpers.httpPost('/user/login',user);
  return response.access_token;
}

const register = async function(user){
  return await apiHelpers.httpPost('/user/register',user);
}


const usersApi = {
  login: login,
  register: register
};

export default usersApi;
