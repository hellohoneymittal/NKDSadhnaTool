const passwordInputReport = document.getElementById("passwordInputReport");
const japaPrevReportPopup = document.getElementById("japaPrevReportPopup");
let userLoginInfoDataRpt = "";
let passwordForReport = "";
let areaLeaderReport = "";
function getUserLoginInfoRpt() {
  const storedData = localStorage.getItem("userLoginInfo");
  if (storedData) {
    userLoginInfoDataRpt = JSON.parse(storedData);
    return true;
  } else {
    return false;
  }
}

function openPasswordReportPopup() {
  --pauseCount;
  pauseTimer(); // pause the background timer
  if (getUserLoginInfoRpt()) {
    SHOW_CONFIRMATION_POPUP(
      "Do you want to see japa report?",
      handleReportSubmitPassword,
      handleBackConfirmPopup
    );
  } else {
    ShowPopup(passwordReportPopup);
  }
}

function handleBackConfirmPopup() {
  CLOSE_CONFIRMATION_POPUP();
  updatePauseCount();
  startTimer();
}

function handleBackToJapaScreen() {
  HidePopup(passwordReportPopup);
  japaPrevReportPopup.style.display = displayHide;
  updatePauseCount();
  startTimer();
}

async function handleReportSubmitPassword() {
  ADD_OPTION_IN_YEAR_MONTH_DROPDOWN("japaMonthSelect", "japaYearSelect");
  const month = document.getElementById("japaMonthSelect").value;
  const year = document.getElementById("japaYearSelect").value;
  const japaReportRequest = {
    apiType: API_CONSTANT.POPULATE_REPORT_DATA_JRHM,
    sheetName: "JapaData",
    month: month,
    year: year,
  };

  if (userLoginInfoDataRpt?.devName) {
    loadingSpinner.style.display = displayShow;
    japaReportRequest.password = userLoginInfoDataRpt?.password
      .toString()
      .trim()
      .toLowerCase();
    passwordForReport = japaReportRequest.password;
    areaLeaderReport = userLoginInfoDataRpt?.areaLeader;
    japaReportRequest.areaLeader = userLoginInfoDataRpt?.areaLeader;
    await loadReportGrid(japaReportRequest);
    japaPrevReportPopup.style.display = displayShow;
  } else {
    const passValue = passwordInputReport.value.toString().trim().toLowerCase();
    if (!passValue) {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.emptyPassword);
      return;
    }

    loadingSpinner.style.display = displayShow;
    const passwordAPIresponse = await checkPassword(passValue);
    loadingSpinner.style.display = displayHide;
    if (passwordAPIresponse.devName) {
      loadingSpinner.style.display = displayShow;
      japaReportRequest.password = passwordAPIresponse.password
        .toString()
        .trim()
        .toLowerCase();
      japaReportRequest.areaLeader = passwordAPIresponse?.areaLeader;
      passwordForReport = japaReportRequest.password;
      areaLeaderReport = passwordAPIresponse?.areaLeader;
      await loadReportGrid(japaReportRequest);
      HidePopup(passwordReportPopup);
      japaPrevReportPopup.style.display = displayShow;
    } else {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.correctPassword);
    }
  }
}

async function updateJapaSelection() {
  const month = document.getElementById("japaMonthSelect").value;
  const year = document.getElementById("japaYearSelect").value;
  const japaReportRequest = {
    apiType: API_CONSTANT.POPULATE_REPORT_DATA_JRHM,
    sheetName: "JapaData",
    month: month,
    year: year,
    password: passwordForReport,
    areaLeader: areaLeaderReport,
  };
  await loadReportGrid(japaReportRequest);
}
