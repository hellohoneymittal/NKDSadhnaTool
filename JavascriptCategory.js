const japaContainer = "japaContainer";
const mainContainer = "mainContainer";
const registrationContainer = "registrationContainer";
let monthlyAverage = "";
let japaAVGApiRequest = {
  apiType: "GET_JAPA_MONTHLY_AVG",
};

async function openJapaWindow() {
  if (getUserLoginInfo()) {
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
  const onlineRes = await IS_ONLINE();
  if (onlineRes) {
    try {
      IsLoading(true);
      const inputData = {
        rowIndex: userLoginInfoData?.rowIndex,
      };
      japaAVGApiRequest.inputData = inputData;
      const jsonReq = JSON.stringify(japaAVGApiRequest);
      const response = await axios.post(GET_JAPA_MONTHLY_AVG, jsonReq);
      const data = response?.data;
      if (data?.result?.length > 9) {
        console.log(data.result);
        monthlyAverage = data.result[10]?.toString();
        const sdBlock = document.getElementById("sdBlock");
        sdBlock.style.display = "flex";
        sdBlock.textContent = `Monthly Average: ${monthlyAverage} Sec`;
      }
      IsLoading(false); // Stop loading
    } catch (error) {
      IsLoading(false); // Stop loading on error
      console.log(error);
      SHOW_ERROR_POPUP(error.message);
    } finally {
      IsLoading(false); // Stop loading regardless of success or error
    }
  }
  SHOW_SPECIFIC_DIV(japaContainer);
  pauseTimer();
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
