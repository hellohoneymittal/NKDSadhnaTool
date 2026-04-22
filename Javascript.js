const timerElement = document.getElementById("timer");
const mantraElement = document.getElementById("mantraBlock");
const mantraText = document.querySelector(".mantra-text");
let lastIncrementTime = 0; // global
let peopleData = {};
const dropdown = document.getElementById("nameDropdown");
const cycleVideos = [
  "AYePUciQDiY", // 1st
  "39ScgiYDeWY", // 2nd
  "VNu5NE2uKDY", // 3rd
];
let rowMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec

const startPauseButton = document.getElementById("startPauseButton");
// Simulated state
let isRunning = false;
let isPaused = false;
let manualJapaCount = 0;
let isCounterVisible = false;

function animateMantraText(action = "start") {
  const mantraText = document.querySelector(".mantra-text");

  if (!mantraText) return;

  if (action === "clear") {
    // 🧼 Remove animation
    mantraText.style.animation = "none";
    return;
  }

  if (action === "start") {
    // 🎲 Pick a random animation
    const animations = [
      "textPulse",
      "textGlow",
      "letterFloat",
      "colorFade",
      "pulseGlowCombo",
      "sway",
      "zoomInOut",
      "softFlash",
      "waveLetterSpacing",
      "dimGlow",
    ];
    const randomAnim =
      animations[Math.floor(Math.random() * animations.length)];

    // 🔁 Reset and apply
    mantraText.style.animation = "none";
    void mantraText.offsetHeight; // Force reflow
    mantraText.style.animation = `${randomAnim} 3s ease-in-out infinite`;
  }
}

function updateTimerColor(color = "black") {
  // Timer styling
  if (color === "black") {
    startPauseButton.className = " bulbwhite";
    timerElement.classList.remove("running", "paused");
    mantraElement.classList.remove("mantra-running", "mantra-paused");
    animateMantraText("clear");
  } else if (color === "yellow") {
    startPauseButton.className = "bulbyellow";
    timerElement.classList.remove("running");
    timerElement.classList.add("paused");
    mantraElement.classList.remove("mantra-running");
    mantraElement.classList.add("mantra-paused");
    animateMantraText("clear");
  } else {
    startPauseButton.className = "bulbgreen";

    timerElement.classList.add("running");
    timerElement.classList.remove("paused");

    mantraElement.classList.add("mantra-running");
    mantraElement.classList.remove("mantra-paused");
    animateMantraText("start");
  }
}

const japaSubmitBtn = "japaSubmitBtn";
let userLoginInfoData = "";
document
  .querySelectorAll(
    "#passwordPopup input, #passwordPopup textarea , #passwordPopup select",
  )
  .forEach((element) => {
    element.addEventListener("input", () =>
      disabledButtonState(passwordPopup, japaSubmitBtn),
    );
  });

document
  .querySelectorAll(
    "#otherJapaDetailPopup input, #otherJapaDetailPopup textarea , #otherJapaDetailPopup select",
  )
  .forEach((element) => {
    element.addEventListener("input", () =>
      disabledButtonState("otherJapaDetailPopup", "japaSubmitWODBtn"),
    );
  });

setupKeyPressHandler("japaContainer", "startPauseButton", ["Space"]);

const mahamantraArray = [
  "अपने मन को महामंत्र सुनाने में लगाएं।",
  "हे कृष्ण, कृपया महामंत्र के रूप में मेरे कानों से मेरे हृदय में प्रवेश कीजिए।",
  "गोलोक जाने में ध्यानपूर्वक जप 99% योगदान देता है।",
  "अपने मन को इधर-उधर की बातों से हटाइए और जप को ध्यान से सुनिए।",
  "हे राधा रानी, हे कृष्ण, मुझे अपनी सेवा में लगाइए।",
  "हे बलराम, हे नित्यानंद, मुझमें हरि नाम के प्रति रुचि पैदा कीजिए।",
  "ध्यानपूर्वक जप न करने का अर्थ है नाम अपराध करना।",
  "कृपया सीधे बैठिए और गहरी सांस लेकर ध्यान से जप कीजिए।",
  "गुरु और वैष्णवों के चरणों का ध्यान कर, ध्यानपूर्वक जप की प्रार्थना कीजिए।",
  "कृपया महामंत्र के हर शब्द का उच्चारण अलग-अलग और ध्यान से कीजिए।",
  "कृपया 'हरे हरे' जल्दी से न बोलकर ध्यान से बोलिए, यह राधा रानी का नाम है।",
  "कृपया अपने कामों की योजना न बनाइए, महामंत्र सब ठीक कर देगा।",
  "यह जप आपके जीवन का आखिरी जप हो सकता है, आखिरी प्रार्थना ध्यान से कीजिए।",
  "हमें जप नहीं करना, बल्कि प्रेमपूर्वक भगवान को बुलाना है।",
  "क्या हमारा जप अजामिल की आखिरी पुकार जैसा है?",
  "मन को मंत्र के शब्दों में उलझा कर बांध दीजिए।",
];

const sleepingTimeSelect = "sleepingTimeSelect";
const wakeUpTimeSelect = "wakeUpTimeSelect";
const gurvashtakamChkBox = "gurvashtakamChkBox";
const narsimhaChkBox = "narsimhaChkBox";
const tulsiChkBox = "tulsiChkBox";
const guruPujaChkBox = "guruPujaChkBox";
const serviceTxtBox = "serviceTxtBox";
const password = "password";
const saTablePopupKey = "saTablePopup";
const saPasswordPopupKey = "saPasswordPopup";
const tdaTxtBox = "tdaTxtBox";
const bdaTxtBox = "bdaTxtBox";

let timerInterval;
let singleStartTime;
let elapsedTime = 0;
let lapTime = 0;
let timerDisplay = document.getElementById("timer");
let lapsContainer = document.getElementById("laps");
let lapButton = document.getElementById("lapButton");
let startTime = null;
let endTimeGbl = null;
let scalePopup = document.getElementById("scalePopup");
let successPopupReport = document.getElementById("successPopupReport");
let confirmPopup = document.getElementById("confirmPopup");
let reportContainer = document.getElementById("reportDiv");
let isTimerRunning = false;
let lapsElementsDiv;
let lastSaveTime = Date.now();
let startTimestampKey = "startTimestamp";
let endTimestampKey = "endTimestamp";
let pauseCountKey = "pauseCount";
let before9RoundKey = "before9Round";
let before9RoundGbl = 0;
let lapTimesArrGbl = [];
let pauseCount = 0;
let newMinHeight = 3;

let japaApiRequest = {
  apiType: "SAVE_JAPA_DATA",
  isNKDDevotee: "",
  date: "",
  password: "",
  devName: "",
  startTimestamp: "",
  endTimestamp: "",
  japaDuration: "",
  totalRound: "",
  before9Round: "",
  laps: "",
  pauseCount: "",
  sleepingTimeSelect: "",
  wakeUpTimeSelect: "",
  aartis: "",
  serviceDuration: "",
  devoteeType: "",
  tCollAmount: "",
  bCollAmount: "",
};

//Attach

// Load previous timer state from localStorage
let currentIndex = Math.floor(Math.random() * 16);
let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    console.log("Screen Wake Lock is active");

    // Listen for wake lock release events
    wakeLock.addEventListener("release", () => {
      console.log("Screen Wake Lock has been released");
    });
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

function releaseWakeLock() {
  if (wakeLock !== null) {
    wakeLock.release();
    wakeLock = null;
  }
}

