
var sampleData = {
  all_notes:  [
    {
      note_id: 1,
      note_title: "Demo",
      note_body: "lorem ipsum text",
      date_created: "9/11/2021 14:25"
    },
    {
      note_id: 2,
      note_title: "Demo",
      note_body: "lorem ipsum text",
      date_created: "9/11/2021 14:25"
    },
    {
      note_id: 3,
      note_title: "Demo",
      note_body: "lorem ipsum text",
      date_created: "9/11/2021 14:25"
    },
    {
      note_id: 4,
      note_title: "Demo",
      note_body: "lorem ipsum text",
      date_created: "9/11/2021 14:25"
    },
    {
      note_id: 5,
      note_title: "Demo",
      note_body: "lorem ipsum text",
      date_created: "9/11/2021 14:25"
    }
  ]
}

function getAllNotes() {
  return sampleData.all_notes;
}

function getNote(note_id) {
  var note = null;
  sampleData.all_notes.forEach(function(currentNote){
    if (currentNote.note_id == note_id) {
      note = currentNote;
      return;
    }
  });
  return note;
}

function createNote(note) {
  sampleData.all_notes.push({
    note_id: sampleData.all_notes.length + 1,
    note_title: note.note_title,
    note_body: note.note_body,
    date_created: "9/11/2021 14:25"
    });
    return "Note successfully created";
  }

  function markComplete(note_id,is_complete) {
    sampleData.all_notes.forEach(function(currentNote){
      if (currentNote.note_id == note_id) {
        currentNote.is_complete=is_complete;
        return;
      }
    });
  }

  var notesApi = {
    "all": getAllNotes,
    "get": getNote,
    "new": createNote,
    "markComplete": markComplete
  };

  export default notesApi;