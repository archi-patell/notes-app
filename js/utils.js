// create date formate
export function formatDate(timestamp) {
  let date = new Date(timestamp);

  let day = date.getDate();

  let ordinal = (n) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };

  let month = date.toLocaleString('en-US', { month: 'short' });
  let year = date.getFullYear();

  return `${ordinal(day)} ${month} ${year}`;
}

// fetch notes from localstorage
export function fetchNotes() {
  if (localStorage.getItem("notes")) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (notes.length > 0) {
      return notes;
    }
  }
  return [];
}

let saveNotes = fetchNotes();

// fetch note from id
export function fetchNoteFromId(id) {
  return saveNotes.find(note => note.id == id);
}

// search notes
export function searchNote(value) {
    return saveNotes.filter(note => note.title.toLowerCase().includes(value.toLowerCase()) || note.content.toLowerCase().includes(value.toLowerCase()));
}
