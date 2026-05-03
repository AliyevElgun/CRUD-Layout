const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const tbody = document.getElementById("tbody");
const searchInput = document.getElementById("search");
const modeBtn = document.getElementById("modeBtn");

let id = 0;
let users = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    users.push({
        id: ++id,
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    });

    form.reset();
    renderTable();
});

function renderTable(list = users) {
    tbody.innerHTML = "";

    list.forEach((usr) => {
        tbody.innerHTML += `
            <tr class="border-b">
                <td class="py-2">${usr.id}</td>
                <td class="py-2">${usr.name}</td>
                <td class="py-2">${usr.email}</td>
                <td class="py-2">
                    <button onclick="editUser(${usr.id})" class="text-blue-500 mr-2">
                        Edit
                    </button>

                    <button onclick="deleteUser(${usr.id})" class="text-red-500">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteUser(id) {
    users = users.filter(usr => usr.id !== id);
    renderTable();
}

function editUser(userId) {
    const user = users.find(usr => usr.id === userId);

    nameInput.value = user.name;
    emailInput.value = user.email;
    passwordInput.value = user.password;

    form.onsubmit = function (e) {
        e.preventDefault();

        users.forEach((u) => {
            if (u.id === userId) {
                u.name = nameInput.value;
                u.email = emailInput.value;
                u.password = passwordInput.value;
            }
        });

        form.reset();
        renderTable();
    };
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filteredUsers = users.filter((usr) =>
        usr.name.toLowerCase().includes(value) ||
        usr.email.toLowerCase().includes(value)
    );

    renderTable(filteredUsers);
});

modeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
        modeBtn.innerText = "Light Mode";
    } else {
        modeBtn.innerText = "Dark Mode";
    }
});