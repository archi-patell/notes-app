import { setCategories, getCategories } from "./categories.js";
import { displayNotes, addNote, editNote, deleteNote, pinnedNote } from "./notesManager.js";
import { fetchNoteFromId, searchNote } from "./utils.js";
import { createNoteHtml, darkTheme } from "./ui.js";

let addNoteForm = document.forms["add-note"];
let notesGrid = document.querySelector(".notes-grid");

// set categories in select input if not empty
setCategories("category");

// display existing notes
displayNotes();

// add note on form submition
addNoteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let save = addNote(addNoteForm);
    if (save) {
        Swal.fire("Note Added", "Note added successfully", "success");
        if (notesGrid) {
            notesGrid.innerHTML = "";
            displayNotes();
        }
    }
});

// edit/delete/pin note
if (notesGrid) {
    notesGrid.addEventListener("click", function (event) {
        let editButton = event.target.closest(".edit-btn");
        let deleteButton = event.target.closest(".delete-btn");
        let pinButton = event.target.closest(".pin-btn");

        // pinned nots
        if (pinButton) {
            let noteId = pinButton.dataset.id;
            Swal.fire({
                title: "Pin Status",
                text: "Do you want to update the pin status of this note?",
                icon:"question",
                confirmButtonText: "Update",
            }).then((result) => {
                if (result.isConfirmed) {
                    pinnedNote(noteId);
                    Swal.fire(
                        "Updated!",
                        "Note status updated successfully.",
                        "success"
                    ).then((result) => {
                        if (notesGrid) {
                            notesGrid.innerHTML = "";
                            displayNotes();
                        }
                    });
                }
            })
        }

        // edit note
        if (editButton) {
            let noteId = editButton.dataset.id;
            let note = fetchNoteFromId(noteId);
            let categories = getCategories();
            let html = `
            <div class="add-note-form">
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-input form-input-title" 
                            placeholder="Note title..." 
                            maxlength="100"
                            aria-label="Note title"
                            name="title" value="${note.title}"
                        >
                    </div>
                    <div class="form-group">
                        <textarea 
                            class="form-input form-textarea" 
                            placeholder="Start typing your note..." 
                            rows="4"
                            maxlength="5000"
                            aria-label="Note content"
                            name="content"
                        >${note.content}</textarea>
                    </div>
                    <div class="form-group">
                        <select name="category" class="form-input" id="category">
                            <option value="">Select a category</option>
                            ${categories.map((category) => `<option value="${category.toLowerCase()}" ${note.category === category.toLowerCase() ? "selected" : ""}>${category}</option>`).join("")}
                        </select>
                    </div>
            </div>

            `;

            Swal.fire({
                title: "Edit Note",
                html: html,
                confirmButtonText: 'Save',
                reverseButtons: true,
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                focusConfirm: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    let title = Swal.getPopup().querySelector("[name='title']").value;
                    let content = Swal.getPopup().querySelector("[name='content']").value;
                    let category = Swal.getPopup().querySelector("[name='category']").value;
                    let save = editNote(noteId,
                        {
                            title: title.trim(),
                            content: content.trim(),
                            category: category.trim(),
                        }
                    );
                    if (save) {
                        Swal.fire("Success", "Note edited successfully", "success");
                        if (notesGrid) {
                            notesGrid.innerHTML = "";
                            displayNotes();
                        }
                    } else {
                        Swal.fire("Error", "Failed to edit note", "error");
                    }
                }
            });
        }

        // delete note
        if (deleteButton) {
            let noteId = deleteButton.dataset.id;
            Swal.fire({
                title: "Delete Note",
                text: "Are you sure you want to delete this note?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteNote(noteId);
                    Swal.fire("Deleted", "Note deleted successfully", "success");
                    if (notesGrid) {
                        notesGrid.innerHTML = "";
                        displayNotes();
                    }
                }
            });
        }
    });
}

// search notes
document.getElementById("search-btn").addEventListener("click", function () {
    let value = document.querySelector(".search-input").value;
    if (value.trim() == "") {
        document.querySelector(".search-input").focus();
        return false;
    }
    let searchResults = searchNote(value);
    if (notesGrid) {
        console.log(searchResults);
        if (searchResults.length > 0) {
            document.querySelector(".add-note-section").style.display = "none";
            notesGrid.innerHTML = "";
            searchResults.forEach(note => {
                let article = document.createElement("article");
                article.innerHTML = createNoteHtml(note);
                notesGrid.appendChild(article);
            });
        } else {
            Swal.fire({
                title: "No Notes Found",
                text: "We couldn't find the note you were looking for.",
                icon: "info"
            });
        }
    }
});

// reset  notes
document.getElementById("reset-btn").addEventListener("click", function () {
    window.location.reload();
});

// change theme
darkTheme();

// load pin notes
