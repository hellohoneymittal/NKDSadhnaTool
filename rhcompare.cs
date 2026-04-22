function saveReadingTimerState() {
  const now = Date.now();
  if (now - lastReadingSaveTime > 5000) {
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
        JSON.stringify(updatedUserLoginInfoReadingData)
      );
    }
  }
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
        JSON.stringify(updatedUserLoginInfoHearingData)
      );
    }
  }
}