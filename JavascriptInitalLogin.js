async function ipSubmitBtnClick() {
  let ipTxtBoxValue = GetControlValue("ipTxtBox");
  if (ipTxtBoxValue !== "") {
    IsLoading(true);

    const passwordAPIresponse = await checkPassword(
      ipTxtBoxValue.toString().trim(),
    );
    IsLoading(false);

    if (passwordAPIresponse?.status && passwordAPIresponse?.devName) {
      let loginUser = "";
      if (passwordAPIresponse.devoteeType == DEVOTEE_TYPE_CONSTANT.ggStudent) {
        loginUser = passwordAPIresponse.devName.split("_")[1];
      } else {
        loginUser = passwordAPIresponse.devName;
      }
      document.title = loginUser;
      const passwordResponse = {
        ...passwordAPIresponse,
        loginUser: loginUser,
        todayDateTime: getTodayDateTimeIST(),
      };
      setLoginUserNameDiv(loginUser);

      await DB_SET(
        INDEX_DB.keys.LOGIN,
        passwordResponse,
        INDEX_DB.dbName,
        INDEX_DB.storeName,
      );
      SHOW_SPECIFIC_DIV("mainContainer");
    } else {
      SHOW_ERROR_POPUP("Wrong Password!");
    }
  } else {
    SHOW_ERROR_POPUP("Please enter password!");
  }
}

function setLoginUserNameDiv(userName) {
  if (userName) {
    const loginUserDiv = document.getElementById("login-user-name-div");
    const loginUserLabel = document.getElementById("login-user-name-lbl");
    let button = document.getElementById("initialLoginLogout");
    button.style.display = "none"; // Hide the button
    loginUserDiv.style.display = "block"; // Make the div visible
    loginUserLabel.innerHTML = `<strong>${userName}</strong>`; // Set the username in bold
  } else {
    let button = document.getElementById("initialLoginLogout");
    button.style.display = "block"; // Hide the button
  }
}

async function OpenInitialLoginWindow() {
  resetTimer();
  resetReadingForm();
  resetHearingForm();
  await DB_DELETE(INDEX_DB.keys.LOGIN, INDEX_DB.dbName, INDEX_DB.storeName);

  SHOW_SPECIFIC_DIV("initailPasswordPopup");
}

async function initialLogoutByUser() {
  let button = document.getElementById("initialLoginLogout");
  await DB_DELETE(INDEX_DB.keys.LOGIN, INDEX_DB.dbName, INDEX_DB.storeName);
  button.textContent = "Login";
  document.title = "Sadhna App";
  resetTimer();
  resetReadingForm();
  resetHearingForm();
  userLoginInfoReadingData = "";
  const loginUserDiv = document.getElementById("login-user-name-div");
  const loginUserLabel = document.getElementById("login-user-name-lbl");
  loginUserLabel.innerHTML = "";
  loginUserDiv.style.display = "none";

  userLoginInfoData = "";
  setLoginUserNameDiv();
}

function toggleHomeUserMenu() {
  const userName = document.getElementById("login-user-name-div");
  const menu = document.getElementById("homeUserMenu");
  const isExpanded = userName.getAttribute("aria-expanded") === "true";

  menu.hidden = isExpanded;
  userName.setAttribute("aria-expanded", String(!isExpanded));
}

function closeHomeUserMenu() {
  const userName = document.getElementById("login-user-name-div");
  const menu = document.getElementById("homeUserMenu");

  menu.hidden = true;
  userName.setAttribute("aria-expanded", "false");
}

function handleHomeUserMenuKeydown(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleHomeUserMenu();
  } else if (event.key === "Escape") {
    closeHomeUserMenu();
  }
}

function requestHomeLogout(event) {
  event.stopPropagation();
  closeHomeUserMenu();

  SHOW_CONFIRMATION_POPUP("Do you want to logout?", initialLogoutByUser);
}

document.addEventListener("click", (event) => {
  const userName = document.getElementById("login-user-name-div");
  if (!userName.contains(event.target)) {
    closeHomeUserMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeHomeUserMenu();
  }
});
