import apiHelpers from "./apiHelpers";
import Cookies from 'universal-cookie';
import handlePromiseError from './handlePromiseError';


const cookies = new Cookies();

const login = async function(user){
  try {
    var response = await apiHelpers.httpPost('/user/login',user);
    cookies.set("Authorization",`Bearer ${response.data?.access_token}`);
    return {
      info: "User successfully logged in"
    }
  } catch (err) {
    return handlePromiseError(err);
  }
  
}

const logout = async function() {
  try {
    var response = await apiHelpers.httpPost('/user/logout');
    return {
      info: "User successfully logged out"
    }
  } catch (err) {
    return handlePromiseError(err);
  }
}

const register = async function(user){
  try {
    var response = await apiHelpers.httpPost('/user/register',user);
    return {
      info: response.data?.message
    }
  } catch(err){
    return handlePromiseError(err);
  }
}


const usersApi = {
  login: login,
  logout: logout,
  register: register
};

export default usersApi;
