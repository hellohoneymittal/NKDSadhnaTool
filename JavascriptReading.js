let readingPieChart;
const readingPieChartKey = "readingPieChart";
const readingTimer = "readingTimer";
const startPauseReadingBtn = "startPauseReadingBtn";
const readingPasswordTxtBox = "readingPasswordTxtBox";
const readingContainer = "readingContainer";
const readingContainerPasswordPopup = "readingContainerPasswordPopup";
const readingContainerSuccessPopup = "readingContainerSuccessPopup";
const readingTextArea = "readingTextArea";
const readingBookNameTxtBox = "readingBookNameTxtBox";
const bookNameInput = document.getElementById(readingBookNameTxtBox);
const notesTextarea = document.getElementById(readingTextArea);
let lastReadingSaveTime = Date.now();
let userLoginInfoReadingData = "";

const readingRequestObj = {
  apiType: "",
  isNKDDevotee: "",
  date: "",
  password: "",
  name: "",
  startTimestamp: "",
  endTimestamp: "",
  duration: "",
  notes: "",
  bookName: "",
  devoteeType: "",
};
let elapsedTimeReading = 0;
let timerIntervalReading;
let singleStartTimeReading;
let isReadingTimerRunning = false;
let startTimeReadingAMPM;
let endTimeReadingAMPM;
let startTimestampReading;
let endTimestampReading;

// Event listeners to save the updated values in real-time
bookNameInput.addEventListener("input", saveReadingDataOnChange);
notesTextarea.addEventListener("input", saveReadingDataOnChange);

// Function to save the current values to localStorage
function saveReadingDataOnChange() {
  const bookName = bookNameInput.value;
  const notes = notesTextarea.value;

  localStorage.setItem("readingBookName", bookName);
  localStorage.setItem("readingNotes", notes);
}

function getReadingUserLoginInfo() {
  const storedData = localStorage.getItem("userLoginInfo");
  if (storedData) {
    userLoginInfoReadingData = JSON.parse(storedData);
    return true;
  } else {
    return false;
  }
}

function restoreReadingData() {
  const savedBookName = localStorage.getItem("readingBookName");
  const savedNotes = localStorage.getItem("readingNotes");
  const savedStartTimestampReading = localStorage.getItem(
    "startTimestampReading",
  );
  const savedIsReadingTimerRunning = localStorage.getItem(
    "isReadingTimerRunning",
  );

  if (!savedNotes) {
    resetReadingSession();
  } else {
    const savedElapsedTimeReading = localStorage.getItem("elapsedTimeReading");

    if (savedBookName) {
      bookNameInput.value = savedBookName;
    }

    if (savedNotes) {
      notesTextarea.value = savedNotes;
    }

    if (savedStartTimestampReading) {
      startTimestampReading = savedStartTimestampReading;
    }
    if (savedIsReadingTimerRunning) {
      isReadingTimerRunning = savedIsReadingTimerRunning;
    }
    if (savedElapsedTimeReading) {
      elapsedTimeReading = savedElapsedTimeReading;
    }
  }
}

function openReadingWindow() {
  ShowPopup(readingContainer);
  HidePopup(mainContainer);
  restoreReadingData();
  startReadingTimer();
}

function handleStartPauseReading() {
  if (isReadingTimerRunning) {
    pauseReadingTimer();
  } else {
    startReadingTimer();
  }
}

function startReadingTimer() {
  if (startTimestampReading == null) {
    startTimestampReading = Date.now();
  }
  startTimeReadingAMPM = formatTimeToAMPM(startTimestampReading);
  isReadingTimerRunning = true;
  UpdateButtonLabel(startPauseReadingBtn, PAUSE_LBL);
  singleStartTimeReading = Date.now() - elapsedTimeReading;
  const timerDisplayReading = document.getElementById(readingTimer);

  timerIntervalReading = setInterval(() => {
    elapsedTimeReading = Date.now() - singleStartTimeReading;
    timerDisplayReading.textContent =
      timeToStringWithouMilliSecond(elapsedTimeReading);
    saveReadingTimerState();
  }, 1000);
}

