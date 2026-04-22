let devoteeList = null;
let selectedSewaKartaName = "";
let selectedUserForBook = "";
let bookItems = [];
document.addEventListener("DOMContentLoaded", async function () {
  setupLiveSearch(
    "crContainerName",
    "crContainerNameClrBtn",
    "crContainerNameULList",
    function (selectedText) {
      selectedSewaKartaName = selectedText;
    }
  );

  setupLiveSearch(
    "adminCustName",
    "adminCustNameClrBtn",
    "adminCustNameULList",
    function (selectedText) {
      selectedUserForBook = selectedText;
    }
  );
});

const rConst = {
  sDonationCashRecd: "sDonationCashRecd",
  sDonationUserReport: "sDonationUserReport",
  issueBook: "issueBook",
};

const roleDefinitions = {
  issueBook: {
    label: "Issue Book",
    className: "blue",
    group: 1,
  },
  sDonationCashRecd: {
    label: "S Donation Cash Recd",
    className: "blue",
    group: 1,
  },

  sDonationUserReport: {
    label: "S Donation User Report",
    className: "blue",
    group: 1,
  },
};

// ✅ Password → role keys
const passRoleMap = {
  ehy18a: [
    rConst.issueBook,
    rConst.sDonationCashRecd,
    rConst.sDonationUserReport,
  ],
  mhy23u: [
    rConst.issueBook,
    rConst.sDonationCashRecd,
    rConst.sDonationUserReport,
  ],
  hay15a: [
    rConst.issueBook,
    rConst.sDonationCashRecd,
    rConst.sDonationUserReport,
  ],
  rjp01a: [
    rConst.issueBook,
    rConst.sDonationCashRecd,
    rConst.sDonationUserReport,
  ],
};
async function requestAdminPanel() {
  if (getUserLoginInfo()) {
    let password = userLoginInfoData?.password;
    if (!devoteeList) {
      const response = await CALL_API("GET_ALL_DEVOTEES_LIST", {});
      if (response.status) {
        devoteeList = response.result;
      }
    }
    proceedAdminPanel(password);
  } else {
    // TODO: Show password popup if not logged in
    //userLoginInfoData me save bhi karni hia.
  }
}

function proceedAdminPanel(password) {
  const roleKeys = passRoleMap[password];
  if (roleKeys) {
    SHOW_SPECIFIC_DIV("adminPanelContainerPopup");

    const container = document.querySelector(
      "#adminPanelContainerPopup .popup-content"
    );
    container.innerHTML = "";
    container.style.display = "block";

    const backBtn = document.createElement("button");
    backBtn.className = "cancel-button";
    backBtn.innerText = "Back";
    backBtn.onclick = () => SHOW_SPECIFIC_DIV("mainContainer");
    container.appendChild(backBtn);

    // 🔄 Group roles by group number
    const groups = {};

    roleKeys.forEach((key) => {
      const def = roleDefinitions[key];
      if (def) {
        if (!groups[def.group]) {
          groups[def.group] = [];
        }
        groups[def.group].push({ ...def, key });
      }
    });

    // 🔽 Create grouped button sections
    Object.keys(groups)
      .sort()
      .forEach((groupId) => {
        const groupDiv = document.createElement("div");
        groupDiv.className = `popup-content group-${groupId}`;
        groups[groupId].forEach((def) => {
          const btn = document.createElement("button");
          btn.className = def.className;
          btn.innerText = def.label;
          btn.onclick = () => handleRoleClick(def.key);
          groupDiv.appendChild(btn);
        });
        container.appendChild(groupDiv);
      });
  } else {
    alert("dont have accesss");
  }
}

function handleRoleClick(key) {
  switch (key) {
    case rConst.issueBook:
      issueBookClick();
      break;

    case rConst.sDonationCashRecd:
      sDonationCashRecdClick();
      break;

    case rConst.sDonationUserReport:
      alert("📝 Opening Input Form...");
      break;

    default:
      alert("⚠️ Unknown Role Clicked!");
  }
}