function displaySentence() {
  document.getElementById("display-text").textContent =
    mahamantraArray[currentIndex];
}

function showNextSentence() {
  currentIndex = (currentIndex + 1) % mahamantraArray.length;
  document.getElementById("display-text").textContent =
    mahamantraArray[currentIndex];
  document.getElementById("display-text-inner").textContent =
    mahamantraArray[currentIndex];
}

displaySentence();

function loadTimerState() {
  const savedElapsedTime = localStorage.getItem("elapsedTime");
  const savedLapTime = localStorage.getItem("lapTime");
  const savedLapsData = JSON.parse(localStorage.getItem("lapsData") || "[]");
  const lapsMinHeight = localStorage.getItem("lapsMinHeight");
  const savedlapTimesArr = JSON.parse(localStorage.getItem("lapTimes"));
  const savedOriginalStartTime = localStorage.getItem(startTimestampKey);
  const savedPauseCount = localStorage.getItem(pauseCountKey);
  const savedBefore9Round = localStorage.getItem(before9RoundKey);
  const savedUserInfo = JSON.parse(
    localStorage.getItem("userLoginInfo") || "{}",
  );
  if (savedOriginalStartTime) {
    const savedDate = convertTimeStampToDate(savedOriginalStartTime);
    const today = new Date();
    if (
      savedDate.getFullYear() === today.getFullYear() &&
      savedDate.getMonth() === today.getMonth() &&
      savedDate.getDate() === today.getDate()
    ) {
      startTime = savedOriginalStartTime;
      if (savedElapsedTime) {
        elapsedTime = parseInt(savedElapsedTime);
        lapTime = parseInt(savedLapTime) || 0;
        elapsedTime > 0 ? updateTimerColor("yellow") : updateTimerColor();
        timerDisplay.textContent = timeToString(elapsedTime);
      }
      if (savedLapsData.length > 0) {
        lapsContainer.innerHTML = ""; // Clear existing laps

        savedLapsData.forEach((lap) => {
          // Parse the HTML safely and apply data-time24
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = lap.html;
          const lapElement = tempDiv.firstElementChild;

          if (lapElement && lap.time24) {
            lapElement.dataset.time24 = lap.time24;
          }

          if (lapElement) {
            lapsContainer.appendChild(lapElement);
          }
        });
      }

      if (savedlapTimesArr) {
        lapTimesArrGbl = savedlapTimesArr;
      }
      if (savedPauseCount) {
        pauseCount = parseInt(savedPauseCount);
      }
      if (lapsMinHeight) {
        lapsContainer.style.minHeight = `${lapsMinHeight}rem`;
      }
      if (savedBefore9Round) {
        before9RoundGbl = parseInt(savedBefore9Round);
      }
    }
  }

  if (savedUserInfo?.devName) {
    let button = document.getElementById("initialLoginLogout");
    button.textContent = "Logout";
    document.title = savedUserInfo?.loginUser;
    const loginUserDiv = document.getElementById("login-user-name-div");
    const loginUserLabel = document.getElementById("login-user-name-lbl");

    if (savedUserInfo?.loginUser) {
      loginUserDiv.style.display = "block"; // Make the div visible
      loginUserLabel.innerHTML = `<strong>${savedUserInfo.loginUser}</strong>`; // Set the username in bold
    }
  }
  setUserNameOnFrontScreen(savedUserInfo?.devName);
}

// Initialize timer state on page load
loadTimerState();

function startTimer() {
  if (startTime == null) {
    startTime = Date.now();
    localStorage.setItem(startTimestampKey, startTime.toString());
  } else {
    let selectedStartTime = parseInt(startTime, 10);

    if (!isNaN(selectedStartTime)) {
      selectedStartTime += 1;
      localStorage.setItem(startTimestampKey, selectedStartTime.toString());
      localStorage.setItem("elapsedTime", elapsedTime);
      localStorage.setItem("lapTime", lapTime);
      localStorage.setItem("laps", lapsContainer.innerHTML);
      localStorage.setItem("lapsMinHeight", newMinHeight);
      localStorage.setItem("lapTimes", JSON.stringify(lapTimesArrGbl));
      const lapDataArray = Array.from(lapsContainer.children).map((div) => ({
        html: div.outerHTML,
        time24: div.dataset.time24,
      }));
      localStorage.setItem("lapsData", JSON.stringify(lapDataArray));
    }
  }

  lapButton.style.display = dispalyButtonShow;
  singleStartTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - singleStartTime;
    timerDisplay.textContent = timeToString(elapsedTime);
    saveTimerState();
  }, 5);

  startPauseButton.textContent = "Pause";
  isTimerRunning = true;
  updateTimerColor("green");
}

function pauseTimer() {
  console.log("checkin in pausetimer ", startTime);
  updatePauseCount();
  cleartTimerInterVal(timerInterval);
  isTimerRunning = false;
  if (startTime && startTime > 0) {
    startPauseButton.textContent = "Resume";
    updateTimerColor("yellow");
  } else {
    startPauseButton.textContent = "Start";
    updateTimerColor();
  }
}

function updatePauseCount() {
  ++pauseCount;
  localStorage.setItem(pauseCountKey, pauseCount);
}
function handleStartPause() {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function cleartTimerInterVal(timerInterval) {
  clearInterval(timerInterval);
  updateTimerColor("yellow");
}

//#region main method
function pauseAndShowPopup() {
  if (isCounterVisible) {
    console.log(manualJapaCount);
    if (manualJapaCount === 108) {
      call_pauseAndShowPopup();
    } else {
      SHOW_ERROR_POPUP("Please complete 108 japa count to complete the round.");
    }
  } else {
    call_pauseAndShowPopup();
  }
}

function call_pauseAndShowPopup() {
  showNextSentence();

  cleartTimerInterVal(timerInterval); // Pause the timer
  scalePopup.style.display = "flex"; // Show the popup
}
//#endregion

//#region scalepopup method
function closeScalePopup() {
  scalePopup.style.display = "none"; // Hide the popup
  updatePauseCount();
  startTimer(); // Resume the timer
}

function timeToSeconds(timeStr) {
  //timeToSeconds("0:01 sec"); //
  //timeToSeconds("0:01 Sec"); //
  // Remove "sec" in any case and trim

  timeStr = timeStr.replace(/\s*(sec(onds)?|s)\s*$/i, "").trim();

  const [min, sec] = timeStr.split(":").map(Number);

  if (isNaN(min) || isNaN(sec)) return 0;

  return min * 60 + sec;
}

function recordLap() {
  const currentTime24Format = GetCurrentTimeIn24HrFormat();
  const istDate = new Date();
  const istHour = istDate.getHours();

  const selectedRadio = document.querySelector(
    'input[name="optradio"]:checked',
  );

  const formattedLapTime = calculateLapTime(elapsedTime, lapTime);

  const lapTimeSeconds = timeToSeconds(formattedLapTime);
  const avgTimeSeconds = timeToSeconds(monthlyAverage);

  if (lapTimeSeconds < 300) {
    SHOW_ERROR_POPUP(
      `Current japa time is ${formattedLapTime}. Japa time must be more than 5 minutes. Please chant attentively.`,
    );
    return;
  }

  lapTimesArrGbl.push(formattedLapTime);
  lapTime = elapsedTime;

  const timeParts = formattedLapTime.split(":");
  const minutes = parseInt(timeParts[0], 10);
  const seconds = parseInt(timeParts[1], 10);

  const isBeforeNineAM = istHour < 9;
  const isBetween6And7_30 = !(
    minutes < 6 ||
    (minutes === 7 && seconds > 30) ||
    minutes >= 8
  );

  const diff = lapTimeSeconds - avgTimeSeconds;
  const mathAbsDiff = Math.abs(diff);
  const isWithin20Sec = mathAbsDiff <= 20;
  const arrow = diff > 0 ? "↑" : "↓";
  const aboveBelowStatus = diff > 0 ? "above Avg" : "below Avg";
  let color = "";

  if (isBetween6And7_30) {
    color = isWithin20Sec ? "white" : "red";
  } else {
    color = "white";
  }

  let coloredScale = "";

  coloredScale = `<span style="color: ${color};  display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 14px;"> ( ${arrow} ${mathAbsDiff} s ${aboveBelowStatus} )</span>`;

  const lapElement = document.createElement("div");
  lapElement.style.color = "white";
  lapElement.style.fontSize = "0.9em";
  lapElement.style.backgroundColor =
    minutes < 6 || (minutes === 7 && seconds > 30) || minutes >= 8
      ? "#f44336"
      : "#4caf50";

  lapElement.innerHTML = `Round ${
    lapsContainer.childElementCount + 1
  } - ${formattedLapTime} - ${coloredScale}`;

  lapElement.dataset.time24 = currentTime24Format; // Store time but do not show
  lapElement.classList.add("lap-entry");

  if (isBeforeNineAM && isBetween6And7_30) {
    before9RoundGbl += 1;
    localStorage.setItem(before9RoundKey, before9RoundGbl.toString());
  }

  const lapCount = lapsContainer.childElementCount + 1;
  newMinHeight = Math.min(lapCount * 3, 12);
  lapsContainer.style.minHeight = `${newMinHeight}rem`;

  lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);
  scalePopup.style.display = "none";
  startPauseButton.textContent = "Pause";
  startTimer(); // Resume the timer
}

