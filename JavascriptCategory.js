const japaContainer = "japaContainer";
const mainContainer = "mainContainer";
const registrationContainer = "registrationContainer";
let monthlyAverage = "";
let japaAVGApiRequest = {
  apiType: "GET_JAPA_MONTHLY_AVG",
};

async function openJapaWindow() {
  if (await getUserLoginInfo()) {
    internalCallMonthlyAvgAPI();
  } else {
    SHOW_SPECIFIC_DIV("passwordPopupAvgWindow");
  }
}

async function submitAvgPasswordClick() {
  const pass = document.getElementById("passwordAvgWindowTxtBox").value;
  IsLoading(true);
  const passwordAPIresponse = await checkPassword(pass);
  updatePasswordRefInApp(passwordAPIresponse);
  IsLoading(false);
  internalCallMonthlyAvgAPI();
}

async function internalCallMonthlyAvgAPI() {
  const inputData = {
    rowIndex: userLoginInfoData?.rowIndex,
  };
  japaAVGApiRequest.inputData = inputData;
  const jsonReq = JSON.stringify(japaAVGApiRequest);

  const response = await CALL_API_WITH_CACHE(
    "GET_JAPA_MONTHLY_AVG",
    inputData,
    24,
  );

  if (response?.data?.length > 9) {
    monthlyAverage = response.data[10]?.toString();
    const sdBlock = document.getElementById("sdBlock");
    sdBlock.style.display = "flex";
    sdBlock.textContent = `Monthly Average: ${monthlyAverage} Sec`;
    SHOW_SPECIFIC_DIV(japaContainer);
    pauseTimer();
  }
}

function backToMainScreen(id) {
  HidePopup(id);
  ShowPopup(mainContainer);
}

function backToJapaScreen(id) {
  if (id == registrationContainerPopup) {
    HidePopup(registrationContainer);
  }
  HidePopup(id);
  ShowPopup(japaContainer);
}

function openTempWindow() {
  HidePopup(mainContainer);
  ShowPopup(registrationContainer);
}

function backToMain(id) {
  if (id == registrationContainerPopup) {
    HidePopup(registrationContainer);
  }
  HidePopup(id);
  ShowPopup(mainContainer);
}
