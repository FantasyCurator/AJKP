const familyMembers = [];

document.getElementById("addFamilyBtn").addEventListener("click", () => {
  document.getElementById("familyFormSection").classList.remove("hidden");
});

document.getElementById("saveFamilyBtn").addEventListener("click", () => {
  const form = document.getElementById("familyForm");
  const member = {
    relationship: form.relationship.value,
    name: form.name.value,
    cnic: form.cnic.value,
    dob: form.dob.value,
    maritalStatus: form.maritalStatus.value,
    jobStatus: form.jobStatus.value
  };

  // Validation
  if (!member.relationship || !member.name || !member.cnic || !member.dob || !member.maritalStatus || !member.jobStatus) {
    alert("Please fill all family fields.");
    return;
  }

  familyMembers.push(member);
  form.reset();
  renderFamilyTable();
  document.getElementById("submitSection").classList.remove("hidden");
});

function renderFamilyTable() {
  const tbody = document.querySelector("#familyTable tbody");
  tbody.innerHTML = "";
  familyMembers.forEach((m, i) => {
    const row = `<tr>
      <td>${i + 1}</td>
      <td>${m.relationship}</td>
      <td>${m.name}</td>
      <td>${m.cnic}</td>
      <td>${m.dob}</td>
      <td>${m.maritalStatus}</td>
      <td>${m.jobStatus}</td>
      <td><button onclick="deleteFamily(${i})">Delete</button></td>
    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

function deleteFamily(index) {
  familyMembers.splice(index, 1);
  renderFamilyTable();
}

document.getElementById("submitBtn").addEventListener("click", () => {
  const empForm = document.getElementById("employeeForm");
  const employee = {
    postingPlace: empForm.postingPlace.value,
    fullName: empForm.fullName.value,
    designation: empForm.designation.value,
    employeeCnic: empForm.employeeCnic.value,
    email: empForm.email.value,
    mobile: empForm.mobile.value,
    bloodGroup: empForm.bloodGroup.value
  };

  if (!employee.postingPlace || !employee.fullName || !employee.designation || !employee.employeeCnic) {
    alert("Please fill all required employee fields.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbw2ay-vMgynl-yhxt88gqnyrUS875wlf_EjNkLNIPXuqLCvIjjh2F9K_zYGlHQoaLaZPw/exec", {
    method: "POST",
    body: JSON.stringify({ employee, familyMembers }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("formMessage").innerText =
        data.status === "success" ? "Data saved successfully!" : "Error: " + data.message;
      if (data.status === "success") {
        empForm.reset();
        familyMembers.length = 0;
        renderFamilyTable();
        document.getElementById("familyFormSection").classList.add("hidden");
        document.getElementById("submitSection").classList.add("hidden");
      }
    })
    .catch(err => {
      document.getElementById("formMessage").innerText = "Error: " + err.message;
    });
});
