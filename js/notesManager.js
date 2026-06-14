
import { formatDate, fetchNotes } from "./utils.js";
import { createNoteHtml, darkTheme } from "./ui.js";

let saveNotes = fetchNotes();
let noteId = 0;

// display notes
export function displayNotes() {
    let notesGrid = document.querySelector(".notes-grid");
    if (Array.isArray(saveNotes) && saveNotes.length > 0) {
        saveNotes.forEach(function (note) {
            let article = document.createElement("article");
            if (note.pinned) {
                article.classList.add("note-card", "note-card-pinned");
                article.innerHTML = createNoteHtml(note);
                const pinIcon = article.querySelector(".pin-btn i");
                pinIcon.classList.remove("bi-pin-angle");
                pinIcon.classList.add("bi-pin-fill");
                notesGrid.appendChild(article);
            }
        });
        saveNotes.forEach(function (note) {
            let article = document.createElement("article");
            if (note.pinned == false) {
                article.classList.add("note-card");
                article.innerHTML = createNoteHtml(note);
                notesGrid.appendChild(article);
            }
        });
    }
}

// add notes to localstorage
export function addNote(addNoteForm) {

    let title = addNoteForm.elements["title"].value;
    let content = addNoteForm.elements["content"].value;
    let category = addNoteForm.elements["category"].value;

    if (title.trim() !== "" && content.trim() !== "" && category.trim() !== "") {
        noteId = (Object.values(saveNotes).at(-1)?.id) != null ? Object.values(saveNotes).at(-1)?.id + 1 : noteId;
        let newNote = {
            id: noteId++,
            title: title,
            content: content,
            pinned: false,
            category: category,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        saveNotes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(saveNotes));
        addNoteForm.reset();
        return true;
    } else {
        if (title.trim() === "") {
            addNoteForm.elements["title"].focus();
        }
        if (content.trim() === "") {
            addNoteForm.elements["content"].focus();
        }
        if (category.trim() === "") {
            addNoteForm.elements["category"].focus();
        }
    }
}

// edit notes in localstorage
export function editNote(noteId, editData) {
    if (!noteId || typeof editData !== 'object') {
        return false;
    }
    if (editData.title == "" || editData.content == "" || editData.category == "") {
        return false;
    }
    let noteIdIndex = saveNotes.findIndex(n => n.id == Number(noteId));
    if (noteIdIndex === -1) return false;
    let note = saveNotes[noteIdIndex];

    let updatedNote = {
        ...note,
        title: (editData.title !== undefined && editData.title !== '') ? editData.title : note.title,
        content: (editData.content !== undefined && editData.content !== '') ? editData.content : note.content,
        category: (editData.category !== undefined && editData.category !== '') ? editData.category : note.category,
        pinned: (editData.pinned !== undefined) ? editData.pinned : note.pinned,
        updatedAt: Date.now()
    };

    saveNotes[noteIdIndex] = updatedNote;
    let save = localStorage.setItem("notes", JSON.stringify(saveNotes));
    return true;
}

// delete note from localstorage
export function deleteNote(noteId) {
    if (!noteId) {
        return false;
    }
    saveNotes = saveNotes.filter(function (note) {
        return note.id != noteId;
    });
    localStorage.setItem("notes", JSON.stringify(saveNotes));
    return true;
}

// pinned note
export function pinnedNote(noteId) {
    const noteIndex = saveNotes.findIndex(
        note => note.id === Number(noteId)
    );
    if (noteIndex === -1) {
        return false;
    }
    saveNotes[noteIndex] = {
        ...saveNotes[noteIndex],
        pinned: !saveNotes[noteIndex].pinned
    };  
    localStorage.setItem("notes", JSON.stringify(saveNotes));
    return true;
}