function scaleBack() {
  scalePopup.style.display = "none"; // Hide the popup
}

// Method to calculate and format lap time
function calculateLapTime(elapsedTime, lapTime) {
  const lapElapsedTime = elapsedTime - lapTime;
  const lapMinutes = Math.floor(lapElapsedTime / 60000);
  const lapSeconds = Math.floor((lapElapsedTime % 60000) / 1000);

  return `${lapMinutes}:${lapSeconds.toString().padStart(2, "0")} s`;
}
//#endregion

function stopTimer() {
  cleartTimerInterVal(timerInterval);

  if (getUserLoginInfo()) {
    SHOW_CONFIRMATION_POPUP(
      "Do you want to submit your japa?",
      submitPassword,
      closePopup,
    );
  } else {
    ShowPopup(passwordPopup);
    document.getElementById("password").value = "";
  }

  // Reset button label to 'Start'
  startPauseButton.textContent = "Start";
  isTimerRunning = false;
  releaseWakeLock();

  disabledButtonState(passwordPopup, japaSubmitBtn);
}

function openConfirmPopup() {
  cleartTimerInterVal(timerInterval); // Pause the timer
  confirmPopup.style.display = "flex";
}

function resetTimer() {
  updateTimerColor();
  clearInterval(timerInterval);
  lapButton.style.display = displayHide;
  pauseCount = 0;
  elapsedTime = 0;
  lapTime = 0;
  startTime = null;
  endTimeGbl = null;
  lapsElementsDiv = "";
  timerDisplay.textContent = "00:00:00:00";
  lapsContainer.innerHTML = "";
  lapsContainer.style.minHeight = `3rem`;
  lapTimesArrGbl = [];
  localStorage.removeItem("startTimestamp");
  localStorage.removeItem("elapsedTime");
  localStorage.removeItem("lapTime");
  localStorage.removeItem("lapsMinHeight");
  localStorage.removeItem("lapTimes");
  localStorage.removeItem("pauseCount");
  localStorage.removeItem("before9Round");
  localStorage.removeItem("endTimestamp");
  localStorage.removeItem("lapsData");
  before9RoundGbl = 0;
  // Reset button label to 'Start'
  startPauseButton.textContent = "Start";
  isTimerRunning = false;
  hideOtherJapaDetailPopup();
  manualJapaCount = 0;
  document.getElementById("countCircle").textContent =
    `${manualJapaCount} / 108`;
  japaApiRequest = {
    apiType: "SAVE_JAPA_DATA",
    isNKDDevotee: "",
    date: "",
    password: "",
    devName: "",
    startTimestamp: "",
    endTimestamp: "",
    japaDuration: "",
    totalRound: "",
    before9Round: "",
    laps: "",
    pauseCount: "",
    sleepingTimeSelect: "",
    wakeUpTimeSelect: "",
    aartis: "",
    serviceDuration: "",
    devoteeType: "",
    tCollAmount: "",
    bCollAmount: "",
  };
}

function hideOtherJapaDetailPopup() {
  HidePopup("otherJapaDetailPopup");
  revertSelectOptions("sleepingTimeSelect", ORIGNAL_SLEEP_OPTIONS);
  revertSelectOptions("wakeUpTimeSelect", ORIGNAL_WAKEUP_OPTIONS);
}

function saveTimerState() {
  const now = Date.now();
  if (now - lastSaveTime > 5000) {
    // Save every second
    localStorage.setItem("elapsedTime", elapsedTime);
    localStorage.setItem("lapTime", lapTime);
    localStorage.setItem("lapTimes", JSON.stringify(lapTimesArrGbl));
    lastSaveTime = now;

    if (userLoginInfoData?.devName) {
      userLoginInfoData.todayDateTime = getTodayDateTimeIST();

      localStorage.setItem("userLoginInfo", JSON.stringify(userLoginInfoData));
    }
  }
}

function closePopup() {
  updatePauseCount();
  HidePopup(passwordPopup);
  startTimer();
}

function handleLastRoundDuringSubmit() {
  const currentTime24Format = GetCurrentTimeIn24HrFormat();
  const lapElapsedTime = elapsedTime - lapTime;

  // Calculate lap elapsed time in seconds
  if (lapTime == 0 && lapElapsedTime <= 180000) {
    return false; //No round chanted.
  }

  // Check if lapElapsedTime is greater than 3 minutes (180 seconds)
  if (lapElapsedTime <= 180000) {
    return true; // Exit the function early if lapElapsedTime is 3 minutes or less
  }

  const istDate = new Date();
  const istHour = istDate.getHours();

  const formattedLapTime = calculateLapTime(elapsedTime, lapTime);
  lapTimesArrGbl.push(formattedLapTime);
  lapTime = elapsedTime;

  const lapTimeSeconds = timeToSeconds(formattedLapTime);
  const avgTimeSeconds = timeToSeconds(monthlyAverage);

  const timeParts = formattedLapTime.split(":");
  const minutes = parseInt(timeParts[0], 10);
  const seconds = parseInt(timeParts[1], 10);

  const isBeforeNineAM = istHour < 9;
  const isBetween6And7_30 = !(
    minutes < 6 ||
    (minutes === 7 && seconds > 30) ||
    minutes >= 8
  );

  const diff = lapTimeSeconds - avgTimeSeconds;
  const mathAbsDiff = Math.abs(diff);
  const isWithin20Sec = mathAbsDiff <= 20;
  const arrow = diff > 0 ? " ↑" : " ↓";
  let color = "";

  if (isBetween6And7_30) {
    color = isWithin20Sec ? "white" : "red";
  } else {
    color = "white";
  }

  let coloredScale = "";

  coloredScale = `<span style="color: ${color};  display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 13px;"> (${arrow} ${mathAbsDiff}s ≈ avg )</span>`;

  const lapElement = document.createElement("div");
  lapElement.style.color = "white";
  lapElement.style.fontSize = "0.9em";
  lapElement.style.backgroundColor =
    minutes < 6 || (minutes === 7 && seconds > 30) || minutes >= 8
      ? "#f44336"
      : "#4caf50";

  lapElement.innerHTML = `Round ${
    lapsContainer.childElementCount + 1
  } - ${formattedLapTime} - ${coloredScale}`;

  lapElement.dataset.time24 = currentTime24Format; // Store time but do not show
  lapElement.classList.add("lap-entry");

  if (isBeforeNineAM && isBetween6And7_30) {
    before9RoundGbl += 1;
    localStorage.setItem(before9RoundKey, before9RoundGbl.toString());
  }

  const lapCount = lapsContainer.childElementCount + 1;
  newMinHeight = Math.min(lapCount * 3, 12);
  lapsContainer.style.minHeight = `${newMinHeight}rem`;

  lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);

  return true;
}

