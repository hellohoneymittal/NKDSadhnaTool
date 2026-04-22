const noteTextAreaReading = "noteTextAreaReading";
const noteTextAreaHearing = "noteTextAreaHearing";
const hearingTimer = "hearingTimer";
const startPauseHearingBtn = "startPauseHearingBtn";
const hearingPasswordTxtBox = "hearingPasswordTxtBox";
const hearingContainer = "hearingContainer";
const hearingContainerPasswordPopup = "hearingContainerPasswordPopup";
const hearingContainerSuccessPopup = "hearingContainerSuccessPopup";
const hearingTextArea = "hearingTextArea";
const improvementPointsTxtBox = "improvementPointsTxtBox";
const myPrayersTxtBox = "myPrayersTxtBox";
const myGratitudeTxtBox = "myGratitudeTxtBox";
const hearingPieChartKey = "hearingPieChart";
let hearingPieChart;
const lectureByInputControl = document.getElementById("hearingLectureByTxtBox");
const topicInputControl = document.getElementById("hearingTopicTxtBox");
const notesInputControl = document.getElementById("hearingTextArea");
const improvementInputControl = document.getElementById(
  "improvementPointsTxtBox",
);
const prayersInputControl = document.getElementById("myPrayersTxtBox");
const gratitudeInputControl = document.getElementById("myGratitudeTxtBox");
let lastHearingSaveTime = Date.now();
let userLoginInfoHearingData = "";
const hearingRequestObj = {
  apiType: "",
  isNKDDevotee: "",
  date: "",
  password: "",
  name: "",
  startTimestamp: "",
  endTimestamp: "",
  duration: "",
  notes: "",
  improvementPoints: "",
  prayers: "",
  gratitude: "",
  lectureBy: "",
  topic: "",
  devoteeType: "",
};
let elapsedTimeHearing = 0;
let timerIntervalHearing;
let singleStartTimeHearing;
let isHearingTimerRunning = false;
let startTimestampHearing;
let endTimestampHearing;
let startTimeHearingAMPM;
let endTimeHearingAMPM;

// Attach the input event listener to text boxes and text areas
document
  .getElementById("hearingLectureByTxtBox")
  .addEventListener("input", handleInputChange);
document
  .getElementById("hearingTopicTxtBox")
  .addEventListener("input", handleInputChange);
document
  .getElementById("hearingTextArea")
  .addEventListener("input", handleInputChange);
document
  .getElementById("improvementPointsTxtBox")
  .addEventListener("input", handleInputChange);
document
  .getElementById("myPrayersTxtBox")
  .addEventListener("input", handleInputChange);
document
  .getElementById("myGratitudeTxtBox")
  .addEventListener("input", handleInputChange);

function getHearingUserLoginInfo() {
  const storedData = localStorage.getItem("userLoginInfo");
  if (storedData) {
    userLoginInfoHearingData = JSON.parse(storedData);
    return true;
  } else {
    return false;
  }
}

function handleInputChange(event) {
  const id = event.target.id;
  const value = event.target.value;
  localStorage.setItem(id, value); // Store the value using the element's ID as the key
}

function openHearingWindow() {
  ShowPopup(hearingContainer);
  HidePopup(mainContainer);
  restoreHearingData();
  startHearingTimer();
}

function handleStartPauseHearing() {
  if (isHearingTimerRunning) {
    pauseHearingTimer();
  } else {
    startHearingTimer();
  }
}

function startHearingTimer() {
  if (startTimestampHearing == null) {
    startTimestampHearing = Date.now();
  }
  isHearingTimerRunning = true;
  UpdateButtonLabel(startPauseHearingBtn, PAUSE_LBL);
  singleStartTimeHearing = Date.now() - elapsedTimeHearing;
  startTimeHearingAMPM = formatTimeToAMPM(startTimestampHearing);
  const timerDisplayHearing = document.getElementById(hearingTimer);
  timerIntervalHearing = setInterval(() => {
    elapsedTimeHearing = Date.now() - singleStartTimeHearing;
    timerDisplayHearing.textContent =
      timeToStringWithouMilliSecond(elapsedTimeHearing);
    saveHearingTimerState();
  }, 1000);
}

function saveHearingTimerState() {
  const now = Date.now();
  if (now - lastHearingSaveTime > 5000) {
    // Save every second
    localStorage.setItem("startTimestampHearing", startTimestampHearing);
    localStorage.setItem("elapsedTimeHearing", elapsedTimeHearing);
    localStorage.setItem("isHearingTimerRunning", isHearingTimerRunning);
    lastHearingSaveTime = now;

    if (userLoginInfoHearingData?.devName) {
      const updatedUserLoginInfoHearingData = {
        ...userLoginInfoHearingData,
        todayDateTime: getTodayDateTimeIST(),
      };

      localStorage.setItem(
        "userLoginInfo",
        JSON.stringify(updatedUserLoginInfoHearingData),
      );
    }
  }
}

