let japaChart;
let malaChart;
let pieChart;
let lapTimePieChart;

function calculateDurationFor16Rounds(durationForCurrentRounds, currentRounds) {
  // Calculate time for 16 rounds based on the provided duration for current rounds
  return Math.floor(durationForCurrentRounds * (16 / currentRounds));
}

function generateJapaChart(data) {
  console.log("generate japa chart - ", data);
  // Prepare data for the chart
  const labels = [];
  const durationData = [];

  data.forEach((entry) => {
    const oldDate = new Date(entry["Date"]);
    const date = moment(oldDate, "DD MMM YYYY").toDate();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    labels.push(formattedDate);

    // Convert Japa duration to minutes
    const totalMinutes = convertDurationToMinutes(entry["Japa Duration"]);

    // Calculate duration for 16 rounds
    const durationFor16Rounds = calculateDurationFor16Rounds(
      totalMinutes,
      entry["Total Count"]
    );

    durationData.push(durationFor16Rounds);
  });

  const ctx = document.getElementById("japaDurationChart").getContext("2d");

  // Destroy the existing chart if it exists
  if (japaChart) {
    japaChart.destroy();
  }

  // Creating the line chart
  japaChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels, // Dates on the x-axis
      datasets: [
        {
          label: "16 Rounds Japa Duration (minutes)",
          data: durationData, // Total minutes on the y-axis
          borderColor: "rgba(0, 128, 0, 1)",
          backgroundColor: "rgba(144, 238, 144, 0.2)",
          borderWidth: 2,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "rgba(144, 238, 144, 0.2)", // Green points
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "16 Round Duration (minutes)",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

function generateMalaChart(data) {
  const labels = [];
  const redMalaData = [];
  const greenMalaData = [];

  data.forEach((entry) => {
    const oldDate = new Date(entry["Date"]);
    const date = moment(oldDate, "DD MMM YYYY").toDate();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    labels.push(formattedDate);
    redMalaData.push(entry["Red Mala Count"]);
    greenMalaData.push(entry["Green Mala Count"]);
  });

  const ctx = document.getElementById("japaMalaCountChart").getContext("2d");

  // Destroy the existing chart if it exists
  if (malaChart) {
    malaChart.destroy();
  }

  malaChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels, // Dates on the x-axis
      datasets: [
        {
          label: "Red Mala",
          data: redMalaData, // Red Mala counts
          backgroundColor: COLOR_CONSTANT.red, // Green color
          //borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Green Mala",
          data: greenMalaData, // Green Mala counts
          backgroundColor: COLOR_CONSTANT.green,
          //borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Mala Count",
          },
        },
      },
    },
  });
}

