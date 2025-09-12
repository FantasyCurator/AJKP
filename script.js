const scriptURL = "https://script.google.com/macros/s/AKfycbycEFHXiJzMtpf2zCkFghAECh5cTdDiBJUZXinLkljGBTUMYWrJNm0d4ALFWF_uyp2U4Q/exec"; // Replace with your Web App URL
let familyMembers = [];

// Show Family Form after Employee data
document.getElementById("addFamilyBtn").addEventListener("click", () => {
  if (document.getElementById("employeeForm").checkValidity()) {
    document.getElementById("familyForm").style.display = "block";
  } else {
    alert("Please complete Employee Information first.");
  }
});

// Add Family Member to table
document.getElementById("addNewRecordBtn").addEventListener("click", () => {
  const relationship = document.getElementById("relationship").value;
  const name = document.getElementById("familyName").value;
  const cnic = document.getElementById("cnic").value;
  const dob = document.getElementById("dob").value;
  const maritalStatus = document.getElementById("maritalStatus").value;
  const jobStatus = document.getElementById("jobStatus").value;

  if (!relationship || !name || !cnic || !dob || !maritalStatus || !jobStatus) {
    alert("Please fill all Family Member fields.");
    return;
  }

  familyMembers.push({ relationship, name, cnic, dob, maritalStatus, jobStatus });
  updateFamilyTable();

  document.getElementById("familyForm").reset();
  document.getElementById("familyForm").style.display = "none";
});

// Update Family Table
function updateFamilyTable() {
  const tbody = document.getElementById("familyMembers");
  tbody.innerHTML = "";

  familyMembers.forEach((member, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${member.relationship}</td>
      <td>${member.name}</td>
      <td>${member.cnic}</td>
      <td>${member.dob}</td>
      <td>${member.maritalStatus}</td>
      <td>${member.jobStatus}</td>
    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });

  document.getElementById("familyCount").textContent = familyMembers.length;
  document.getElementById("familyTableContainer").style.display = "block";
  document.getElementById("submitContainer").style.display = "block";
}

// Submit All Data
document.getElementById("submitToSheetsBtn").addEventListener("click", () => {
  const employee = {
    postingPlace: document.getElementById("postingPlace").value,
    fullName: document.getElementById("fullName").value,
    designation: document.getElementById("designation").value,
    employeeCnic: document.getElementById("employeeCnic").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    bloodGroup: document.getElementById("bloodGroup").value
  };

  document.getElementById("statusText").textContent = "Saving data...";

  fetch(scriptURL, {
    method: "POST",
    body: new URLSearchParams({
      employee: JSON.stringify(employee),
      familyMembers: JSON.stringify(familyMembers)
    })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("statusText").textContent = "Data saved successfully!";
      document.getElementById("employeeForm").reset();
      familyMembers = [];
      updateFamilyTable();
      document.getElementById("submitContainer").style.display = "none";
    })
    .catch(err => {
      document.getElementById("statusText").textContent = "Error: " + err.message;
    });
});