function pauseHearingTimer() {
  clearInterval(timerIntervalHearing);
  UpdateButtonLabel(startPauseHearingBtn, RESUME_LBL);
  isHearingTimerRunning = false;
}

function resetHearingForm(id = "hearingContainer") {
  resetFormByFormId(id);
  resetHearingSession();
}

function backToMainScreenHearing(id) {
  backToMainScreen(id);
  pauseHearingTimer();
}

function showHearingPasswordPopup() {
  // If the timer is still running, pause it and include the current run's time
  if (isHearingTimerRunning) {
    pauseHearingTimer();
  }
  let lectureBy = GetControlValue("hearingLectureByTxtBox");
  let topic = GetControlValue("hearingTopicTxtBox");
  let notes = GetControlValue(hearingTextArea);

  if (!lectureBy) {
    startHearingTimer();
    SHOW_ERROR_POPUP(MESSAGE_CONSTANT.lectureByError);
    console.log("hare krishna");
    return;
  }
  if (!topic) {
    startHearingTimer();
    SHOW_ERROR_POPUP(MESSAGE_CONSTANT.topicError);
    return;
  }
  if (!notes) {
    startHearingTimer();
    SHOW_ERROR_POPUP(MESSAGE_CONSTANT.notesError);
    return;
  }

  if (getHearingUserLoginInfo()) {
    if (userLoginInfoHearingData?.devName)
      SHOW_CONFIRMATION_POPUP(
        "Do you want to submit your hearing notes ?",
        saveHearingData,
      );
  } else {
    ShowPopup(hearingContainerPasswordPopup);
  }
}

function closeHearingPasswordPopup() {
  HidePopup(hearingContainerPasswordPopup);
  ShowPopup(hearingContainer);
  startHearingTimer();
}

async function saveHearingData() {
  if (userLoginInfoHearingData?.devName) {
    // Store the end time at the point of submission
    endTimestampHearing = Date.now();
    endTimeHearingAMPM = formatTimeToAMPM(endTimestampHearing);
    hearingRequestObj.apiType = "SAVE_HEARING_DATA";
    hearingRequestObj.isNKDDevotee = userLoginInfoHearingData.isNKDDevotee;
    hearingRequestObj.devoteeType = userLoginInfoHearingData.devoteeType;
    hearingRequestObj.date = GET_TIME_STAMP();
    hearingRequestObj.password = userLoginInfoHearingData.password;
    hearingRequestObj.areaLeader = userLoginInfoHearingData.areaLeader;
    hearingRequestObj.name = userLoginInfoHearingData.devName;
    hearingRequestObj.startTimestamp = startTimeHearingAMPM;
    hearingRequestObj.endTimestamp = endTimeHearingAMPM;
    hearingRequestObj.duration =
      formatDurationByDurationTime(elapsedTimeHearing);
    hearingRequestObj.notes = GetControlValue(hearingTextArea);
    hearingRequestObj.lectureBy = GetControlValue("hearingLectureByTxtBox");
    hearingRequestObj.topic = GetControlValue("hearingTopicTxtBox");
    hearingRequestObj.improvementPoints = GetControlValue(
      improvementPointsTxtBox,
    );
    hearingRequestObj.prayers = GetControlValue(myPrayersTxtBox);
    hearingRequestObj.gratitude = GetControlValue(myGratitudeTxtBox);

    IsLoading(true);
    fetch(SAVE_HEARING_DATA, {
      method: "POST",
      body: JSON.stringify(hearingRequestObj),
    })
      .then((response) => response.json())
      .then((data) => {
        IsLoading(false);
        if (data.status) {
          ShowPopup(hearingContainerSuccessPopup);
          UpdateButtonLabel(startPauseHearingBtn, START_TIME_LBL);
          resetHearingForm(hearingContainer);
          resetHearingSession();
        } else {
          alert("not saved");
        }
      });
  } else {
    let hearingPassword = GetControlValue(hearingPasswordTxtBox);
    if (hearingPassword) {
      IsLoading(true);
      const passwordAPIresponse = await checkPassword(hearingPassword);
      IsLoading(false);
      if (!passwordAPIresponse.devName) {
        SHOW_ERROR_POPUP(MESSAGE_CONSTANT.correctPassword);
        return false;
      } else {
        // Store the end time at the point of submission
        endTimestampHearing = Date.now();
        endTimeHearingAMPM = formatTimeToAMPM(endTimestampHearing);
        hearingRequestObj.apiType = "SAVE_HEARING_DATA";
        hearingRequestObj.isNKDDevotee = passwordAPIresponse.isNKDDevotee;
        hearingRequestObj.devoteeType = passwordAPIresponse.devoteeType;
        hearingRequestObj.date = GET_TIME_STAMP();
        hearingRequestObj.password = hearingPassword;
        hearingRequestObj.areaLeader = passwordAPIresponse.areaLeader;
        hearingRequestObj.name = passwordAPIresponse.devName;
        hearingRequestObj.startTimestamp = startTimeHearingAMPM;
        hearingRequestObj.endTimestamp = endTimeHearingAMPM;
        hearingRequestObj.duration =
          formatDurationByDurationTime(elapsedTimeHearing);
        hearingRequestObj.notes = GetControlValue(hearingTextArea);
        hearingRequestObj.lectureBy = GetControlValue("hearingLectureByTxtBox");
        hearingRequestObj.topic = GetControlValue("hearingTopicTxtBox");
        hearingRequestObj.improvementPoints = GetControlValue(
          improvementPointsTxtBox,
        );
        hearingRequestObj.prayers = GetControlValue(myPrayersTxtBox);
        hearingRequestObj.gratitude = GetControlValue(myGratitudeTxtBox);

        IsLoading(true);
        fetch(SAVE_HEARING_DATA, {
          method: "POST",
          body: JSON.stringify(hearingRequestObj),
        })
          .then((response) => response.json())
          .then((data) => {
            IsLoading(false);
            if (data.status) {
              ShowPopup(hearingContainerSuccessPopup);
              UpdateButtonLabel(startPauseHearingBtn, START_TIME_LBL);
              resetHearingForm(hearingContainer);
              resetHearingSession();
            } else {
              alert("not saved");
            }
          });
      }
    } else {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.emptyPassword);
    }
  }
}

