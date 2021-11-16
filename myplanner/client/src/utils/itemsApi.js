import $ from "jquery";

var sampleData = {
  items:  [
    {
      item_id: 1,
      title: "Demo",
      body: "lorem ipsum text",
      is_complete: "TRUE",
      item_type: 'TASK',
      date_created: "9/11/2021 14:25"
    },
    {
      item_id: 2,
      title: "Demo",
      body: "lorem ipsum text",
      is_complete: "TRUE",
      item_type: 'TASK',
      date_created: "9/11/2021 14:25"
    },
    {
      item_id: 3,
      title: "Demo",
      body: "lorem ipsum text",
      is_complete: "TRUE",
      item_type: 'TASK',
      date_created: "9/11/2021 14:25"
    },
    {
      item_id: 4,
      title: "Demo",
      body: "lorem ipsum text",
      is_complete: "FALSE",
      item_type: 'TASK',
      date_created: "9/11/2021 14:25"
    },
    {
      item_id: 5,
      title: "Demo",
      body: "lorem ipsum text",
      is_complete: "TRUE",
      item_type: 'NOTE',
      date_created: "9/11/2021 14:25"
    },
  ]
}

function getAllItems() {
  return sampleData.items;
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

function newItem(item) {
  sampleData.items.push({
    item_id: sampleData.items.length + 1,
    title: item.title,
    body: item.body,
    item_type: item.item_type,
    is_complete: false,
    date_created: "9/11/2021 14:25",
    });
    return { message: "item successfully created" }
  }

  function markComplete(item_id,is_complete) {

    sampleData.items.forEach(function(currentItem){
      if (currentItem.item_id == item_id) {
        if (currentItem.item_type === "TASK"){
          currentItem.is_complete= (is_complete) ? "TRUE" : "FALSE";
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