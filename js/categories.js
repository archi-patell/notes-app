// categories for notes
const categories = [
    "Personal",
    "Work",
    "Learning",
    "Ideas"
];


// get categories and create options for select input
export function setCategories(idName) {
    if (categories.length > 0) {
        let categorySelect = document.getElementById(idName);
        categories.map(function (value) {
            categorySelect.innerHTML += `<option value="${value.toLowerCase()}">${value}</option>`;
        });
    }
}


export function getCategories(){
    return categories;
}