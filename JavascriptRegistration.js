const registrationContainerPopup = "registrationContainerPopup";
const passwordReportPopup = "passwordReportPopup";
const passwordPopup = "passwordPopup";
const registrationContainerPopupSpan = "registrationContainerPopupSpan";
document
  .querySelectorAll(
    "#registrationContainer input, #registrationContainer textarea"
  )
  .forEach((element) => {
    element.addEventListener("input", () =>
      disabledButtonState("registrationContainer", "submitBtn")
    );
  });

function resetRegistrationForm(id) {
  resetFormByFormId(id);
  disabledButtonState(id, "submitBtn");
}

function ShowRegistrationPopup() {
  SHOW_SPECIFIC_DIV("registrationContainer");
  ClearDivValue(registrationContainerPopupSpan);
}

function saveNewRegistration() {
  // Get values from all input fields
  const name = document.getElementById("nameTxtBox").value;
  const mobile = document.getElementById("mobileTxtBox").value;
  const address = document.getElementById("addressTxtBox").value;
  const email = document.getElementById("emailTxtBox").value;
  const knowing = document.getElementById("knowingTxtBox").value;
  const date = new Date().toISOString();
  const password = generatePassword(name);
  const areaLeader = document.getElementById("areaLeaderSelect").value;
  if (!areaLeader) {
    SHOW_ERROR_POPUP("Please select an Area Leader.");
    return;
  }
  const formData = {
    date: date,
    name: name,
    mobile: mobile,
    address: address,
    email: email,
    knowing: knowing,
    password: password,
    areaLeader: areaLeader,
  };

  // Log values to the console
  console.log("Name:", name);
  console.log("Mobile No:", mobile);
  console.log("Address:", address);
  console.log("Email:", email);
  console.log("Introduced By:", knowing);
  IsLoading(true);
  fetch(NEW_REGISTRATION_API, {
    method: "POST",
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data response", data);
      IsLoading(false);
      if (data.status) {
        resetRegistrationForm(registrationContainer);
        document.getElementById(
          "registrationContainerPopupH2"
        ).firstChild.textContent = data.result.statusMessage;
        document.getElementById("registrationContainerPopupSpan").textContent =
          data.result.password;

        SHOW_SPECIFIC_DIV(registrationContainerPopup);
      }
    });
}
