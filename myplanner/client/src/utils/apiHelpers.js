// IMPORTANT: DO NOT USE DIRECTLY IN APPLICATION. CREATE MODEL API TO HANDLE LOGIC (e.g. itemsApi.js)
import axios from 'axios';

const base_url = "http://localhost:5000"

const getUrl = route => base_url + route;

// Invokes an HTTP GET request to url; returns a promise containing the json data returned by the server.
const httpGet = async function(url){
  var response = await axios.get(getUrl(url));
  return response.data;
}

// Invokes an HTTP GET request to url; returns a promise containing the json data returned by the server.
const httpPost = async function(url,data){
  var response = await axios.post(getUrl(url),data)
}

const httpPut = async function(url,id,data){}

const httpDelete = async function(url){}

const apiHelpers = {
  httpGet: httpGet,
  httpPost: httpPost,
  httpPut: httpPut,
  httpDelete: httpDelete,
}

export default apiHelpers;