import { formatDate } from "./utils.js";

export function createNoteHtml(note) {
    let title = note.title.trim() !== "" ? note.title : "Untitled";
    let content = note.content.trim() !== "" ? note.content : "No content";
    let category = note.category.trim() !== "" ? note.category : "Uncategorized";
    let createdAt = note.createdAt !== "" ? note.createdAt : "";
    let id = note.id !== "" ? note.id : "";

    return `    <div class="note-header">
                    <h3 class="note-title">${title}</h3>
                   <button class="icon-btn pin-btn" aria-label="Pin note" title="Pin" data-id="${id}" >
                        <i class="bi bi-pin-angle-fill"></i>
                    </button>
                 </div>
                                
                <p class="note-content-preview">${content}</p>
                <div class="note-tags">
                    <span class="tag">${category}</span>
                </div>
                <div class="note-footer">
                    <time class="note-date" datetime="2026-05-25">${formatDate(createdAt)}</time>
                    <div class="note-actions">
                        <button class="icon-btn btn-outline-warning edit-btn" aria-label="Edit note" data-id="${id}" title="Edit" >
                            <i class="bi bi-pen-fill"></i>
                        </button>
                        <button class="icon-btn btn-outline-danger delete-btn" aria-label="Delete note" data-id="${id}" title="Delete">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </div>`;
}

export function darkTheme() {
    let themeToggleBtn = document.querySelector(".theme-toggle");
    let icon = document.querySelector(".theme-icon");

    // Check if dark mode was previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        document.body.style.backgroundColor = "#4b4d50";
        icon.innerHTML = '<i class="bi bi-cloud-moon-fill"></i>';
    }

    // Toggle dark mode on button click
    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            document.body.style.backgroundColor = "#4b4d50";
            icon.innerHTML = '<i class="bi bi-cloud-moon-fill"></i>';
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.style.backgroundColor = "#ffffff";
            icon.innerHTML = '<i class="bi bi-cloud-sun-fill"></i>';
            localStorage.setItem("darkMode", "disabled");
        }
    });
}