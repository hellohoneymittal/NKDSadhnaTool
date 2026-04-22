const loadingSpinner = document.getElementById("loadingSpinner");
function generateTableRows(data) {
  const tableBody = document.getElementById("table-body");
  const tableHead = document.getElementById("japa-table-header");

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

// Async function to fetch data
async function getJapaToolReportAsync(request) {
  try {
    const response = await API_HANDLER_AXIOS(request);

    if (response) {
      return response;
    }
    return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to run on page load
async function loadReportGrid(request) {
  const japaToolReportRes = await getJapaToolReportAsync(request);
  if (japaToolReportRes) {
    const serverResponse = japaToolReportRes?.result;
    generateLapTimePieChart(serverResponse);
    const modifiedResponse = populateJapaReportData(serverResponse);
    generateTableRows(modifiedResponse);
    generateJapaChart(modifiedResponse);
    generateMalaChart(modifiedResponse);
    generateBefore9JapaChart(modifiedResponse);
  } else {
    console.error("No data received from the API.");
  }
}

// Function to convert seconds into a readable format for GreenAverageDuration (e.g., "1 min 23 sec")
function formatDurationMinSec(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes} min ${sec} sec`;
}

// Function to convert seconds into a readable format for GreenDurations (e.g., "1 hr 30 min")
function formatDurationHrMin(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hr ${minutes} min`;
}

// Function to parse duration string into seconds
function convertDurationIntoSec(duration) {
  const match = duration.match(/(\d+):(\d+)\s*(s|sec)?/i);
  if (match) {
    const minutes = parseInt(match[1], 10) || 0;
    const seconds = parseInt(match[2], 10) || 0;
    return minutes * 60 + seconds;
  }
  return 0;
}

// Function to process data
function populateJapaReportData(data) {
  const result = {};
  data.forEach((entry) => {
    const utcDate = entry.Date;
    const date = moment.utc(utcDate).tz("Asia/Kolkata").format("YYYY-MM-DD");
    let pauseCount = parseInt(entry.PauseCount) || 0;
    let totalCount = parseInt(entry.Rounds) || 0;
    let before9Count = parseInt(entry.Before9Count) || 0;

    let templeDonationAmount = parseInt(entry.TempleDonationAmount) || 0;
    let bookDistributionAmount = parseInt(entry.BookDistributionAmount) || 0;

    if (!result[date]) {
      result[date] = {
        StartTimestamp: entry.StartTimestamp,
        EndTimestamp: entry.EndTimestamp,
        RedMalaCount: 0,
        GreenMalaCount: 0,
        RedDurations: 0,
        GreenDurations: 0,
        TotalDuration: 0,
        PauseCount: 0,
        TotalCount: 0,
        Before9Count: 0,
        TempleDonationAmount: 0,
        BookDistributionAmount: 0,
        Before545Count: 0,
        GreenBefore545Count: 0,
      };
    } else {
      result[date] = {
        ...result[date],
        StartTimestamp: entry.StartTimestamp,
      };
    }

    let redCount = 0;
    let greenCount = 0;
    let redDurations = 0;
    let greenDurations = 0;
    let before545Count = 0;
    let greenBefore545Count = 0;
    let isBefore545 = false;
    // Process lap times
    for (let i = 1; i <= 36; i++) {
      const lapTime = entry[`LapTime${i}`];
      if (lapTime) {
        const durationMatch = lapTime.match(/(\d+:\d+)\s*(s|sec)?/i);
        const parts = lapTime.split("-");
        if (parts.length > 1) {
          isBefore545 = isBeforeOrEqual545(parts[3].trim());
        }
        console.log("durationMatch ", durationMatch);
        if (durationMatch) {
          const durationInSeconds = convertDurationIntoSec(durationMatch[0]);

          if (durationInSeconds >= 360 && durationInSeconds <= 450) {
            greenCount++;
            greenDurations += durationInSeconds;
            if (isBefore545) {
              greenBefore545Count++;
            }
          } else {
            redCount++;
            redDurations += durationInSeconds;
          }
          if (isBefore545) {
            before545Count++;
          }
        }
      }
    }

    result[date].RedMalaCount += redCount;
    result[date].GreenMalaCount += greenCount;
    result[date].RedDurations += redDurations;
    result[date].GreenDurations += greenDurations;
    result[date].GreenBefore545Count += greenBefore545Count;
    result[date].Before545Count += before545Count;

    result[date].TotalDuration =
      result[date].RedDurations + result[date].GreenDurations;
    result[date].PauseCount += pauseCount;
    result[date].TotalCount += totalCount;
    result[date].Before9Count += before9Count;
    result[date].TempleDonationAmount += templeDonationAmount;
    result[date].BookDistributionAmount += bookDistributionAmount;
  });

  // Convert the result to an array and calculate averages
  const resultArray = Object.keys(result).map((date) => {
    const entry = result[date];
    const redAverageDuration =
      entry.RedMalaCount > 0 ? entry.RedDurations / entry.RedMalaCount : 0;
    const greenAverageDuration =
      entry.GreenMalaCount > 0
        ? entry.GreenDurations / entry.GreenMalaCount
        : 0;

    return {
      Date: convertStringDateToDateWithoutTime(entry.StartTimestamp),
      "Start Time": convertStringDateToTime(entry.StartTimestamp),
      "End Time": convertStringDateToTime(entry.EndTimestamp),
      "Total Count": entry.TotalCount,
      "Before 9 Count": entry.Before9Count,
      "Pause Count": entry.PauseCount,
      "Japa Duration": formatDurationHrMin(entry.TotalDuration),
      "Red Mala Count": entry.RedMalaCount,
      "Green Mala Count": entry.GreenMalaCount,
      "Before 5:45 Count": entry.Before545Count,
      "Green Before 5:45 Count": entry.GreenBefore545Count,
      "Book Coll": entry.BookDistributionAmount,
      "Temple Coll": entry.TempleDonationAmount,
      //"Green Average": formatDurationMinSec(greenAverageDuration),
      //"Red Average": formatDurationMinSec(redAverageDuration),
      //"Red Durations": formatDurationHrMin(entry.RedDurations),
      //"Green Durations": formatDurationHrMin(entry.GreenDurations),
    };
  });

  return resultArray;
}

function isBeforeOrEqual545(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h < 5 || (h === 5 && m <= 45);
}
