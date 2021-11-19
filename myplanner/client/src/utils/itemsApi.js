import apiHelpers from "./apiHelpers";

var sampleData = [];

async function getAllItems() {
  var data = await apiHelpers.httpGet("/item/all");
  return data.items;
}

function getItem(item_id) {
  var item = null;
  sampleData.items.forEach(function(currentItem){
    if (currentItem.item_id == item_id) {
      item = currentItem;
      return;
    }
  });
  return item;
}

async function newItem(item) {
  var newItem = {
    title: item.title,
    body: item.body,
    item_type: item.item_type,
    is_complete: (item.item_type === "TASK") ? "FALSE": null,
  };
  return await apiHelpers.httpPost("/item/add",newItem);
}

  function markComplete(item_id,is_complete) {

    sampleData.items.forEach(function(currentItem){
      if (currentItem.item_id === item_id) {
        if (currentItem.item_type === "TASK"){
          currentItem.is_complete = (is_complete) ? "TRUE" : "FALSE";
        } else {
          currentItem.is_complete = null;
        }
        return;
      }
    });
  }

  function deleteItem(item_id) {
    sampleData.items = sampleData.items.filter(function(item){
      return item.item_id !== item_id;
    });
    return { message: "item successfully deleted" }
  }

  var itemsApi = {
    "getAllItems": getAllItems,
    "getItem": getItem,
    "newItem": newItem,
    "deleteItem": deleteItem,
    "markComplete": markComplete
  };

  export default itemsApi;