async function issueBookClick() {
  SHOW_SPECIFIC_DIV("adminIssueBook");
  initializedLiveSearchControl(
    "adminCustName",
    "adminCustNameClrBtn",
    "adminCustNameULList",
    devoteeList
  );
}

async function sDonationCashRecdClick() {
  initializedLiveSearchControl(
    "crContainerName",
    "crContainerNameClrBtn",
    "crContainerNameULList",
    devoteeList
  );

  SHOW_SPECIFIC_DIV("sDonationCashRecdContianer");
}

async function crAmountInputClick() {
  const name = document.getElementById("crContainerName").value.trim();
  const amount = document.getElementById("crAmount").value.trim();

  if (!name) {
    SHOW_ERROR_POPUP("⚠️ Please enter Sewakarta Name.");
    return;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    SHOW_ERROR_POPUP("⚠️ Please enter a valid amount.");
    return;
  }

  const request = {
    devName: name,
    amount: amount,
    filledBy: userLoginInfoData?.devName ?? "",
  };
  const response = await CALL_API("SAVE_SMALL_DONATION_CASH", request);
  SHOW_SUCCESS_POPUP(`Submitted for : ${name}`);
  document.getElementById("crContainerName").value = "";
  document.getElementById("crAmount").value = "";
  document.getElementById("crContainerNameClrBtn").style.display = "none";
}

function adminBookAdd() {
  const name = document.getElementById("adminCustName").value.trim();
  const bBook = document.getElementById("adminBBookAmount").value.trim();
  const sBook = document.getElementById("adminSBookAmount").value.trim();
  const total = parseInt(bBook || 0) * 250 + parseInt(sBook || 0) * 50;

  if (!name || isNaN(total) || total === 0) {
    SHOW_ERROR_POPUP("Please enter valid Name and Book quantities.");
    return;
  }

  // Check if name already exists (Optional)
  const existingIndex = bookItems.findIndex((item) => item.name === name);
  if (existingIndex !== -1) {
    alert("This name already exists in the list!");
    return;
  }

  // Add row in table
  const tableBody = document.getElementById("adSaleTableTBody");
  const row = document.createElement("tr");

  row.innerHTML = `
      <td>
        <img src="https://i.postimg.cc/cJZRzYzT/delete-Icon.png" alt="Delete" 
          onclick="deleteBookRow('${name}')" 
          style="cursor: pointer; width: 20px; height: 20px;">
      </td>
      <td>${name}</td>
      <td>₹${total.toFixed(2)}</td>
      <td>${bBook}</td>
      <td>${sBook}</td>
    `;
  tableBody.appendChild(row);

  // Add to array
  bookItems.push({
    name: name,
    bBook: parseInt(bBook || 0),
    sBook: parseInt(sBook || 0),
    total: total,
  });

  console.log("Current bookItems:", bookItems); // For debug

  ex_clearAdminBookFields();
}

function deleteBookRow(name) {
  const row = document.getElementById(name);
  if (row) row.remove();

  bookItems = bookItems.filter((item) => item.name !== name);
}

function clearAdminBookFields() {
  SHOW_CONFIRMATION_POPUP(
    "Do you want to clear all ?",
    ex_clearAdminBookFields
  );
}

function ex_clearAdminBookFields() {
  document.getElementById("adminCustName").value = "";
  document.getElementById("adminBBookAmount").value = "";
  document.getElementById("adminSBookAmount").value = "";
  document.getElementById("adminCustNameClrBtn").style.display = "none";
  selectedUserForBook = "";
}

function ex_clearTableData() {
  document.getElementById("adSaleTableTBody").innerHTML = "";
  bookItems = [];
}

async function adminBookSubmitClick() {
  if (bookItems.length > 0) {
    const response = await CALL_API("SAVE_BOOK_ISSUED", bookItems);
    if (response.status) {
      SHOW_SUCCESS_POPUP("Record Inserted! Hare Krishna");
      ex_clearAdminBookFields();
      ex_clearTableData();
    }
  }
}
