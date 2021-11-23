import apiHelpers from "./apiHelpers";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const login = async function(user){
  var response = await apiHelpers.httpPost('/user/login',user);
  cookies.set("Authorization",`Bearer ${response.access_token}`);
}

const register = async function(user){
  return await apiHelpers.httpPost('/user/register',user);
}


const usersApi = {
  login: login,
  register: register
};

export default usersApi;
