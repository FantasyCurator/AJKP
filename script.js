document.addEventListener("DOMContentLoaded", () => {
  const employeeForm = document.getElementById("employeeForm");
  const familyForm = document.getElementById("familyForm");
  const familyTableBody = document.querySelector("#familyTable tbody");

  let familyMembers = [];

  // Employee save
  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      type: "employee",
      name: document.getElementById("empName").value,
      cnic: document.getElementById("empCNIC").value,
      designation: document.getElementById("designation").value
    };

    saveToServer(data);
    employeeForm.reset();
  });

  // Add family
  familyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const member = {
      name: document.getElementById("famName").value,
      relation: document.getElementById("relation").value
    };

    familyMembers.push(member);
    renderFamilyTable();
    familyForm.reset();
  });

  function renderFamilyTable() {
    familyTableBody.innerHTML = "";
    familyMembers.forEach((m, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${m.name}</td>
        <td>${m.relation}</td>
        <td><button onclick="deleteMember(${i})">Delete</button></td>
      `;
      familyTableBody.appendChild(row);
    });
  }

  window.deleteMember = function(index) {
    familyMembers.splice(index, 1);
    renderFamilyTable();
  };

  function saveToServer(data) {
    fetch("https://script.google.com/macros/s/AKfycbwNhurOuWXZGNvirFqp2VTbMFuEt956dSGvZXyvlN-fDKcL2R-mVd3_Om8o_HmBFzSTXw/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => console.log(msg))
    .catch(err => console.error("Error:", err));
  }
});
