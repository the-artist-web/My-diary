const btnShowForm = document.querySelector("[data-btn-show-form]"),
inputDay = document.querySelector("[data-input-day]"),
textareaTheme = document.querySelector("[data-textarea-Theme]"),
btnAdd = document.querySelector("[data-btn-add]"),
overflow = document.querySelector("[data-overflow]"),
myDiaryForm = document.querySelector("[data-my-diary-form]"),
titleName = document.querySelector("[data-title-name]"),
load = document.querySelector("[data-load]"),
theme = document.querySelector("[data-Theme]");

btnShowForm.addEventListener("click", () => {
    myDiaryForm.classList.add("active");
    overflow.classList.add("active");
});

let array;
if (localStorage.product != null) {
    array = JSON.parse(localStorage.product);
} else {
    array = [];
};

if (localStorage.length !== 0) {
    load.classList.add(localStorage.load);
};

btnAdd.addEventListener("click", () => {
    myDiaryForm.classList.remove("active");
    overflow.classList.remove("active");

    if (inputDay.value !== "" && textareaTheme.value !== "") {
        const nuwPro = {
            inputDay: inputDay.value.toLowerCase(),
            textareaTheme: textareaTheme.value.toLowerCase(),
        };
        array.push(nuwPro);
        localStorage.setItem("product", JSON.stringify(array));
        load.classList.add("active");
        localStorage.setItem("load", "active");
    
        deletValue();
        showData();
    } else {
        load.classList.remove("active");
        localStorage.setItem("load", null);
    };
});

function deletValue() {
    inputDay.value = "";
    textareaTheme.value = "";
};

function showData() {
    let myDiaryPushList = "";
    for (let i = 0; i < array.length; i++) {
        myDiaryPushList += `
        <li class="my-diary-push-box">
            <button onclick="deletIndex(${i})" class="delet">
                <i class="fa-solid fa-trash"></i>
            </button>
            <div class="my-diary-push-title">
                <h2 class="my-diary-push-title-name">${array[i].inputDay}</h2>
            </div>

            <p class="my-diary-push-Theme">${array[i].textareaTheme}</p>
        </li>
        `;

        document.querySelector("[data-my-diary-push-list]").innerHTML = myDiaryPushList;
    };
};
showData();

function deletIndex(i) {
    array.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(array));

    showData();
};