async function ipSubmitBtnClick() {
  let ipTxtBoxValue = GetControlValue("ipTxtBox");
  let button = document.getElementById("initialLoginLogout");
  if (ipTxtBoxValue !== "") {
    IsLoading(true);

    const passwordAPIresponse = await checkPassword(
      ipTxtBoxValue.toString().trim(),
    );
    IsLoading(false);
    console.log(passwordAPIresponse);
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
      button.textContent = "Logout";
      SHOW_SPECIFIC_DIV("mainContainer");
      setUserNameOnFrontScreen(loginUser);
    } else {
      SHOW_ERROR_POPUP("Wrong Password!");
    }
  } else {
    SHOW_ERROR_POPUP("Please enter password!");
  }
}

function setLoginUserNameDiv(userName) {
  const loginUserDiv = document.getElementById("login-user-name-div");
  const loginUserLabel = document.getElementById("login-user-name-lbl");

  loginUserDiv.style.display = "block"; // Make the div visible
  loginUserLabel.innerHTML = `<strong>${userName}</strong>`; // Set the username in bold
}

async function OpenInitialLoginWindow() {
  let button = document.getElementById("initialLoginLogout");
  if (button.textContent.trim() === "Login") {
    resetTimer();
    resetReadingForm();
    resetHearingForm();
    await DB_DELETE(INDEX_DB.keys.LOGIN, INDEX_DB.dbName, INDEX_DB.storeName);

    SHOW_SPECIFIC_DIV("initailPasswordPopup");
  } else {
    SHOW_CONFIRMATION_POPUP("Do you want to logout?", initialLogoutByUser);
  }
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
  setUserNameOnFrontScreen("");
  userLoginInfoData = "";
}