function parseSleepWakeTimeRange(rowVal) {
  if (rowVal === "Before 21:01") {
    return "21:00";
  } else if (rowVal === "After 23:00") {
    return "23:00";
  } else if (rowVal === "Before 03:01") {
    return "03:00";
  } else if (rowVal === "After 05:00") {
    return "05:00";
  } else {
    return rowVal.split(" to ")[0];
  }
}

function populateAartiResult() {
  const gurvashtakamChkBoxVal = GetControlValue(
    gurvashtakamChkBox,
    CONTROL_TYPE_CONSTAINT.checkbox,
  );
  const tulsiChkVal = GetControlValue(
    tulsiChkBox,
    CONTROL_TYPE_CONSTAINT.checkbox,
  );
  const narsimhaChkBoxVal = GetControlValue(
    narsimhaChkBox,
    CONTROL_TYPE_CONSTAINT.checkbox,
  );
  const guruPujaChkBoxVal = GetControlValue(
    guruPujaChkBox,
    CONTROL_TYPE_CONSTAINT.checkbox,
  );

  // Create an array to store the selected Arti names
  let selectedAartis = [];

  // Check if each checkbox is checked and push the corresponding Arti name to the array
  if (gurvashtakamChkBoxVal) {
    selectedAartis.push("Gurvashtakam");
  }
  if (tulsiChkVal) {
    selectedAartis.push("Narsimha");
  }
  if (narsimhaChkBoxVal) {
    selectedAartis.push("Tulsi");
  }
  if (guruPujaChkBoxVal) {
    selectedAartis.push("Guru");
  }

  // Join the selected Arti names into a comma-separated string
  const result = selectedAartis.join(",");

  return result;
}

async function submitPassword() {
  const onlineRes = await IS_ONLINE();
  if (!onlineRes) {
    return onlineRes;
  }
  const startTimetamp = startTime;
  const endTimestamp = Date.now();
  endTimeGbl = endTimestamp;
  localStorage.setItem(endTimestampKey, endTimestamp.toString()); // Store as string

  let startDateDB = formatTimeToDate(startTimetamp);
  let endDateDB = formatTimeToDate(endTimestamp);
  let japaDuration = formatDuration(startTimetamp, endTimestamp);
  let password = document.getElementById("password").value;
  const errorMsg = document.createElement("div");

  errorMsg.style.color = "red";
  errorMsg.style.marginTop = "10px";

  // Remove any previous error messages
  const previousErrorMsg = document.querySelector(
    ".password-popup-content .error-msg",
  );
  if (previousErrorMsg) {
    previousErrorMsg.remove();
  }

  if (userLoginInfoData?.devName) {
    // when password getted initailly
    const lastRoundStatus = handleLastRoundDuringSubmit();
    if (!lastRoundStatus) {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.noJapaChantedError);
      HidePopup(passwordPopup);
      return;
    }
    const date = new Date().toISOString();
    const lapsElements = lapsContainer.querySelectorAll("div");

    lapsElementsDiv = lapsElements;

    const laps = Array.from(lapsElements).map((div) => {
      const lapText = div.textContent.trim();
      const time24 = div.dataset.time24 || "";
      return `${lapText} - ${time24}`;
    });

    let totalRound = laps[0].split(" ")[1];
    IsLoading(true);
    japaApiRequest.devoteeType = userLoginInfoData?.devoteeType;
    japaApiRequest.isNKDDevotee = userLoginInfoData?.isNKDDevotee;
    japaApiRequest.date = date;
    japaApiRequest.password = userLoginInfoData?.password;
    japaApiRequest.devName = userLoginInfoData?.devName;
    japaApiRequest.startTimestamp = startDateDB;
    japaApiRequest.endTimestamp = endDateDB; // Send the end timestamp
    japaApiRequest.japaDuration = japaDuration;
    japaApiRequest.totalRound = totalRound;
    japaApiRequest.laps = laps;
    japaApiRequest.pauseCount = pauseCount;
    japaApiRequest.before9Round = before9RoundGbl;
    japaApiRequest.areaLeader = userLoginInfoData.areaLeader;
    const response = await saveJapaDataAPI(japaApiRequest);
    const currentDay = new Date().getDay();

    if (response.status) {
      const lapTimes = lapTimesArrGbl;
      let lapsObj = calculateStats(lapTimes);
      lapsObj = {
        ...lapsObj,
        userName: userLoginInfoData?.devName,
      };
      populateStatsContainer(lapsObj);
      HidePopup(passwordPopup);
      successPopupReport.style.display = "flex"; // Show the popup
      resetTimer();
      resetPasswordWindowControl();
    } else if (!response.status && response.result == "infoNeeded") {
      if (IS_KARTIK_DATA_VISIABLE) {
        HidePopup(passwordPopup);
        ShowPopup("kartikContainer");
      } else if (currentDay === 6) {
        SHOW_SPECIFIC_DIV("saturdayContainer");
      } else if (currentDay === 0) {
        SHOW_SPECIFIC_DIV("sundayContainer");
      } else {
        ShowPopup("otherJapaDetailPopup");
        if (userLoginInfoData?.devoteeType == DEVOTEE_TYPE_CONSTANT.ggStudent) {
          updateSelectOptions("sleepingTimeSelect", GG_SLEEP_OPTIONS);
          updateSelectOptions("wakeUpTimeSelect", GG_WAKEUP_OPTIONS);
        }
        disabledButtonState("otherJapaDetailPopup", "japaSubmitWODBtn");
      }
    }
  } else {
    if (password) {
      IsLoading(true);
      const passwordAPIresponse = await checkPassword(password);
      IsLoading(false);
      if (!passwordAPIresponse.devName) {
        SHOW_ERROR_POPUP("Please enter a correct password");
        return false;
      } else {
        const lastRoundStatus = handleLastRoundDuringSubmit();
        if (!lastRoundStatus) {
          SHOW_ERROR_POPUP(MESSAGE_CONSTANT.noJapaChantedError);
          HidePopup(passwordPopup);
          return;
        }
        const date = new Date().toISOString();
        const lapsElements = lapsContainer.querySelectorAll("div");

        lapsElementsDiv = lapsElements;

        const laps = Array.from(lapsElements).map((div) => {
          const lapText = div.textContent.trim();
          const time24 = div.dataset.time24 || "";
          return `${lapText} - ${time24}`;
        });

        let totalRound = laps[0].split(" ")[1];

        japaApiRequest.devoteeType = passwordAPIresponse.devoteeType;
        japaApiRequest.isNKDDevotee = passwordAPIresponse.isNKDDevotee;
        japaApiRequest.date = date;
        japaApiRequest.password = password;
        japaApiRequest.devName = passwordAPIresponse.devName;
        japaApiRequest.startTimestamp = startDateDB;
        japaApiRequest.endTimestamp = endDateDB; // Send the end timestamp
        japaApiRequest.japaDuration = japaDuration;
        japaApiRequest.totalRound = totalRound;
        japaApiRequest.laps = laps;
        japaApiRequest.pauseCount = pauseCount;
        japaApiRequest.before9Round = before9RoundGbl;
        japaApiRequest.areaLeader = passwordAPIresponse.areaLeader;

        console.log(japaApiRequest);
        const response = await saveJapaDataAPI(japaApiRequest);
        let currentDay = new Date().getDay();

        if (response.status) {
          const lapTimes = lapTimesArrGbl;
          let lapsObj = calculateStats(lapTimes);
          lapsObj = {
            ...lapsObj,
            userName: passwordAPIresponse.devName,
          };
          populateStatsContainer(lapsObj);
          HidePopup(passwordPopup);
          successPopupReport.style.display = "flex"; // Show the popup
          resetTimer();
          resetPasswordWindowControl();
        } else if (!response.status && response.result == "infoNeeded") {
          if (IS_KARTIK_DATA_VISIABLE) {
            HidePopup(passwordPopup);
            ShowPopup("kartikContainer");
          } else if (currentDay === 6) {
            SHOW_SPECIFIC_DIV("saturdayContainer");
          } else if (currentDay === 0) {
            SHOW_SPECIFIC_DIV("sundayContainer");
          } else {
            ShowPopup("otherJapaDetailPopup");
            if (
              passwordAPIresponse?.devoteeType ==
              DEVOTEE_TYPE_CONSTANT.ggStudent
            ) {
              updateSelectOptions("sleepingTimeSelect", GG_SLEEP_OPTIONS);
              updateSelectOptions("wakeUpTimeSelect", GG_WAKEUP_OPTIONS);
            }
            disabledButtonState("otherJapaDetailPopup", "japaSubmitWODBtn");
          }
        }
      }
    }
  }
}