function closeHearingSuccessPopup() {
  HidePopup(hearingContainer);
  HidePopup(hearingContainerPasswordPopup);
  HidePopup(hearingContainerSuccessPopup);
  ShowPopup(mainContainer);
}

function resetHearingSession() {
  // Reset hearingRequestObj to default values
  hearingRequestObj.apiType = "";
  hearingRequestObj.isNKDDevotee = "";
  hearingRequestObj.devoteeType = "";
  hearingRequestObj.date = "";
  hearingRequestObj.password = "";
  hearingRequestObj.name = "";
  hearingRequestObj.startTimestamp = "";
  hearingRequestObj.endTimestamp = "";
  hearingRequestObj.duration = "";
  hearingRequestObj.notes = "";
  hearingRequestObj.improvementPoints = "";
  hearingRequestObj.prayers = "";
  hearingRequestObj.gratitude = "";

  // Reset timer-related variables
  elapsedTimeHearing = 0;
  startTimestampHearing = null;
  endTimestampHearing = null;
  startTimeHearingAMPM = null;
  endTimeHearingAMPM = null;
  singleStartTimeHearing = null;

  // Stop the timer if it's running
  if (timerIntervalHearing) {
    clearInterval(timerIntervalHearing);
  }
  isHearingTimerRunning = false;
  timerIntervalHearing = null;

  document.getElementById("hearingTimer").textContent = "00:00:00";

  localStorage.removeItem("hearingLectureByTxtBox");
  localStorage.removeItem("hearingTopicTxtBox");
  localStorage.removeItem("hearingTextArea");
  localStorage.removeItem("improvementPointsTxtBox");
  localStorage.removeItem("myPrayersTxtBox");
  localStorage.removeItem("myGratitudeTxtBox");
  localStorage.removeItem("startTimestampHearing");
  localStorage.removeItem("isHearingTimerRunning");
  localStorage.removeItem("elapsedTimeHearing");
  UpdateButtonLabel(startPauseHearingBtn, START_TIME_LBL);
}

function openHCReportPasswordPopup() {
  if (getHearingUserLoginInfo()) {
    SHOW_CONFIRMATION_POPUP(
      "Do you want to see the past hearing notes?",
      showHearingReportOnSubmit,
      hcReportPasswordPopupCancelClick,
    );
  } else {
    ShowPopup("hcReportPasswordPopup");
    pauseHearingTimer();
  }
}