function saveReadingTimerState() {
  const now = Date.now();
  if (now - lastReadingSaveTime > 3000) {
    localStorage.setItem("startTimestampReading", startTimestampReading);
    localStorage.setItem("isReadingTimerRunning", isReadingTimerRunning);
    localStorage.setItem("elapsedTimeReading", elapsedTimeReading);
    lastReadingSaveTime = now;

    if (userLoginInfoReadingData?.devName) {
      const updatedUserLoginInfoReadingData = {
        ...userLoginInfoReadingData,
        todayDateTime: getTodayDateTimeIST(),
      };

      localStorage.setItem(
        "userLoginInfo",
        JSON.stringify(updatedUserLoginInfoReadingData),
      );
    }
  }
}

function pauseReadingTimer() {
  clearInterval(timerIntervalReading);
  UpdateButtonLabel(startPauseReadingBtn, RESUME_LBL);
  isReadingTimerRunning = false;
}

function resetReadingForm(id = "readingContainer") {
  resetFormByFormId(id);
  resetReadingSession();
}

function backToMainScreenReading(id) {
  backToMainScreen(id);
  pauseReadingTimer();
}

function showReadingPasswordPopup() {
  // If the timer is still running, pause it and include the current run's time
  if (isReadingTimerRunning) {
    pauseReadingTimer();
  }

  let notes = GetControlValue(readingTextArea);
  let bookName = GetControlValue("readingBookNameTxtBox");

  if (!bookName) {
    startReadingTimer();
    SHOW_ERROR_POPUP(MESSAGE_CONSTANT.bookNameError);
    return;
  }
  if (!notes) {
    startReadingTimer();
    SHOW_ERROR_POPUP(MESSAGE_CONSTANT.notesError);
    return;
  }

  if (getReadingUserLoginInfo()) {
    SHOW_CONFIRMATION_POPUP(
      "Do you want to submit your reading notes ?",
      saveReadingData,
    );
  } else {
    ShowPopup(readingContainerPasswordPopup);
  }
}

function closeReadingPasswordPopup() {
  HidePopup(readingContainerPasswordPopup);
  ShowPopup(readingContainer);
  startReadingTimer();
}

