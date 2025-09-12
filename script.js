let familyData = [];

document.getElementById("addFamilyBtn").addEventListener("click", () => {
  document.getElementById("familyForm").style.display = "block";
});

document.getElementById("addNewRecordBtn").addEventListener("click", () => {
  const relationship = document.getElementById("relationship").value;
  const familyName = document.getElementById("familyName").value;
  const cnic = document.getElementById("cnic").value;
  const dob = document.getElementById("dob").value;
  const maritalStatus = document.getElementById("maritalStatus").value;
  const jobStatus = document.getElementById("jobStatus").value;

  if (!relationship || !familyName || !cnic || !dob || !maritalStatus || !jobStatus) {
    alert("Please fill all fields in family form");
    return;
  }

  familyData.push({ relationship, familyName, cnic, dob, maritalStatus, jobStatus });
  renderFamilyTable();
  document.getElementById("familyForm").reset();
  document.getElementById("familyTableContainer").style.display = "block";
  document.getElementById("submitContainer").style.display = "block";
});

function renderFamilyTable() {
  const tbody = document.getElementById("familyMembers");
  tbody.innerHTML = "";
  familyData.forEach((member, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${member.relationship}</td>
      <td>${member.familyName}</td>
      <td>${member.cnic}</td>
      <td>${member.dob}</td>
      <td>${member.maritalStatus}</td>
      <td>${member.jobStatus}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteMember(${index})">Delete</button></td>
    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
  document.getElementById("familyCount").textContent = familyData.length;
}

function deleteMember(index) {
  familyData.splice(index, 1);
  renderFamilyTable();
}

document.getElementById("submitToSheetsBtn").addEventListener("click", () => {
  const postingPlace = document.getElementById("postingPlace").value;
  const fullName = document.getElementById("fullName").value;
  const designation = document.getElementById("designation").value;
  const employeeCnic = document.getElementById("employeeCnic").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const bloodGroup = document.getElementById("bloodGroup").value;

  if (!postingPlace || !fullName || !designation || !employeeCnic || !email || !mobile) {
    alert("Please fill all required employee fields");
    return;
  }

  const data = {
    postingPlace, fullName, designation, employeeCnic,
    email, mobile, bloodGroup, familyData
  };

  document.getElementById("statusText").innerText = "Saving...";

  fetch("YOUR_WEB_APP_URL", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    if (response.status === "success") {
      document.getElementById("statusText").innerText = "Data saved successfully!";
      document.getElementById("employeeForm").reset();
      document.getElementById("familyForm").reset();
      document.getElementById("familyTableContainer").style.display = "none";
      document.getElementById("submitContainer").style.display = "none";
      familyData = [];
    } else {
      document.getElementById("statusText").innerText = "Error: " + response.message;
    }
  })
  .catch(() => {
    document.getElementById("statusText").innerText = "Error saving data!";
  });
});