function showHearingReportOnSubmit() {
  if (userLoginInfoHearingData?.devName) {
    const hearingReportRequest = {
      apiType: "GET_HEARING_REPORT_DATA_API",
      password: userLoginInfoHearingData?.password,
    };
    IsLoading(true);
    fetch(GET_HEARING_REPORT_DATA_API, {
      method: "POST",
      body: JSON.stringify(hearingReportRequest),
    })
      .then((responseAPI) => responseAPI.json())
      .then((response) => {
        IsLoading(false);
        if (response.status) {
          populateHearingAnalysisData(response.data);
          generateHearingGraphData(response.data);
        } else {
          SHOW_ERROR_POPUP(MESSAGE_CONSTANT.hearingNotSavedError);
        }
      });
  } else {
    let password = GetControlValue("hcReportPasswordTxtBox");
    password = password.toString().trim().toLowerCase();
    if (!password) {
      SHOW_ERROR_POPUP(MESSAGE_CONSTANT.emptyPassword);
      return;
    }
    IsLoading(true);
    const hearingReportRequest = {
      apiType: "GET_HEARING_REPORT_DATA_API",
      password: password,
    };
    IsLoading(true);
    fetch(GET_HEARING_REPORT_DATA_API, {
      method: "POST",
      body: JSON.stringify(hearingReportRequest),
    })
      .then((responseAPI) => responseAPI.json())
      .then((response) => {
        IsLoading(false);
        if (response.status) {
          console.log("response.data initanl data - ", response.data);
          populateHearingAnalysisData(response.data);
          generateHearingGraphData(response.data);
        } else {
          SHOW_ERROR_POPUP(MESSAGE_CONSTANT.hearingNotSavedError);
        }
      });
  }
}

function populateHearingAnalysisData(data) {
  const result = data.map((entry) => {
    const dateOnly = entry.Date.split(" ").slice(0, 3).join(" ");

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
      [dateOnly]: {
        "Start Time": startTimestamp,
        "End Time": endTimestamp,
        Duration: entry.Duration,
        Notes: entry.Notes?.trim() || "",
        "Improvement Points": entry.ImprovementPoints?.trim() || "",
        Prayers: entry.Prayers?.trim() || "",
        Gratitude: entry.Gratitude?.trim() || "",
        "Lecture By": entry.LectureBy?.trim() || "",
        Topic: entry.Topic?.trim() || "",
      },
    };
  });

  renderHearingScrollableCards(result);
  ShowPopup("hcReport");
}

function generateHearingGraphData(data) {
  const formattedData = data.reduce((acc, entry) => {
    const date = entry.Date.split(" ").slice(0, 3).join(" ");

    if (!acc[date]) {
      acc[date] = {
        Duration: 0,
        Notes: [],
        ImprovementPoints: [],
        Prayers: [],
        Gratitude: [],
        StartTimestamp: [],
        EndTimestamp: [],
        LectureBy: [],
        Topic: [],
      };
    }

    // Handle multiple time formats safely
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

    const durationInMinutes = convertDurationToMinutes(entry.Duration);
    acc[date].Duration += durationInMinutes;

    acc[date].Notes.push(entry.Notes?.trim() || "");
    acc[date].ImprovementPoints.push(entry.ImprovementPoints?.trim() || "");
    acc[date].Prayers.push(entry.Prayers?.trim() || "");
    acc[date].Gratitude.push(entry.Gratitude?.trim() || "");
    acc[date].StartTimestamp.push(startTimestamp);
    acc[date].EndTimestamp.push(endTimestamp);
    acc[date].LectureBy.push(entry.LectureBy?.trim() || "");
    acc[date].Topic.push(entry.Topic?.trim() || "");

    return acc;
  }, {});

  const result = Object.keys(formattedData).map((dateKey) => ({
    date: dateKey,
    duration: formattedData[dateKey].Duration, // total minutes per date
  }));

  generateHearingPieChart(result);
}

function renderHearingScrollableCards(data) {
  const container = document.getElementById("hcCardView");
  container.innerHTML = "";
  data.forEach((item) => {
    const date = Object.keys(item)[0];
    const details = item[date];

    // Create card div
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card-view-item");

    // Add date as header
    const dateHeader = document.createElement("h3");
    const gridFormatDate = moment
      .utc(date)
      .tz("Asia/Kolkata")
      .format("DD-MMM-YY");
    dateHeader.textContent = `Date: ${gridFormatDate}`;
    itemDiv.appendChild(dateHeader);

    // Add Notes, ImprovementPoints, Prayers, and Gratitude with bold labels
    const fields = [
      "Start Time",
      "End Time",
      "Duration",
      "Lecture By",
      "Topic",
      "Notes",
      "Improvement Points",
      "Prayers",
      "Gratitude",
    ];
    fields.forEach((field) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.innerHTML = `<span>${field}:</span> ${details[field]}`;
      itemDiv.appendChild(fieldDiv);
    });

    container.appendChild(itemDiv);
  });
}

