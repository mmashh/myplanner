// IMPORTANT: DO NOT USE DIRECTLY IN APPLICATION. CREATE MODEL API TO HANDLE LOGIC (e.g. itemsApi.js)
import axios from 'axios';
import Cookies from 'universal-cookie';

const base_url = "http://localhost:5000"

const cookies = new Cookies();

const getUrl = route => base_url + route;

const httpGet = async function(url){
  var response = await axios.get(getUrl(url),{
    headers: cookies.getAll()
  });
  return response;
}

const httpPost = async function(url,data){
  var response = await axios.post(getUrl(url),data,{
    headers: cookies.getAll()
  });
  return response;
}

const httpPut = async function(url,data){
  var response = await axios.put(getUrl(url),data,{
    headers: cookies.getAll()
  });
  return response;
}

const httpDelete = async function(url){
  var response = await axios.delete(getUrl(url),{
    headers: cookies.getAll()
  });
  return response;
}

const apiHelpers = {
  httpGet: httpGet,
  httpPost: httpPost,
  httpPut: httpPut,
  httpDelete: httpDelete,
}

export default apiHelpers;