function successPopupViewReportButtonClick() {
  successPopupReport.style.display = "none"; // Hide the popup
  document.getElementById("statsPopup").style.display = "flex";
}

async function japaSubmitWODBtnClick() {
  const sleepingTimeSelectRow = GetControlValue(sleepingTimeSelect);
  const wakeUpTimeSelectRow = GetControlValue(wakeUpTimeSelect);
  const serviceTxtBoxVal = GetControlValue(serviceTxtBox);
  const tdaTxtBoxVal = GetControlValue(tdaTxtBox);
  const bdaTxtBoxVal = GetControlValue(bdaTxtBox);
  const sleepingTimeSelectVal = parseSleepWakeTimeRange(sleepingTimeSelectRow);
  const wakeUpTimeSelectVal = parseSleepWakeTimeRange(wakeUpTimeSelectRow);
  const aartisVal = populateAartiResult();

  if (Number(tdaTxtBoxVal) > 1100 || Number(bdaTxtBoxVal) > 1000) {
    SHOW_SUCCESS_POPUP(
      `Thank you for doing Srila Prabhupada's favorite service.\n\nA maximum amount of ₹2100 is allowed here.\n\nFor larger donations, please use our Donor Detail section :\n\n<span style="color: blue;">NKD Community Website → Donate.</span>`,
    );
    return;
  }

  japaApiRequest.sleepingTimeSelect = sleepingTimeSelectVal;
  japaApiRequest.wakeUpTimeSelect = wakeUpTimeSelectVal;
  japaApiRequest.aartis = aartisVal;
  japaApiRequest.serviceDuration = serviceTxtBoxVal;
  japaApiRequest.tCollAmount = tdaTxtBoxVal;
  japaApiRequest.bCollAmount = bdaTxtBoxVal;

  const response = await saveJapaDataAPI(japaApiRequest);
  if (response.status) {
    const lapTimes = lapTimesArrGbl;
    let lapsObj = calculateStats(lapTimes);
    lapsObj = {
      ...lapsObj,
      userName: japaApiRequest?.devName,
    };
    populateStatsContainer(lapsObj);
    HidePopup(passwordPopup);
    hideOtherJapaDetailPopup();
    successPopupReport.style.display = "flex"; // Show the popup
    resetTimer();
    resetPasswordWindowControl();
  } else {
    SHOW_ERROR_POPUP("Please connect with NKD Servants");
  }
}

function closeOtherJapaDetailPopup() {
  updatePauseCount();
  hideOtherJapaDetailPopup();
  HidePopup(passwordPopup);
}

//#region Method for Report
function parseTime(timeStr) {
  // Normalize input: remove variations like " s", " sec", "Sec", etc. (case-insensitive)
  timeStr = timeStr.toLowerCase().replace(/\s*(s|sec)\s*$/, "");

  // Split into minutes and seconds
  const [minutes, seconds] = timeStr.split(":").map(Number);

  return (isNaN(seconds) ? 0 : seconds) + (isNaN(minutes) ? 0 : minutes * 60);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} sec`;
}

function calculateStats(times) {
  const secondsArray = times.map((item) => parseTime(item));

  const min = Math.min(...secondsArray);
  const max = Math.max(...secondsArray);
  const avg =
    secondsArray.reduce((acc, curr) => acc + curr, 0) / secondsArray.length;
  const count = secondsArray.length;

  // Define time range in seconds
  const minTimeSec = parseTime("6:00");
  const maxTimeSec = parseTime("7:30");

  // Count times within and outside the specified range
  const greenCount = secondsArray.filter(
    (time) => time >= minTimeSec && time <= maxTimeSec,
  ).length;
  const redCount = count - greenCount;

  return {
    min: formatTime(min),
    max: formatTime(max),
    avg: formatTime(avg),
    count: count,
    greenCount: greenCount,
    redCount: redCount,
  };
}

//#endregion

function downloadReport() {
  const element = document.getElementById("reportDiv");

  // Temporarily remove max-height to show all content
  element.style.overflow = "visible";
  element.style.maxHeight = "none";

  // Introduce a small delay to ensure the content is rendered
  setTimeout(() => {
    const options = {
      margin: 1,
      filename: `Japa_report_${getFormattedDate()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Use html2pdf to capture and save the content
    html2pdf()
      .from(element)
      .set(options)
      .save()
      .finally(() => {
        // Restore original styles
        element.style.overflow = "";
        element.style.maxHeight = "";
      });
  }, 100); // Adjust delay as needed

  closeStatsPopup();
}

function getFormattedDate() {
  const today = new Date();
  const day = today.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[today.getMonth()];
  return `${day}${daySuffix(day)}${month}`;
}

function daySuffix(day) {
  if (day >= 11 && day <= 13) return "th"; // Special case for 11th, 12th, and 13th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function createReportElement(label, value) {
  const element = document.createElement("div");
  element.textContent = `${label} : ${value}`;
  return element;
}