async function saveReadingData() {
  if (userLoginInfoReadingData?.devName) {
    endTimestampReading = Date.now();
    endTimeReadingAMPM = formatTimeToAMPM(endTimestampReading);
    readingRequestObj.apiType = "SAVE_READING_DATA";
    readingRequestObj.isNKDDevotee = userLoginInfoReadingData.isNKDDevotee;
    readingRequestObj.devoteeType = userLoginInfoReadingData.devoteeType;
    readingRequestObj.date = GET_TIME_STAMP();
    readingRequestObj.password = userLoginInfoReadingData.password;
    readingRequestObj.areaLeader = userLoginInfoReadingData.areaLeader;
    readingRequestObj.name = userLoginInfoReadingData.devName;
    readingRequestObj.startTimestamp = startTimeReadingAMPM;
    readingRequestObj.endTimestamp = endTimeReadingAMPM;
    readingRequestObj.duration =
      formatDurationByDurationTime(elapsedTimeReading);
    readingRequestObj.notes = GetControlValue(readingTextArea);
    readingRequestObj.bookName = GetControlValue("readingBookNameTxtBox")
      .toString()
      .trim();

    IsLoading(true);
    fetch(SAVE_READING_DATA, {
      method: "POST",
      body: JSON.stringify(readingRequestObj),
    })
      .then((response) => response.json())
      .then((data) => {
        IsLoading(false);
        if (data.status) {
          ShowPopup(readingContainerSuccessPopup);
          resetReadingForm(readingContainer);
          UpdateButtonLabel(startPauseReadingBtn, START_TIME_LBL);
          resetReadingSession();
        } else {
          alert("not saved");
        }
      })
      .catch((ex) => {
        console.log("Error - ", ex);
        IsLoading(false);
      });
  } else {
    let readingPassword = GetControlValue(readingPasswordTxtBox);
    if (readingPassword) {
      IsLoading(true);
      const passwordAPIresponse = await checkPassword(readingPassword);
      IsLoading(false);
      if (!passwordAPIresponse.devName) {
        SHOW_ERROR_POPUP(MESSAGE_CONSTANT.correctPassword);
        return false;
      } else {
        // Store the end time at the point of submission
        endTimestampReading = Date.now();
        endTimeReadingAMPM = formatTimeToAMPM(endTimestampReading);
        readingRequestObj.apiType = "SAVE_READING_DATA";
        readingRequestObj.isNKDDevotee = passwordAPIresponse.isNKDDevotee;
        readingRequestObj.devoteeType = passwordAPIresponse.devoteeType;
        readingRequestObj.date = GET_TIME_STAMP();
        readingRequestObj.password = readingPassword;
        readingRequestObj.areaLeader = passwordAPIresponse.areaLeader;
        readingRequestObj.name = passwordAPIresponse.devName;
        readingRequestObj.startTimestamp = startTimeReadingAMPM;
        readingRequestObj.endTimestamp = endTimeReadingAMPM;
        readingRequestObj.duration =
          formatDurationByDurationTime(elapsedTimeReading);
        readingRequestObj.notes = GetControlValue(readingTextArea);
        readingRequestObj.bookName = GetControlValue("readingBookNameTxtBox")
          .toString()
          .trim();

        IsLoading(true);
        fetch(SAVE_READING_DATA, {
          method: "POST",
          body: JSON.stringify(readingRequestObj),
        })
          .then((response) => response.json())
          .then((data) => {
            IsLoading(false);
            if (data.status) {
              ShowPopup(readingContainerSuccessPopup);
              resetReadingForm(readingContainer);
              UpdateButtonLabel(startPauseReadingBtn, START_TIME_LBL);
              resetReadingSession();
            } else {
              alert("not saved");
            }
          })
          .catch((ex) => {
            console.log("Error - ", ex);
            IsLoading(false);
          });
      }
    } else {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.emptyPassword);
      return;
    }
  }
}

function closeReadingSuccessPopup() {
  HidePopup(readingContainer);
  HidePopup(readingContainerPasswordPopup);
  HidePopup(readingContainerSuccessPopup);
  ShowPopup(mainContainer);
}

function resetReadingSession() {
  // Reset readingRequestObj to default values
  readingRequestObj.apiType = "";
  readingRequestObj.isNKDDevotee = "";
  readingRequestObj.devoteeType = "";
  readingRequestObj.date = "";
  readingRequestObj.password = "";
  readingRequestObj.name = "";
  readingRequestObj.startTimestamp = "";
  readingRequestObj.endTimestamp = "";
  readingRequestObj.duration = "";
  readingRequestObj.notes = "";
  readingRequestObj.bookName = "";

  // Reset timer-related variables
  elapsedTimeReading = 0;

  startTimestampReading = null;
  endTimestampReading = null;
  startTimeReadingAMPM = null;
  endTimeReadingAMPM = null;
  singleStartTimeReading = null;

  // Stop the timer if it's running
  if (timerIntervalReading) {
    clearInterval(timerIntervalReading);
  }
  isReadingTimerRunning = false;
  timerIntervalReading = null;

  document.getElementById("readingTimer").textContent = "00:00:00";

  localStorage.removeItem("readingBookName");
  localStorage.removeItem("readingNotes");
  localStorage.removeItem("startTimestampReading");
  localStorage.removeItem("isReadingTimerRunning");
  localStorage.removeItem("elapsedTimeReading");
  UpdateButtonLabel(startPauseReadingBtn, START_TIME_LBL);
}

function openRCReportPasswordPopup() {
  if (getReadingUserLoginInfo()) {
    SHOW_CONFIRMATION_POPUP(
      "Do you want to show your past reading notes ?",
      showReadingReportOnSubmit,
      rcReportPasswordPopupCancelClick,
    );
  } else {
    pauseReadingTimer();
    ShowPopup("rcReportPasswordPopup");
  }
}

