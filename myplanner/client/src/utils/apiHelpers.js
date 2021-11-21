// IMPORTANT: DO NOT USE DIRECTLY IN APPLICATION. CREATE MODEL API TO HANDLE LOGIC (e.g. itemsApi.js)
import axios from 'axios';

const base_url = "http://localhost:5000"

const getUrl = route => base_url + route;

const httpGet = async function(url){
  var response = await axios.get(getUrl(url));
  return response.data;
}

const httpPost = async function(url,data){
  var response = await axios.post(getUrl(url),data)
  return response.data;
}

const httpPut = async function(url,id,data){/* TODO */}

const httpDelete = async function(url){
  var response = await axios.delete(getUrl(url));
  return response.data;
}

const apiHelpers = {
  httpGet: httpGet,
  httpPost: httpPost,
  httpPut: httpPut,
  httpDelete: httpDelete,
}

export default apiHelpers;