function generateBefore9JapaChart(data) {
  function categorizeCounts(data) {
    const counts = {
      0: 0,
      "1-5": 0,
      "6-10": 0,
      "11-15": 0,
      "16+": 0,
    };

    data.forEach((entry) => {
      const count = entry["Before 9 Count"];
      if (count === 0) counts["0"]++;
      else if (count >= 1 && count <= 5) counts["1-5"]++;
      else if (count >= 6 && count <= 10) counts["6-10"]++;
      else if (count >= 11 && count <= 15) counts["11-15"]++;
      else counts["16+"]++;
    });

    const totalCount = data.length;
    Object.keys(counts).forEach((key) => {
      counts[key] = ((counts[key] / totalCount) * 100).toFixed(2);
    });

    return counts;
  }

  const categorizedCounts = categorizeCounts(data);

  // Create the pie chart

  // Destroy the existing chart if it exists
  if (pieChart) {
    pieChart.destroy();
  }
  const ctx = document.getElementById("japaPieChart").getContext("2d");
  pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categorizedCounts),
      datasets: [
        {
          label: "Before 9 Percentage",
          data: Object.values(categorizedCounts),
          backgroundColor: [
            "rgba(255, 0, 0, 1)", // 0 - Bright Red
            "rgba(128, 0, 255, 1)", // 1-5 - Vibrant Purple
            "rgba(0, 122, 255, 1)", // 6-10 - Striking Blue
            "rgba(255, 215, 0, 1)", // 11-15 - Shiny Gold
            "rgba(0, 128, 0, 1)", // 16+ - Dark Green
          ],
          borderColor: [
            "rgba(255, 0, 0, 0.5)", // Light Red
            "rgba(128, 0, 255, 0.5)", // Light Purple
            "rgba(0, 122, 255, 0.5)", // Light Blue
            "rgba(255, 215, 0, 0.5)", // Light Gold
            "rgba(0, 128, 0, 0.5)", // Light Green
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
          text: "Distribution of Before 9 Percentage",
        },
        datalabels: {
          anchor: "center", // Position inside the pie chart
          align: "center", // Align in the center of the segment
          formatter: (value, context) => {
            return value > 0 ? `${value}%` : "";
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

function generateLapTimePieChart(data) {
  function categorizeLapTimes(data) {
    const categories = {
      "< 6 Min": 0,
      "6-6:30 Min": 0,
      "6:30-7 Min": 0,
      "> 7:30 Min": 0,
      "7-7:30 Min": 0,
    };

    let totalLaps = 0;

    data.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (key.startsWith("LapTime")) {
          const lapTimeText = entry[key];
          if (!lapTimeText) return;

          // Extract time in minutes from the lap time string
          const timeMatch = lapTimeText.match(/\d+:\d+/);
          if (!timeMatch) return;

          const [minutes, seconds] = timeMatch[0].split(":").map(Number);
          const totalTime = minutes + seconds / 60;

          totalLaps++;

          // Categorize the lap time
          if (totalTime < 6) categories["< 6 Min"]++;
          else if (totalTime >= 6 && totalTime < 6.5)
            categories["6-6:30 Min"]++;
          else if (totalTime >= 6.5 && totalTime < 7)
            categories["6:30-7 Min"]++;
          else if (totalTime >= 7 && totalTime < 7.5)
            categories["7-7:30 Min"]++;
          else if (totalTime >= 7.5) categories["> 7:30 Min"]++;
        }
      });
    });

    // Convert counts to percentages
    Object.keys(categories).forEach((key) => {
      categories[key] = ((categories[key] / totalLaps) * 100).toFixed(2);
    });

    return categories;
  }

  const categorizedLapTimes = categorizeLapTimes(data);

  // Destroy the existing chart if it exists
  if (lapTimePieChart) {
    lapTimePieChart.destroy();
  }

  // Create the pie chart
  const ctx = document.getElementById("japaLapTimePieChart").getContext("2d");
  lapTimePieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categorizedLapTimes),
      datasets: [
        {
          label: "Lap Time Distribution",
          data: Object.values(categorizedLapTimes),
          backgroundColor: [
            GRAPH_COLOR_CONSTANT.red,
            GRAPH_COLOR_CONSTANT.yellowGreenSolid,
            GRAPH_COLOR_CONSTANT.green,
            GRAPH_COLOR_CONSTANT.darkRed,
            GRAPH_COLOR_CONSTANT.limeGreenSolid,
          ],
          borderColor: [
            GRAPH_BORDER_COLOR_CONSTANT.lightRed,
            GRAPH_BORDER_COLOR_CONSTANT.yellowGreenLight,
            GRAPH_BORDER_COLOR_CONSTANT.lightGreen,
            GRAPH_BORDER_COLOR_CONSTANT.lightDarkRed,
            GRAPH_BORDER_COLOR_CONSTANT.limeGreenLight,
          ],
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      cutout: "40%",
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 10,
            font: {
              size: 14,
              style: "bold",
            },
          },
        },
        title: {
          display: true,
          text: "Distribution of Lap Times",
        },
        datalabels: {
          anchor: "center",
          align: "center",
          rotation: 270, // Rotates the text by 90 degrees
          formatter: (value) => {
            return value > 0 ? `${value}%` : "";
          },
          font: {
            weight: "bold",
            size: 10,
          },
          color: "#fff",
        },
      },
      layout: {
        padding: {
          top: 5,
          bottom: 5,
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}