function populateStatsContainer(stats) {
  const startTimeAMPM = formatTimeToAMPM(startTime);
  const endTimeAMPM = formatTimeToAMPM(endTimeGbl);
  const pauseCountLcl = parseInt(pauseCount);
  reportContainer.innerHTML = "";

  const elements = [
    { label: "Name", value: stats?.userName },
    { label: "Total Round", value: stats?.count },
    { label: "Start Time", value: startTimeAMPM },
    { label: "End Time", value: endTimeAMPM },
    { label: "Pause Count", value: pauseCountLcl },
    { label: "Green", value: stats?.greenCount },
    { label: "Red", value: stats?.redCount },
    { label: "Minimum Time", value: stats?.min },
    { label: "Maximum Time", value: stats?.max },
    { label: "Average Time", value: stats?.avg.substring(0, 10) },
  ];

  elements.forEach(({ label, value }) => {
    reportContainer.appendChild(createReportElement(label, value));
  });

  lapsElementsDiv.forEach((item) => {
    reportContainer.appendChild(item);
  });
}

function closeStatsPopup() {
  document.getElementById("statsPopup").style.display = "none";
  resetTimer(); // Optionally reset the timer or perform other actions
}
//#endregion

//#region Confirm popup Method

function handleConfirmYesClick() {
  confirmPopup.style.display = "none";
  resetTimer();
  resetPasswordWindowControl();
}

function handleConfirmNoClick() {
  updatePauseCount();
  startTimer(); // Resume the timer
  confirmPopup.style.display = "none";
}
//#endregion

function resetPasswordWindowControl() {
  document.getElementById(sleepingTimeSelect).selectedIndex = 0;
  document.getElementById(wakeUpTimeSelect).selectedIndex = 0;
  document.getElementById(gurvashtakamChkBox).checked = false;
  document.getElementById(narsimhaChkBox).checked = false;
  document.getElementById(tulsiChkBox).checked = false;
  document.getElementById(guruPujaChkBox).checked = false;
  document.getElementById(serviceTxtBox).value = "";
  document.getElementById(password).value = "";
  document.getElementById(tdaTxtBox).value = "";
  document.getElementById(bdaTxtBox).value = "";
}

function showSAPasswordPopup() {
  if (getUserLoginInfo()) {
    SHOW_CONFIRMATION_POPUP(
      "Do you want to check your past sadhna?",
      saPasswordPopupBtnClick,
    );
  } else {
    ShowPopup("saPasswordPopup");
  }
}

async function saPasswordPopupBtnClick() {
  ADD_OPTION_IN_YEAR_MONTH_DROPDOWN("masterMonthSelect", "masterYearSelect");
  const month = document.getElementById("masterMonthSelect").value;
  const year = document.getElementById("masterYearSelect").value;
  await showMasterReportData(month, year);
}

async function showMasterReportData(month, year) {
  if (userLoginInfoData?.devName) {
    const sadhnaReportRequest = {
      apiType: API_CONSTANT.POPULATE_REPORT_DATA_JRHM,
      password: userLoginInfoData?.password,
      sheetName: "Master",
      month: month,
      year: year,
    };
    IsLoading(true);
    fetch(GET_SADHNA_REPORT_DATA_API, {
      method: "POST",
      body: JSON.stringify(sadhnaReportRequest),
    })
      .then((responseAPI) => responseAPI.json())
      .then((response) => {
        IsLoading(false);
        if (response.status) {
          const modifiedResponse = preprocessSadhnaData(response.result);
          generateSadhnaTableRows(modifiedResponse);
          ShowPopup(saTablePopupKey);
        } else {
          alert("not saved");
        }
      });
  } else {
    const passwordValSadhnaAnalysis = GetControlValue("saPasswordPopupTxtBox")
      .toString()
      .trim()
      .toLowerCase();
    if (passwordValSadhnaAnalysis != "") {
      IsLoading(true);

      const passwordAPIresponse = await checkPassword(
        passwordValSadhnaAnalysis,
      );
      IsLoading(false);

      if (!passwordAPIresponse.devName) {
        SHOW_ERROR_POPUP(MESSAGE_CONSTANT.correctPassword);
        return false;
      } else {
        const sadhnaReportRequest = {
          apiType: API_CONSTANT.POPULATE_REPORT_DATA_JRHM,
          password: passwordValSadhnaAnalysis,
          sheetName: "Master",
          month: month,
          year: year,
        };
        IsLoading(true);
        fetch(GET_SADHNA_REPORT_DATA_API, {
          method: "POST",
          body: JSON.stringify(sadhnaReportRequest),
        })
          .then((responseAPI) => responseAPI.json())
          .then((response) => {
            IsLoading(false);
            if (response.status) {
              const modifiedResponse = preprocessSadhnaData(response.result);
              generateSadhnaTableRows(modifiedResponse);
              ShowPopup(saTablePopupKey);
            } else {
              alert("not saved");
            }
          });
      }
    } else {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.emptyPassword);
      return;
    }
  }
}

async function updateMasterSelection() {
  const month = document.getElementById("masterMonthSelect").value;
  const year = document.getElementById("masterYearSelect").value;
  await showMasterReportData(month, year);
}

function preprocessSadhnaData(data) {
  console.log("Sadhan analysis data - ", data);
  return data.map((row) => {
    return {
      Date: moment.utc(row.Date).tz("Asia/Kolkata").format("DD-MMM-YY"),
      "Sadhna Score": row["Sadhna Score"],
      Sleep: row.Sleep,
      Wakeup: row.Wakeup,
      "Total Chanting": row["Total Chanting"],
      "Before 9 AM": row["Morning Chanting"],
      "Morning Arti": row["Morning Arti"],
      Hearing: row.Hearing,
      Reading: row.Reading,
      Service: row.Service,
    };
  });
}