function showReadingReportOnSubmit() {
  if (userLoginInfoReadingData?.devName) {
    const readingReportRequest = {
      apiType: "GET_READING_REPORT_DATA_API",
      password: userLoginInfoReadingData?.password,
    };
    IsLoading(true);
    fetch(GET_READING_REPORT_DATA_API, {
      method: "POST",
      body: JSON.stringify(readingReportRequest),
    })
      .then((responseAPI) => responseAPI.json())
      .then((response) => {
        IsLoading(false);
        if (response.status) {
          populateReadingAnalysisData(response.data);
          generateReadingGraphData(response.data);
        } else {
          alert("not saved");
        }
      });
  } else {
    let password = GetControlValue("rcReportPasswordTxtBox");
    password = password.toString().trim().toLowerCase();
    if (!password) {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.emptyPassword);
      return;
    }
    const readingReportRequest = {
      apiType: "GET_READING_REPORT_DATA_API",
      password: password,
    };
    IsLoading(true);
    fetch(GET_READING_REPORT_DATA_API, {
      method: "POST",
      body: JSON.stringify(readingReportRequest),
    })
      .then((responseAPI) => responseAPI.json())
      .then((response) => {
        IsLoading(false);
        if (response.status) {
          console.log("response.data initanl data - ", response.data);
          populateReadingAnalysisData(response.data);
          generateReadingGraphData(response.data);
        } else {
          alert("not saved");
        }
      });
  }
}

function populateReadingAnalysisData(data) {
  const result = data.map((entry) => {
    const dateTime = entry.Date; // full timestamp as key

    const startTimestamp = moment(entry.StartTimestamp, [
      "h:mm A",
      "h:mm:ss A",
      "HH:mm:ss A",
    ]).format("h:mm A");

    const endTimestamp = moment(entry.EndTimestamp, [
      "h:mm A",
      "h:mm:ss A",
      "HH:mm:ss A",
    ]).format("h:mm A");

    return {
      [dateTime]: {
        Duration: entry.Duration,
        Notes: entry.Notes?.trim() || "",
        "Start Time": startTimestamp,
        "End Time": endTimestamp,
        "Book Name": entry.BookName?.trim() || "",
      },
    };
  });

  renderReadingScrollableCards(result);
  ShowPopup("rcReport");
}

function renderReadingScrollableCards(data) {
  const container = document.getElementById("rcCardView");
  container.innerHTML = "";
  data.forEach((item) => {
    const date = Object.keys(item)[0];
    const gridFormatDate = moment
      .utc(date)
      .tz("Asia/Kolkata")
      .format("DD-MMM-YY");
    console.log("date -", date);
    const details = item[date];

    // Create card div
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card-view-item");

    // Add date as header
    const dateHeader = document.createElement("h3");
    dateHeader.textContent = `Date: ${gridFormatDate}`;
    itemDiv.appendChild(dateHeader);

    // Add Notes, ImprovementPoints, Prayers, and Gratitude with bold labels
    const fields = ["Start Time", "End Time", "Duration", "Book Name", "Notes"];
    fields.forEach((field) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.innerHTML = `<span>${field}:</span> ${details[field]}`;
      itemDiv.appendChild(fieldDiv);
    });

    container.appendChild(itemDiv);
  });
}

function backToReadingScreen() {
  HidePopup("rcReportPasswordPopup");
  HidePopup("rcReport");
  ShowPopup("readingContainer");
  resetFormByFormId("readingContainer");
  resetReadingSession();
}

function rcReportPasswordPopupCancelClick() {
  if (userLoginInfoReadingData?.devName) {
    CLOSE_CONFIRMATION_POPUP();
  }
  HidePopup("rcReportPasswordPopup");
  HidePopup("rcReport");
  ShowPopup("readingContainer");
  startReadingTimer();
}

