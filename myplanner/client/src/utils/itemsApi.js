import apiHelpers from "./apiHelpers";
import handlePromiseError from './handlePromiseError';

const convertIsComplete = function(is_complete,item_type) {
  if (item_type === "TASK") {
    return (is_complete) ? "TRUE" : "FALSE";
  } else {
    return null;
  }
}

async function getAllItems() {
  try {
    var response = await apiHelpers.httpGet("/item/all");
    return response.data?.items_created_by_this_user;
  } catch(err){
    return handlePromiseError(err);
  }
}

async function getItem(item_id) {
  try {
    var response = await apiHelpers.httpGet(`/item/${item_id}`)
    return response.data;
  } catch(err) {
    return handlePromiseError(err);
  }
}

async function newItem(item) {
  try {
    var newItem = {
      title: item.title,
      body: item.body,
      item_type: item.item_type,
      is_complete: (item.item_type === "TASK") ? "FALSE": null
    };
    return await apiHelpers.httpPost("/item/add",newItem);
  } catch(err) {
    return handlePromiseError(err);
  }
}

async function editItem(item_id,item) {
  try {
    var itemToEdit = {
      title: item.title,
      body: item.body,
      item_type: item.item_type,
      is_complete: convertIsComplete(item.is_complete,item.item_type)
    };
    var response = await apiHelpers.httpPut(`/item/${item_id}`,itemToEdit);
    return response;
  } catch (err) {
    return handlePromiseError(err);
  }
}

async function markComplete(item,is_complete) {
  try {
    var itemToEdit = {
      title: item.title,
      body: item.body,
      item_type: item.item_type,
      is_complete: convertIsComplete(is_complete,item.item_type)
    };
    var response = await apiHelpers.httpPut(`/item/${item.item_id}`,itemToEdit);
    return response;
  } catch(err){
    return handlePromiseError(err);
  }
}
async function deleteItem(item_id) {
  try {
    var response = await apiHelpers.httpDelete(`/item/${item_id}`);
    return response;
  } catch (err) {
    return handlePromiseError(err);
  }
}

  var itemsApi = {
    "getAllItems": getAllItems,
    "getItem": getItem,
    "newItem": newItem,
    "editItem": editItem,
    "deleteItem": deleteItem,
    "markComplete": markComplete
  };

  export default itemsApi;