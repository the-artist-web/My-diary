const btnShowForm = document.querySelector("[data-btn-show-form]"),
inputDay = document.querySelector("[data-input-day]"),
textareaTheme = document.querySelector("[data-textarea-Theme]"),
btnAdd = document.querySelector("[data-btn-add]"),
overflow = document.querySelector("[data-overflow]"),
myDiaryForm = document.querySelector("[data-my-diary-form]"),
titleName = document.querySelector("[data-title-name]"),
load = document.querySelector("[data-load]"),
theme = document.querySelector("[data-Theme]");

let mood = "اضافه";
let tmp;

btnShowForm.addEventListener("click", () => {
    myDiaryForm.classList.add("active");
    overflow.classList.add("active");
});

overflow.addEventListener("click", () => {
    overflow.classList.remove("active");
    myDiaryForm.classList.remove("active");
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

        if (mood === "اضافه") {
            array.push(nuwPro);
        } else {
            array[tmp] = nuwPro;
            mood = "اضافه";
            btnAdd.innerHTML = `اضافه`;
        };
        localStorage.setItem("product", JSON.stringify(array));
    
        deletValue();
        showData();
    } else {};
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
            <button onclick="updateData(${i})" class="update">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <div class="my-diary-push-title">
                <h2 class="my-diary-push-title-name">${array[i].inputDay}</h2>
            </div>

            <p class="my-diary-push-Theme">${array[i].textareaTheme}</p>
        </li>
        `;
    }

    document.querySelector("[data-my-diary-push-list]").innerHTML = myDiaryPushList;
    let deletAll = document.querySelector("[data-delet-all]");

    // التحقق من قائمة اليوميات
    if (array.length === 0) {
        load.classList.remove("active");
        localStorage.setItem("load", null);
        // delet all
        deletAll.classList.remove("active");
    } else {
        load.classList.add("active");
        localStorage.setItem("load", "active");
        // delet all
        deletAll.classList.add("active");
    };
};
showData();

function deletIndex(i) {
    array.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(array));

    showData();
};

// delet all
function deletAll() {
    array.splice(0);
    localStorage.clear();
    
    showData();
};

// update
function updateData(i) {
    inputDay.value = array[i].inputDay;
    textareaTheme.value = array[i].textareaTheme;

    myDiaryForm.classList.add("active");
    overflow.classList.add("active");

    btnAdd.innerHTML = `تعديل`;
    mood = "تعديل";

    tmp = i;
};