function generateReadingGraphData(data) {
  const result = data.map((entry) => {
    // Format start & end time safely
    const startTimestamp = moment(entry.StartTimestamp, [
      "h:mm A",
      "h:mm:ss A",
      "HH:mm:ss A",
    ]).format("h:mm A");

    const endTimestamp = moment(entry.EndTimestamp, [
      "h:mm A",
      "h:mm:ss A",
      "HH:mm:ss A",
    ]).format("h:mm A");

    // Convert duration to minutes if needed
    const durationInMinutes = convertDurationToMinutes(entry.Duration);

    return {
      timestamp: entry.Date, // full timestamp
      duration: durationInMinutes,
      notes: entry.Notes?.trim() || "",
      startTime: startTimestamp,
      endTime: endTimestamp,
      bookName: entry.BookName?.trim() || "",
    };
  });

  generateReadingPieChart(result);
}

function generateReadingPieChart(data) {
  console.log("data reading- ", data);
  const durationsArr = data.map((entry) => {
    const dateKey = Object.keys(entry)[0]; // Get the date key
    return entry[dateKey].Duration; // Return the Duration value
  });

  console.log("durationsArr - ", durationsArr);
  function categorizeCounts(data) {
    const ranges = {
      "0 - 10": 0,
      "10 - 20": 0,
      "20 - 30": 0,
      "30 - 50": 0,
      "50+": 0,
    };

    data.forEach((duration) => {
      if (duration <= 10) {
        ranges["0 - 10"]++;
      } else if (duration <= 20) {
        ranges["10 - 20"]++;
      } else if (duration <= 30) {
        ranges["20 - 30"]++;
      } else if (duration <= 50) {
        ranges["30 - 50"]++;
      } else {
        ranges["50+"]++;
      }
    });

    const totalHDLen = data.length;
    Object.keys(ranges).forEach((key) => {
      ranges[key] = ((ranges[key] / totalHDLen) * 100).toFixed(2);
    });

    return ranges;
  }

  const categorizedCounts = categorizeCounts(durationsArr);

  // Create the pie chart

  // Destroy the existing chart if it exists
  if (readingPieChart) {
    readingPieChart.destroy();
  }
  const ctx = document.getElementById(readingPieChartKey).getContext("2d");
  readingPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categorizedCounts),
      datasets: [
        {
          label: "Reading Duration (Min) Percentage",
          data: Object.values(categorizedCounts),
          backgroundColor: [
            GRAPH_COLOR_CONSTANT.red,
            GRAPH_COLOR_CONSTANT.yellow,
            GRAPH_COLOR_CONSTANT.green,
            GRAPH_COLOR_CONSTANT.blue,
            GRAPH_COLOR_CONSTANT.purple,
          ],
          borderColor: [
            GRAPH_BORDER_COLOR_CONSTANT.lightRed,
            GRAPH_BORDER_COLOR_CONSTANT.lightYellow,
            GRAPH_BORDER_COLOR_CONSTANT.lightGreen,
            GRAPH_BORDER_COLOR_CONSTANT.lightBlue,
            GRAPH_BORDER_COLOR_CONSTANT.lightPurple,
          ],
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 10, // Box size to make space for text
            font: {
              size: 14,
              style: "bold", // Make the labels bold
            },
          },
        },
        title: {
          display: true,
          text: "Distribution of Reading Percentage (Min)",
        },
        datalabels: {
          anchor: "center", // Position inside the pie chart
          align: "center", // Align in the center of the segment
          formatter: (value, context) => {
            return value > 0 ? `${value}%` : ""; // Show only non-zero values
          },
          font: {
            weight: "bold", // Bold the data labels
            size: 10, // Increase font size for better visibility
          },
          color: "#fff", // Make the labels white for contrast
        },
      },
      layout: {
        padding: {
          top: 5, // Reduce padding on the top
          bottom: 5, // Add padding on the bottom to avoid overlap with the chart
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

function readingResetButton() {
  SHOW_CONFIRMATION_POPUP(
    "Do you want to reset reading notes ?",
    resetReadingForm,
  );
}
