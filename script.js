let employees = [];
let id = 1;
let editIndex = -1;

/* ---------- POPUP MESSAGE ---------- */
function showPopup(message){
    alert(message); // simple + works for demo tomorrow
}

/* ---------- ADD / UPDATE EMPLOYEE ---------- */
function addEmployee(){

    let emp = {
        id: editIndex === -1 ? "EMP-" + id++ : employees[editIndex].id,
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        department: document.getElementById("department").value,
        role: document.getElementById("role").value,
        salary: Number(document.getElementById("salary").value),
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        status: "Active"
    };

    if(editIndex === -1){
        employees.push(emp);

        // ✅ POPUP MESSAGE
        showPopup(emp.name + " has been added successfully!");
    } else {
        employees[editIndex] = emp;
        editIndex = -1;

        showPopup(emp.name + " has been updated!");
    }

    clearForm();
    renderTable();
    updateCards();
}
function deleteEmployee(index){

    let employeeName = employees[index].name;

    let confirmation = confirm(
        "Are you sure you want to delete " +
        employeeName +
        " ?"
    );

    if(confirmation){

        employees.splice(index,1);

        renderTable();
        updateCards();

        alert(
            employeeName +
            " has been deleted successfully!"
        );
    }
}

/* ---------- CLEAR FORM ---------- */
function clearForm(){
    document.getElementById("name").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("department").value = "";
    document.getElementById("role").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
}

/* ---------- TABLE (DEFAULT VIEW) ---------- */
function renderTable(){

    let table = document.getElementById("empTable");
    table.innerHTML = "";

    employees.forEach((e, index)=>{

        table.innerHTML += `
        <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.role}</td>
            <td>${e.department}</td>
            <td>${e.status}</td>
            <td>
                <button onclick="viewEmployee(${index})">View</button>

                <button onclick="editEmployee(${index})">
                    Edit
                </button>

                <button
                    onclick="deleteEmployee(${index})"
                    style="background:#dc2626;">
                    Delete
                </button>
            </td>
        </tr>`;
    });
}

/* ---------- CARDS ---------- */
function updateCards(){

    document.getElementById("totalEmp").innerText = employees.length;

    document.getElementById("activeEmp").innerText =
        employees.filter(e => e.status === "Active").length;

    document.getElementById("totalDept").innerText =
        [...new Set(employees.map(e => e.department))].length;

    document.getElementById("totalSalary").innerText =
        employees.reduce((sum, e) => sum + e.salary, 0);
}

/* ---------- VIEW EMPLOYEE ---------- */
function viewEmployee(i){

    let e = employees[i];

    document.getElementById("details").innerHTML = `
        <p><b>ID:</b> ${e.id}</p>
        <p><b>Name:</b> ${e.name}</p>
        <p><b>Role:</b> ${e.role}</p>
        <p><b>Department:</b> ${e.department}</p>
        <p><b>Salary:</b> €${e.salary}</p>
    `;

    document.getElementById("modal").style.display = "block";
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
}

/* ---------- EDIT EMPLOYEE ---------- */
function editEmployee(index){

    let e = employees[index];

    document.getElementById("name").value = e.name;
    document.getElementById("dob").value = e.dob;
    document.getElementById("department").value = e.department;
    document.getElementById("role").value = e.role;
    document.getElementById("salary").value = e.salary;
    document.getElementById("phone").value = e.phone;
    document.getElementById("email").value = e.email;
    document.getElementById("address").value = e.address;

    editIndex = index;
}

/* ---------- NAVBAR: EMPLOYEES ---------- */
function showEmployees(){

    document.getElementById("title").innerText = "Employees";
    document.getElementById("subtitle").innerText = "All Employee Names";

    document.getElementById("cards").style.display = "none";
    document.getElementById("formBox").style.display = "none";

    document.getElementById("empTable").innerHTML =
        employees.map(e => `
            <tr>
                <td colspan="6">👤 ${e.name}</td>
            </tr>
        `).join("");
}

/* ---------- NAVBAR: ACTIVE EMPLOYEES ---------- */
function showActiveEmployees(){

    document.getElementById("title").innerText = "Active Employees";

    let active = employees.filter(e => e.status === "Active");

    document.getElementById("empTable").innerHTML =
        active.map(e => `
            <tr>
                <td colspan="6">🟢 ${e.name}</td>
            </tr>
        `).join("");
}

/* ---------- NAVBAR: DEPARTMENTS ---------- */
function showDepartments(){

    document.getElementById("title").innerText = "Departments";

    let departments = {};

    employees.forEach(e=>{
        if(!departments[e.department]){
            departments[e.department] = [];
        }
        departments[e.department].push(e.name);
    });

    let html = "";

    for(let dept in departments){
        html += `<tr><td colspan="6"><b>🏢 ${dept}</b></td></tr>`;

        departments[dept].forEach(name=>{
            html += `<tr><td colspan="6">👤 ${name}</td></tr>`;
        });
    }

    document.getElementById("empTable").innerHTML = html;
}

/* ---------- NAVBAR: TOTAL SALARY ---------- */
function showTotalSalary(){

    document.getElementById("title").innerText = "Salary Report";

    let total = 0;
    let html = "";

    employees.forEach(e=>{
        total += e.salary;
        html += `<tr><td colspan="6">👤 ${e.name} - €${e.salary}</td></tr>`;
    });

    html += `<tr><td colspan="6"><b>Total Salary: €${total}</b></td></tr>`;

    document.getElementById("empTable").innerHTML = html;
}

/* ---------- DASHBOARD ---------- */
function showDashboard(){
    document.getElementById("cards").style.display = "grid";
    document.getElementById("formBox").style.display = "block";
    renderTable();
}
function searchEmployee(){

    let searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let table =
        document.getElementById("empTable");

    table.innerHTML = "";

    let filteredEmployees = employees.filter(emp =>

        emp.name.toLowerCase().includes(searchValue) ||

        emp.id.toLowerCase().includes(searchValue) ||

        emp.department.toLowerCase().includes(searchValue) ||

        emp.role.toLowerCase().includes(searchValue)
    );

    filteredEmployees.forEach((e,index)=>{

        table.innerHTML += `
        <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.role}</td>
            <td>${e.department}</td>
            <td>${e.status}</td>

            <td>
                <button onclick="viewEmployee(${employees.indexOf(e)})">
                    View
                </button>

                <button onclick="editEmployee(${employees.indexOf(e)})">
                    Edit
                </button>

                <button
                    onclick="deleteEmployee(${employees.indexOf(e)})"
                    style="background:#dc2626;"
                >
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}