function generateSadhnaTableRows(data) {
  console.log("sadhna data ", data);
  const tableBody = document.getElementById("sadhna-table-body");
  const tableHead = document.getElementById("sadhna-table-header");
  // Clear any existing content
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  // Check if data is not empty
  if (data.length === 0) return;

  // Generate the table header
  const headerRow = document.createElement("tr");
  // Use the keys from the first object as headers
  const headers = Object.keys(data[0]);
  headers.forEach((headerCell) => {
    const th = document.createElement("th");
    th.textContent = headerCell;
    headerRow.appendChild(th);
  });
  tableHead.appendChild(headerRow);

  // Generate the table rows
  data.forEach((row) => {
    const tr = document.createElement("tr");
    headers.forEach((headerCell) => {
      const td = document.createElement("td");
      td.textContent = row[headerCell];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

function saTablePopupCancelClick() {
  HidePopup(saTablePopupKey);
  HidePopup(saPasswordPopupKey);
  ShowPopup("mainContainer");
}

function saPasswordPopupBtnCloseClick() {
  saTablePopupCancelClick();
}

//-----------------------------------------------------------------------------------------

function showKartikRadioResult() {
  // Get the specific parent container
  const parentContainer = document.getElementById("kartik-radio-buttons");

  // Get all the radio containers within the parent container
  const radioContainers = parentContainer.querySelectorAll(".radio-container");

  // Initialize an object to store the results
  const results = {};
  let isError = false;
  // Check if there are any radio containers
  if (radioContainers.length === 0) {
    console.warn("No radio containers found within the specified section.");
    return; // Exit if no containers found
  }

  // Loop through each radio container to find the selected option
  for (let i = 0; i < radioContainers.length; i++) {
    const container = radioContainers[i];
    const labelElement = container.querySelector(".radio-heading label");
    const questionLabel = labelElement.innerText;
    const labelFor = labelElement.getAttribute("for"); // Get the value of the 'for' attribute
    const selectedOption = container.querySelector(
      'input[type="radio"]:checked',
    );

    // Add event listener to remove border on radio button selection
    const allOptions = container.querySelectorAll('input[type="radio"]');
    allOptions.forEach((radio) => {
      radio.addEventListener("change", () => {
        container.style.border = ""; // Remove border when selected
      });
    });

    if (!selectedOption) {
      container.style.border = "1px solid red"; // Apply border properly
      //SHOW_ERROR_POPUP(questionLabel); // Call the error popup function
      isError = true;
      container.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      break; // Exit loop on the first missing selection
    } else {
      // Reset the border if previously set to red
      container.style.border = "";
      results[labelFor] = "Yes";
    }
  }

  if (!isError) {
    let currentDay = new Date().getDay();

    if (currentDay === 6) {
      SHOW_SPECIFIC_DIV("saturdayContainer");
    } else if (currentDay === 0) {
      SHOW_SPECIFIC_DIV("sundayContainer");
    } else {
      HidePopup("kartikContainer");
      ShowPopup("otherJapaDetailPopup");
      if (userLoginInfoData?.devoteeType == DEVOTEE_TYPE_CONSTANT.ggStudent) {
        updateSelectOptions("sleepingTimeSelect", GG_SLEEP_OPTIONS);
        updateSelectOptions("wakeUpTimeSelect", GG_WAKEUP_OPTIONS);
      }
      disabledButtonState("otherJapaDetailPopup", "japaSubmitWODBtn");
    }
  }
}

function showSatButtonResult() {
  SHOW_SPECIFIC_DIV("otherJapaDetailPopup");
}

function showSunButtonResult() {
  SHOW_SPECIFIC_DIV("otherJapaDetailPopup");
}

function getUserLoginInfo() {
  if (userLoginInfoData?.devName) {
    return true;
  } else {
    const storedData = localStorage.getItem("userLoginInfo");
    if (storedData) {
      userLoginInfoData = JSON.parse(storedData);
      return true;
    } else {
      return false;
    }
  }
}

// Function to update options with new values
function updateSelectOptions(selectElementId, newOptions) {
  const selectElement = document.getElementById(selectElementId);
  // Remove all current options

  selectElement.innerHTML = "";

  // Add a default "Choose Time" option
  selectElement.add(new Option("Choose Time", "", true, true));

  // Add each new option
  newOptions.forEach((option) => {
    selectElement.add(new Option(option.text, option.value));
  });

  const serviceLabel = document.querySelector("label[for='serviceTxtBox']");
  const serviceInput = document.getElementById("serviceTxtBox");

  // Remove "required" class from the label
  serviceLabel.classList.remove("required");

  // Remove the "required" attribute from the input field
  serviceInput.removeAttribute("required");
}

// Function to revert options to the original values
function revertSelectOptions(selectElementId, originalOptions) {
  const selectElement = document.getElementById(selectElementId);

  // Remove all current options
  selectElement.innerHTML = "";

  // Add the default "Choose Time" option
  selectElement.add(new Option("Choose Time", "", true, true));

  // Add each original option
  originalOptions.forEach((option) => {
    selectElement.add(new Option(option.text, option.value));
  });

  const serviceLabel = document.querySelector("label[for='serviceTxtBox']");
  const serviceInput = document.getElementById("serviceTxtBox");

  // Add "required" class back to the label
  serviceLabel.classList.add("required");

  // Add the "required" attribute back to the input field
  serviceInput.setAttribute("required", "true");
}

async function saveJapaDataAPI(request) {
  const onlineRes = await IS_ONLINE();
  if (onlineRes) {
    try {
      IsLoading(true);
      const jsonReq = JSON.stringify(request);
      const response = await axios.post(SAVE_JAPA_DATA, jsonReq);
      const data = response?.data;
      IsLoading(false); // Stop loading
      return data;
    } catch (error) {
      IsLoading(false); // Stop loading on error
      console.log(error);
      SHOW_ERROR_POPUP(error.message);
    } finally {
      IsLoading(false); // Stop loading regardless of success or error
    }
  }
}

function OpenInitialRegistration() {
  SHOW_SPECIFIC_DIV("registrationContainer");
}

function updatePasswordRefInApp(passwordAPIresponse) {
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
    userLoginInfoData = passwordAPIresponse;
    setLoginUserNameDiv(loginUser);
    localStorage.setItem("userLoginInfo", JSON.stringify(passwordResponse));

    let button = document.getElementById("initialLoginLogout");
    button.textContent = "Logout";
  } else {
    SHOW_ERROR_POPUP("Wrong Password!");
  }
}

const youtubeVideoIds = [
  "jo_sUQr9_DE",
  "mJv4oEFhshc",
  "NV6VnvCDP7U",
  "aZJSSWbxrbI",
  "tcK-g8xdumE",
  "5fDk2l0fHFk",
  "stgo98Yk8Ys",
  "kkAkmXYqnT8",
  "HPkuIYKxPhE",
  "gXzlVhL5tTc",
  "KMHdEtPltt4",
  "3QMNjajaWGQ",
  "KHdGGDwyT4c",
  "pMZtqMdGp2Q",
  "oCOsiQuY9Es",
  "uR5A3qfvbU0",
  "XrXaT3abBO8",
  "6GouuR2ehSE",
  "y6ZUCRDDD88",
  "pxCPyN3E47E",
  "w-jTC5ANesk",
  "y2cewXFcmpo",
  "wZ-N_2ViY8Y",
  "qGF0k7x6--U",
  "wU4gR9kUkfU",
  "wz8tM0-kL7A",
  "nlq07CCcuYg",
  "ih4W0VVNh_w",
  "PY3-gGScFf0",
  "bjhak9kEh6k",
  "tw6DWNceOtA",
  "MiRy-6eQJ6Q",
  "EWa8btLIA8A",
  "ZbpJdLatRNk",
  "2U4oGpLWz-8",
  "it0Hio3viXc",
  "Du-HxiertTk",
  "cWdlcbwcpMc",
  "A1x2-a89O6Y",
  "pOnMWMXtdAQ",
  "RQ1EOYPqUNM",
  "HGqwZLmJO_8",
  "B2lV2SkWUhc",
  "cLg1RNTR8qY",
  "o7_ozAh5F-I",
  "zGQ442cibLE",
  "71DGmSrqIfM",
  "kbWdyh1lN3g",
  "O7HivjUGKtc",
  "RMIvBPbJ5OE",
  "NVFr_bFZw04",
  "0wOpsL4TIYU",
  "OpEuQT5FNqo",
  "YheKDoix5Cs",
  "mSfKDPPD-yE",
  "CmSGVAez35w",
  "bSvOLKAD574",
  "Hk1ZeeLnWAY",
  "T9fJumwKWyE",
  "WHvOdQscRV0",
  "Yr6N49PwVJQ",
  "gBGtCvSs2BY",
  "ZcAvMQ5FsgA",
  "Zp0vbGhL3v0",
  "sE46V-3o8c4",
  "wT7skYfNcRY",
  "rbi1doVCacE",
  "ODPFQdwWPZM",
  "mziBudYphbI",
];

function hideShort() {
  const overlay = document.getElementById("short-overlay");
  const iframe = document.getElementById("short-frame");

  iframe.src = ""; // वीडियो बंद कर दो
  overlay.style.display = "none";
  document.body.classList.remove("short-active");
  document.getElementById("mainContainer").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("short-overlay");
  const iframe = document.getElementById("short-frame");

  overlay.style.display = "flex";
  document.body.classList.add("short-active");

  const selectedVideoId =
    youtubeVideoIds[Math.floor(Math.random() * youtubeVideoIds.length)];

  iframe.src = `https://www.youtube.com/embed/${selectedVideoId}?modestbranding=1&controls=0&rel=0`;

  const index = (rowMonth - 10 + 3) % 3;
  const videoId = cycleVideos[index];

  //document.getElementById("monthVideo").src ="https://www.youtube.com/embed/" +videoId +"?modestbranding=1&controls=0&rel=0";
});

function setUserNameOnFrontScreen(devName) {
  const loginUserDiv = document.getElementById("login-user-name-div_fp");
  const loginUserLabel = document.getElementById("login-user-name-lbl_fp");

  if (devName) {
    loginUserDiv.style.display = "block";
    loginUserLabel.innerHTML = `<strong>${devName}</strong>`;
  } else {
    loginUserDiv.style.display = "none";
    loginUserLabel.innerHTML = `<strong>${devName}</strong>`;
  }
}

function showManualJapaWindow() {
  const mantraText = document.getElementById("mantraText");
  const manualCounter = document.getElementById("manualCounter");
  const toggleBtn = document.getElementById("toggleMantraBtn");

  if (!isCounterVisible) {
    // Show counter, hide mantra
    mantraText.style.display = "none";
    manualCounter.style.display = "flex";
    toggleBtn.textContent = "Back";
    isCounterVisible = true;
  } else {
    // Hide counter, show mantra
    manualCounter.style.display = "none";
    mantraText.style.display = "block";
    toggleBtn.textContent = "Manual Japa";
    isCounterVisible = false;
  }
}

function incrementCount() {
  if (!isTimerRunning) {
    SHOW_ERROR_POPUP("Please start the timer to chant japa.");
    return;
  }

  const now = Date.now();

  // 🚫 Agar last count se 1 sec nahi hua → ignore
  if (now - lastIncrementTime < 1000) {
    return;
  }

  // ✅ Allow count
  lastIncrementTime = now;

  const display = document.getElementById("countCircle");

  if (manualJapaCount < 107) {
    manualJapaCount++;
  } else {
    manualJapaCount = 0;
    call_pauseAndShowPopup();
  }

  display.textContent = `${manualJapaCount} / 108`;

  // Small vibration feedback
  if (navigator.vibrate) {
    navigator.vibrate(70);
  }
}

async function call_openGlorificationPanel() {
  const response = await CALL_API("GET_DEVOTEE_IMAGE_DATA", {});
  if (response.status) {
    peopleData = response.result;
    console.log("peopleData", peopleData);
  }

  // peopleData is OBJECT: { name: imageId }
  Object.keys(peopleData).forEach((name) => {
    const option = document.createElement("option");

    // ✅ actual value (save ke time yahi jayega)
    option.value = name;

    // ✅ display text (UI me yahi dikhega)
    if (name === "Rukmini Jeevan Prabhuji") {
      option.textContent = "HG Rukmini Jeevan Prabhuji";
    } else if (name === "Pran Gopika Mataji") {
      option.textContent = "HG Pran Gopika Mataji";
    } else {
      option.textContent = name;
    }

    dropdown.appendChild(option);
  });

  SHOW_SPECIFIC_DIV("glorificationContainer");
}

async function showImage() {
  const selectedName = dropdown.value;
  const box = document.getElementById("imageBox");

  // Reset container
  box.innerHTML = "<span>Loading...</span>";

  if (!selectedName) {
    box.innerHTML = "<span>No Image</span>";
    return;
  }

  const fileId = peopleData[selectedName]; // direct lookup

  if (!fileId) {
    box.innerHTML = "<span>Image not found</span>";
    return;
  }

  const imgUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w500`;

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = selectedName;

  // Error handling
  img.onerror = () => {
    box.innerHTML = "<span>Image not available</span>";
  };

  // On success
  img.onload = () => {
    box.innerHTML = "";
    box.appendChild(img);
  };
  document.getElementById("glorificationAccordion").innerHTML = "";
  const data = await CALL_API_WITHOUT_LOADING(
    "GET_DEVOTEES_GLOFICIATIONS_DATA",
    {
      selectedName: selectedName,
    },
  );

  if (data.status) {
    const response = data.result;

    const modifiedGlorificationResponse = transformDevoteeResponse(response);
    console.log(modifiedGlorificationResponse);

    renderGlorificationContainer(modifiedGlorificationResponse);
  }
}

function transformDevoteeResponse(apiResponse) {
  const result = {
    "How I Came in Bhakti": [],

    "Glorification by devotees": [],
  };

  if (apiResponse.experience && apiResponse.experience.length) {
    apiResponse.experience.forEach((row, index) => {
      result["How I Came in Bhakti"].push({
        id: index + 1,

        title: `Experience ${index + 1}`,

        href: "#",

        rawData: {
          dateTime: row[0],
          name: row[2],
          message: row[3],
        },
      });
    });
  }

  if (apiResponse.glorifications && apiResponse.glorifications.length) {
    apiResponse.glorifications.forEach((row, index) => {
      result["Glorification by devotees"].push({
        id: index + 1,

        title: `By ${row[5]}`,

        href: "#",

        rawData: {
          dateTime: row[0],
          date: row[1],
          devoteeName: row[2],
          message: row[4],
          filledBy: row[5],
        },
      });
    });
  }

  return result;
}

async function handleSubmitGlorification() {
  const devoteeDropdown = document.getElementById("nameDropdown");
  const glorificationDropdown = document.getElementById("glorificationType");
  const answerTextarea = document.getElementById("answerText");
  const questionText = document.getElementById("questionText");
  const imageBox = document.getElementById("imageBox");

  const devoteeName = document.getElementById("nameDropdown").value;
  const glorificationType = document.getElementById("glorificationType").value;
  const answerText = document.getElementById("answerText").value.trim();

  if (!devoteeName) {
    SHOW_ERROR_POPUP("कृपया भक्त का नाम चुनें।");
    return;
  }

  if (!glorificationType) {
    SHOW_ERROR_POPUP("कृपया Glorification Type चुनें।");
    return;
  }

  if (!answerText) {
    SHOW_ERROR_POPUP("कृपया विवरण लिखें।");
    return;
  }

  if (answerText.length < 50) {
    SHOW_ERROR_POPUP("कृपया कम से कम 50 शब्दों में विवरण लिखें।");
    return;
  }
  const payload = {
    devoteeName,
    glorificationType,
    answerText,
    filledBy: userLoginInfoData?.devName || "Not Given",
  };

  const response = await CALL_API("SAVE_DEVOTEE_GLORIFICATION", payload);
  if (response.status) {
    devoteeDropdown.value = "";
    glorificationDropdown.value = "";
    answerTextarea.value = "";
    questionText.textContent = "";
    imageBox.innerHTML = "<span>No Image</span>";
    SHOW_SUCCESS_POPUP("सफलतापूर्वक सबमिट हो गया है। धन्यवाद!");
  }
}

function openGlorificationPanel() {
  if (getUserLoginInfo()) {
    call_openGlorificationPanel();
  } else {
    ShowPopup("gfPasswordPopup");
  }
}

async function gfPasswordPopupBtnClick() {
  const password = GetControlValue("gfPasswordPopupTxtBox");
  if (password.trim() === "") {
    SHOW_ERROR_POPUP("Please enter password");
    return;
  }
  const passwordAPIresponse = await checkPassword(password);
  if (!passwordAPIresponse.devName) {
    SHOW_ERROR_POPUP("Please enter a correct password");
    return false;
  }

  updatePasswordRefInApp(passwordAPIresponse);
  call_openGlorificationPanel();
}

function gfPasswordPopupBtnCloseClick() {
  SHOW_SPECIFIC_DIV("mainContainer");
}
