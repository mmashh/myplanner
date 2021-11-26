import apiHelpers from "./apiHelpers";


async function getAllItems() {
  var response = await apiHelpers.httpGet("/item/all");
  return response.data?.items_created_by_this_user;
}

async function getItem(item_id) {
  var response = await apiHelpers.httpGet(`/item/${item_id}`)
  return response.data;
}

async function newItem(item) {
  var newItem = {
    title: item.title,
    body: item.body,
    item_type: item.item_type,
    is_complete: (item.item_type === "TASK") ? "FALSE": null
  };
  var response = await apiHelpers.httpPost("/item/add",newItem);
  return response;
}

async function editItem(item_id,item) {
  var itemToEdit = {
    title: item.title,
    body: item.body,
    item_type: item.item_type,
    is_complete: (item.item_type === "TASK") ? item.is_complete: null
  };
  var response = await apiHelpers.put(`/item/${item_id}`,itemToEdit);
  return response;
}

async function markComplete(item,is_complete) {
  var itemToEdit = {
    title: item.title,
    body: item.body,
    item_type: item.item_type,
    is_complete: (item.item_type === "TASK") ? is_complete : null
  };
  return editItem(itemToEdit.item_id,itemToEdit);
}

async function deleteItem(item_id) {
  var response = await apiHelpers.httpDelete(`/item/${item_id}`);
  return response;
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