function backToHearingScreen() {
  HidePopup("hcReportPasswordPopup");
  HidePopup("hcReport");
  resetHearingSession();
  resetFormByFormId("hearingContainer");
  ShowPopup("hearingContainer");
}

// Restore saved values for all input fields and timer
function restoreHearingData() {
  const savedLectureBy = localStorage.getItem("hearingLectureByTxtBox");
  const savedTopic = localStorage.getItem("hearingTopicTxtBox");
  const savedHearingNotes = localStorage.getItem("hearingTextArea");
  const savedImprovement = localStorage.getItem("improvementPointsTxtBox");
  const savedPrayers = localStorage.getItem("myPrayersTxtBox");
  const savedGratitue = localStorage.getItem("myGratitudeTxtBox");

  if (!savedHearingNotes) {
    resetHearingSession();
  } else {
    const savedStartTimestampHearing = localStorage.getItem(
      "startTimestampHearing",
    );
    const savedIsHearingTimerRunning = localStorage.getItem(
      "isHearingTimerRunning",
    );
    const savedElapsedTimeHearing = localStorage.getItem("elapsedTimeHearing");

    if (savedLectureBy) {
      lectureByInputControl.value = savedLectureBy;
    }
    if (savedTopic) {
      topicInputControl.value = savedTopic;
    }
    if (savedHearingNotes) {
      notesInputControl.value = savedHearingNotes;
    }
    if (savedImprovement) {
      improvementInputControl.value = savedImprovement;
    }
    if (savedPrayers) {
      prayersInputControl.value = savedPrayers;
    }
    if (savedGratitue) {
      gratitudeInputControl.value = savedGratitue;
    }

    if (savedStartTimestampHearing) {
      startTimestampHearing = savedStartTimestampHearing;
    }
    if (savedIsHearingTimerRunning) {
      isHearingTimerRunning = savedIsHearingTimerRunning;
    }
    if (savedElapsedTimeHearing) {
      elapsedTimeHearing = savedElapsedTimeHearing;
    }
  }
}

function hcReportPasswordPopupCancelClick() {
  if (userLoginInfoHearingData?.devName) {
    CLOSE_CONFIRMATION_POPUP();
  }
  HidePopup("hcReportPasswordPopup");
  HidePopup("hcReport");
  ShowPopup("hearingContainer");
  startHearingTimer();
}

function generateHearingPieChart(data) {
  const durationsArr = data.map((entry) => {
    const dateKey = Object.keys(entry)[0]; // Get the date key
    return entry[dateKey].Duration; // Return the Duration value
  });

  console.log("durationsArr - ", durationsArr);
  function categorizeCounts(data) {
    const ranges = {
      "0 - 30": 0,
      "30 - 60": 0,
      "60 - 90": 0,
      "90 - 120": 0,
      "120+": 0,
    };

    data.forEach((duration) => {
      if (duration <= 30) {
        ranges["0 - 30"]++;
      } else if (duration <= 60) {
        ranges["30 - 60"]++;
      } else if (duration <= 90) {
        ranges["60 - 90"]++;
      } else if (duration <= 120) {
        ranges["90 - 120"]++;
      } else {
        ranges["120+"]++;
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
  if (hearingPieChart) {
    hearingPieChart.destroy();
  }
  const ctx = document.getElementById(hearingPieChartKey).getContext("2d");
  hearingPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categorizedCounts),
      datasets: [
        {
          label: "Hearing Duration (Min) Percentage",
          data: Object.values(categorizedCounts),
          backgroundColor: [
            GRAPH_COLOR_CONSTANT.red,
            GRAPH_COLOR_CONSTANT.green,
            GRAPH_COLOR_CONSTANT.blue,
            GRAPH_COLOR_CONSTANT.yellow,
            GRAPH_COLOR_CONSTANT.purple,
          ],
          borderColor: [
            GRAPH_BORDER_COLOR_CONSTANT.lightRed,
            GRAPH_BORDER_COLOR_CONSTANT.lightGreen,
            GRAPH_BORDER_COLOR_CONSTANT.lightBlue,
            GRAPH_BORDER_COLOR_CONSTANT.lightYellow,
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
          text: "Distribution of Hearing Percentage (Min)",
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

function hearingResetButton() {
  SHOW_CONFIRMATION_POPUP(
    "Do you want to reset hearing notes ?",
    resetHearingForm,
  );
}
