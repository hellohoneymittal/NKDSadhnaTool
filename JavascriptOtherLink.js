let pendingMCQResponse = {};
let smallBookResponse = {};
let bgBookResponse = {};
let bgLecureResponse = {};
let bgLecureMCQResult = {};
let bhagavatamResponse = {};
let otherLecturesResponse = {};
let chaitanyaBhagavataResponse = {};
let brihadBhagavataResponse = {};
let otherListPasswordValue = "";
let selectedKey = 0;
const otherLinkData = {
  "Current Month Pending MCQ": [
    {
      id: -1,
      title: "Current Month Pending MCQ",
      href: "#",
    },
  ],
  "Small books MCQ": [
    {
      id: 2,
      title: "Small Books MCQ",
      href: "#",
    },
    {
      id: 3,
      title: "Small Books MCQ Results",
      href: "#",
    },
  ],

  "Bhagavad Gita Lecture MCQ": [
    {
      id: 5,
      href: "#",
      title: "Bhagavad Gita MCQ",
    },
    {
      id: 6,
      href: "#",
      title: "Bhagavad Gita MCQ Results",
    },
  ],

  "Shrimad Bhagavatam Lecture MCQ": [
    {
      id: 8,
      href: "#",
      title: "Shrimad Bhagavatam MCQ",
    },
    {
      id: 9,
      href: "#",
      title: "Shrimad Bhagavatam MCQ Result",
    },
  ],
  "Chaitanya Bhagavata Lecture MCQ": [
    {
      id: 11,
      href: "#",
      title: "Chaitanya Bhagavata MCQ",
    },
    {
      id: 12,
      href: "#",
      title: "Chaitanya Bhagavata MCQ Result",
    },
  ],

  "Bhagavad Gita Book MCQ": [
    {
      id: 14,
      href: "#",
      title: "Bhagavad Gita Book MCQ",
    },
    {
      id: 15,
      href: "#",
      title: "Bhagavad Gita Book MCQ Results",
    },
  ],
  "Other Lectures MCQ": [
    {
      id: 17,
      href: "#",
      title: "Other Lectures MCQ",
    },
    {
      id: 18,
      href: "#",
      title: "Other Lectures MCQ Result",
    },
  ],

  "Brihad Bhagavatam Lecture MCQ": [
    {
      id: 20,
      href: "#",
      title: "Brihad Bhagavatam MCQ",
    },
    {
      id: 21,
      href: "#",
      title: "Brihad Bhagavatam MCQ Result",
    },
  ],
};

async function openOtherLinkWindow() {
  const onlineRes = await IS_ONLINE();
  if (onlineRes) {
    SHOW_SPECIFIC_DIV("otherLinkContianer");

    const otherLinkAccordionContainer =
      document.getElementById("otherLinkAccordion");
    otherLinkAccordionContainer.innerHTML = "";

    for (const [title, data] of Object.entries(otherLinkData)) {
      CREATE_ACCORDIAN_ITEM_WITH_LINKS(
        "otherLinkAccordion",
        0,
        { title, data },
        onBookLinkItemClick,
      );
    }

    smallBookResponse = await CALL_API_WITHOUT_LOADING(
      "GET_ALL_SMALL_BOOK_MCQ",
      {},
    );
  }
}

function clearOtherLinkData() {
  SHOW_SPECIFIC_DIV("mainContainer");
}

function CREATE_ACCORDIAN_ITEM_WITH_LINKS(
  accordionContainerId,
  parentId,
  item,
  callback,
) {
  const accordionContainer = document.getElementById(accordionContainerId);
  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");

  const header = document.createElement("button");
  header.classList.add("accordion-header");
  header.innerHTML = `${item.title} <span class="icon">▼</span>`;

  if (item?.data[0]?.id === -1) {
    header.classList.add("highlight-purple");
  }

  const content = document.createElement("div");
  content.classList.add("accordion-content");

  // Check if links exist in the provided item
  if (item.data) {
    // Iterate over the links directly from the item object
    item.data.forEach((linkData) => {
      const link = document.createElement("a");
      link.href = linkData.href || "#"; // Default href to "#" if not provided
      link.textContent = linkData.title; // Set the link's text to the title

      // Add a click event listener for each link
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        callback(linkData.id, parentId, item.title, linkData.title); // Execute the callback with the title and link text
      });

      content.appendChild(link);
    });
  } else if (item.content) {
    content.innerHTML = `<p>${item.content}</p>`; // If content exists, just append it
  }

  // Toggle the accordion section on click
  header.addEventListener("click", function () {
    const isOpen = content.style.display === "block";
    document.querySelectorAll(".accordion-content").forEach((item) => {
      item.style.display = "none";
    });
    document.querySelectorAll(".accordion-header").forEach((item) => {
      item.classList.remove("active");
    });

    if (!isOpen) {
      content.style.display = "block";
      header.classList.add("active");
    }
  });

  accordionItem.appendChild(header);
  accordionItem.appendChild(content);
  accordionContainer.appendChild(accordionItem);
}

async function onBookLinkItemClick(id, parentId, headlingTitle, bookTitle) {
  const key = parseInt(id);
  selectedKey = key;
  document.getElementById("mcqHeadling").innerText = headlingTitle;
  switch (key) {
    case -1: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        onPendingMCQButtonClick();
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    case 2: {
      const childContainer = document.getElementById("otherLinkChildAccordion");
      childContainer.innerHTML = "";

      if (smallBookResponse?.result) {
        console.log("data ", smallBookResponse?.result);
        childContainer.style.display = "block";
        SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
        for (const [title, data] of Object.entries(smallBookResponse?.result)) {
          CREATE_ACCORDIAN_ITEM_WITH_LINKS(
            "otherLinkChildAccordion",
            key,
            { title, data },
            onBookChapterClick,
          );
        }
      } else {
        SHOW_SUCCESS_POPUP(
          "Please wait for 5 seconds, data is being prepared.",
        );
      }
      break;
    }

    case 5: {
      bgLecureResponse = await CALL_API("GET_ALL_BG_MCQ", {});

      const childContainer = document.getElementById("otherLinkChildAccordion");
      childContainer.innerHTML = "";

      if (bgLecureResponse?.result) {
        console.log("data ", bgLecureResponse?.result);
        childContainer.style.display = "block";
        SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
        for (const [title, data] of Object.entries(bgLecureResponse?.result)) {
          CREATE_ACCORDIAN_ITEM_WITH_LINKS(
            "otherLinkChildAccordion",
            key,
            { title, data },
            onBookChapterClick,
          );
        }
      } else {
        SHOW_SUCCESS_POPUP(
          "Please wait for 5 seconds, data is being prepared.",
        );
      }
      break;
    }

    //for Bhagavatam
    case 8: {
      bhagavatamResponse = await CALL_API("GET_ALL_BHAGAVATAM_MCQ", {});

      const childContainer = document.getElementById("otherLinkChildAccordion");
      childContainer.innerHTML = "";

      if (bhagavatamResponse?.result) {
        childContainer.style.display = "block";
        SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
        for (const [title, data] of Object.entries(
          bhagavatamResponse?.result,
        )) {
          CREATE_ACCORDIAN_ITEM_WITH_LINKS(
            "otherLinkChildAccordion",
            key,
            { title, data },
            onBookChapterClick,
          );
        }
      } else {
        SHOW_SUCCESS_POPUP(
          "Please wait for 5 seconds, data is being prepared.",
        );
      }
      break;
    }

    //for Chaitanya Bhagavatam
    case 11: {
      chaitanyaBhagavataResponse = await CALL_API(
        "GET_ALL_CHAITANYA_BHAGAVATA_MCQ",
        {},
      );

      const childContainer = document.getElementById("otherLinkChildAccordion");
      childContainer.innerHTML = "";

      if (chaitanyaBhagavataResponse?.result) {
        childContainer.style.display = "block";
        SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
        for (const [title, data] of Object.entries(
          chaitanyaBhagavataResponse?.result,
        )) {
          CREATE_ACCORDIAN_ITEM_WITH_LINKS(
            "otherLinkChildAccordion",
            key,
            { title, data },
            onBookChapterClick,
          );
        }
      } else {
        SHOW_SUCCESS_POPUP(
          "Please wait for 5 seconds, data is being prepared.",
        );
      }
      break;
    }

    //for BG Book MCQ
    case 14: {
      if (getUserLoginInfo()) {
        let password = userLoginInfoData?.password;
        pendingBGBookMCQPopulate(password, selectedKey);
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }

      break;
    }

    //for other lecture Book MCQ
    case 17: {
      otherLecturesResponse = await CALL_API(
        API_CONSTANT.GET_ALL_OTHER_LECTURES_MCQ,
        {},
      );

      const childContainer = document.getElementById("otherLinkChildAccordion");
      childContainer.innerHTML = "";

      if (otherLecturesResponse?.result) {
        childContainer.style.display = "block";
        SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
        for (const [title, data] of Object.entries(
          otherLecturesResponse?.result,
        )) {
          CREATE_ACCORDIAN_ITEM_WITH_LINKS(
            "otherLinkChildAccordion",
            key,
            { title, data },
            onBookChapterClick,
          );
        }
      } else {
        SHOW_SUCCESS_POPUP(
          "Please wait for 5 seconds, data is being prepared.",
        );
      }
      break;
    }

    //for Brihad Bhagavatam
    case 20: {
      brihadBhagavataResponse = await CALL_API(
        "GET_ALL_BRIHAD_BHAGAVATAM_MCQ",
        {},
      );

      const childContainer = document.getElementById("otherLinkChildAccordion");
      childContainer.innerHTML = "";

      if (brihadBhagavataResponse?.result) {
        childContainer.style.display = "block";
        SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
        for (const [title, data] of Object.entries(
          brihadBhagavataResponse?.result,
        )) {
          CREATE_ACCORDIAN_ITEM_WITH_LINKS(
            "otherLinkChildAccordion",
            key,
            { title, data },
            onBookChapterClick,
          );
        }
      } else {
        SHOW_SUCCESS_POPUP(
          "Please wait for 5 seconds, data is being prepared.",
        );
      }
      break;
    }

    case 3: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        SHOW_CONFIRMATION_POPUP(
          "Do you want to check your small book MCQ Result?",
          onSmallBookMCQResultClick,
        );
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    case 6: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        SHOW_CONFIRMATION_POPUP(
          "Do you want to check your BG Lecture MCQ Result?",
          () =>
            onLectureMCQResultClick("", API_CONSTANT.GET_BG_LECTURE_MCQ_RESULT),
        );
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    case 9: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        SHOW_CONFIRMATION_POPUP(
          "Do you want to check your SB Lecture MCQ Result?",
          () =>
            onLectureMCQResultClick("", API_CONSTANT.GET_SB_LECTURE_MCQ_RESULT),
        );
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    case 12: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        SHOW_CONFIRMATION_POPUP(
          "Do you want to check your CB Lecture MCQ Result?",
          () =>
            onLectureMCQResultClick("", API_CONSTANT.GET_CB_LECTURE_MCQ_RESULT),
        );
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    case 15: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        SHOW_CONFIRMATION_POPUP(
          "Do you want to check your BG Book MCQ Result?",
          () =>
            onLectureMCQResultClick("", API_CONSTANT.GET_BG_BOOK_MCQ_RESULT),
        );
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    case 18: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        SHOW_CONFIRMATION_POPUP(
          "Do you want to check your Other Lectures MCQ Result?",
          () =>
            onLectureMCQResultClick(
              "",
              API_CONSTANT.GET_OTHER_LECTURES_MCQ_RESULT,
            ),
        );
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    case 21: {
      resetMCQControls();
      if (getUserLoginInfo()) {
        SHOW_CONFIRMATION_POPUP(
          "Do you want to check your Brihad Bhavatam Lectures MCQ Result?",
          () => onLectureMCQResultClick("", "GET_BRIHAD_BHAGAVATAM_MCQ_RESULT"),
        );
      } else {
        ShowPopup("otherLinkPasswordPopup");
      }
      break;
    }

    default:
      console.log("No action defined for this combination.");
  }
}

async function pendingBGBookMCQPopulate(password, key) {
  bgBookResponse = await CALL_API("GET_PENDING_BG_BOOK_MCQ", {
    password: password,
  });
  const childContainer = document.getElementById("otherLinkChildAccordion");
  childContainer.innerHTML = "";

  if (bgBookResponse?.result) {
    console.log("data ", bgBookResponse?.result);
    childContainer.style.display = "block";
    SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
    for (const [title, data] of Object.entries(bgBookResponse?.result)) {
      CREATE_ACCORDIAN_ITEM_WITH_LINKS(
        "otherLinkChildAccordion",
        key,
        { title, data },
        onBookChapterClick,
      );
    }
  } else {
    SHOW_SUCCESS_POPUP("Please wait for 5 seconds, data is being prepared.");
  }
}

async function onSmallBookMCQResultClick(password) {
  getUserLoginInfo();
  let devName = "";

  if (password) {
    password = password.toString().trim();

    const responsePassword = await checkPassword(password);

    devName = responsePassword?.devName;
  } else {
    devName = userLoginInfoData?.devName;
  }

  const response = await CALL_API("GET_ALL_SMALL_BOOK_MCQ_RESULT", {});

  if (response?.status && !response?.result) {
    SHOW_ERROR_POPUP("No Result Found !");
  }
  if (response?.result) {
    SHOW_SPECIFIC_DIV("otherLinkContianer");
    const mcqResponse = response.result[devName];
    mcqResultListView(devName, mcqResponse);
  }
}

async function onPendingMCQButtonClick(password) {
  getUserLoginInfo();
  let devName = "";

  if (password) {
    password = password.toString().trim();

    const passwordAPIresponse = await checkPassword(password);
    updatePasswordRefInApp(passwordAPIresponse);
    devName = passwordAPIresponse?.devName;
  } else {
    password = userLoginInfoData?.password;
    devName = userLoginInfoData?.devName;
  }

  pendingMCQResponse = await CALL_API("GET_MONTHLY_PENDING_MCQ_STATUS", {
    password: password,
  });

  const childContainer = document.getElementById("otherLinkChildAccordion");
  childContainer.innerHTML = "";

  childContainer.style.display = "block";
  SHOW_SPECIFIC_DIV("otherLinkChildMCQListContainer");
  console.log("pendingMCQResponse ", pendingMCQResponse);
  for (const [title, data] of Object.entries(pendingMCQResponse?.result)) {
    CREATE_ACCORDIAN_ITEM_WITH_LINKS(
      "otherLinkChildAccordion",
      -1,
      { title, data },
      onBookChapterClick,
    );
  }
}

async function onLectureMCQResultClick(password, apiType) {
  let devName = "";
  let bgLectureMCQResponse;
  if (password) {
    password = password.toString().trim().toLowerCase();
  } else {
    password = userLoginInfoData?.password;
  }

  const response = await CALL_API(apiType, {
    password: password,
  });

  const ignoreKeys = ["Devotee Name", "Facilitator", "Status", "DB Category"];
  bgLectureMCQResponse = MAP_HEADERS_TO_VALUES_BY_KEYED_GROUP(
    response.result.data,
    ignoreKeys,
  );
  devName = response?.result?.key || "";

  if (!bgLectureMCQResponse) {
    SHOW_ERROR_POPUP("No Result Found !");
  }
  if (bgLectureMCQResponse) {
    SHOW_SPECIFIC_DIV("otherLinkContianer");
    const mcqResponse = bgLectureMCQResponse;
    mcqResultNestedListView(devName, mcqResponse);
  }
}

function otherLinkPasswordPopupBtnCloseClick() {
  SHOW_SPECIFIC_DIV("otherLinkContianer");
}

function otherLinkPasswordPopupBtnClick() {
  const olTextBox = document.getElementById(
    "otherLinkPasswordPopupTxtBox",
  ).value;
  if (!olTextBox) {
    SHOW_ERROR_POPUP("Please enter value");
    return;
  }
  switch (selectedKey) {
    case -1: {
      onPendingMCQButtonClick(olTextBox);
      break;
    }
    case 3: {
      onSmallBookMCQResultClick(olTextBox);
      break;
    }
    case 6: {
      onLectureMCQResultClick(
        olTextBox,
        API_CONSTANT.GET_BG_LECTURE_MCQ_RESULT,
      );
      break;
    }
    case 9: {
      onLectureMCQResultClick(
        olTextBox,
        API_CONSTANT.GET_SB_LECTURE_MCQ_RESULT,
      );
      break;
    }
    case 12: {
      onLectureMCQResultClick(
        olTextBox,
        API_CONSTANT.GET_CB_LECTURE_MCQ_RESULT,
      );
      break;
    }
    case 18: {
      onLectureMCQResultClick(
        olTextBox,
        API_CONSTANT.GET_OTHER_LECTURES_MCQ_RESULT,
      );
      break;
    }
    case 14: {
      pendingBGBookMCQPopulate(olTextBox, selectedKey);
      break;
    }
  }
}

function onBookChapterClick(id, key, hTitle, bTitle) {
  console.log("onBookChapterClick ", id, key, hTitle, bTitle);
  const targetId = parseInt(id);
  let responseData = {};
  switch (key) {
    case -1: {
      responseData = pendingMCQResponse?.result;
      break;
    }
    case 2: {
      responseData = smallBookResponse?.result;
      break;
    }
    case 5: {
      responseData = bgLecureResponse?.result;
      break;
    }
    case 8: {
      responseData = bhagavatamResponse?.result;
      break;
    }
    case 11: {
      responseData = chaitanyaBhagavataResponse?.result;
      break;
    }
    case 14: {
      responseData = bgBookResponse?.result;
      break;
    }
    case 17: {
      responseData = otherLecturesResponse?.result;
      break;
    }
    case 20: {
      responseData = brihadBhagavataResponse?.result;
      break;
    }
    default:
      break;
  }

  const chaptersData = responseData?.[hTitle];
  if (chaptersData) {
    console.log("chaptersData (filtered by hTitle)", chaptersData);
    for (const chapter of chaptersData) {
      if (chapter.id === targetId) {
        console.log("chapter ", chapter);
        if (chapter?.link) {
          const iframe = document.getElementById("dynamicIframe");
          iframe.src = chapter?.link.startsWith("http")
            ? chapter?.link
            : "https://" + chapter?.link;
          iframe.style.display = "block";
          setTimeout(() => {
            iframe.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 200);
        }
      }
    }
  }

  return "";
}

function resetMCQControls() {
  const childContainer = document.getElementById("otherLinkChildAccordion");
  childContainer.innerHTML = "";
  childContainer.style.display = "none";

  const iframe = document.getElementById("dynamicIframe");
  iframe.style.display = "none";
}

function mcqResultListView(devoteeNameStr, data) {
  const container = document.getElementById("result-container");
  container.innerHTML = ""; // clear previous content
  container.style.display = "block";

  const devoteeDiv = document.createElement("div");
  devoteeDiv.className = "devotee";

  const devoteeName = document.createElement("div");
  devoteeName.className = "devotee-name";
  devoteeName.textContent = devoteeNameStr;
  devoteeDiv.appendChild(devoteeName);

  for (const [bookTitle, chapters] of Object.entries(data)) {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book-title";
    bookDiv.textContent = bookTitle;
    devoteeDiv.appendChild(bookDiv);

    chapters.forEach((ch) => {
      const chDiv = document.createElement("div");
      chDiv.className = "chapter";
      chDiv.textContent = `${ch.chapter} : ${ch.score}`;
      devoteeDiv.appendChild(chDiv);
    });
  }

  container.appendChild(devoteeDiv);
}

function mcqResultNestedListView(devoteeNameStr, data) {
  const container = document.getElementById("result-container");
  container.innerHTML = ""; // clear previous content
  container.style.display = "block";

  const devoteeDiv = document.createElement("div");
  devoteeDiv.className = "devotee";

  const devoteeName = document.createElement("div");
  devoteeName.className = "devotee-name";
  devoteeName.textContent = devoteeNameStr;
  devoteeDiv.appendChild(devoteeName);

  for (const [chapterTitle, shlokas] of Object.entries(data)) {
    const chapterDiv = document.createElement("div");
    chapterDiv.className = "book-title";
    const cleanTitle = chapterTitle.includes("Marksheet -")
      ? chapterTitle.split("-")[1].toString().trim()
      : chapterTitle;

    chapterDiv.textContent = cleanTitle;
    devoteeDiv.appendChild(chapterDiv);

    for (const [shloka, scoreObj] of Object.entries(shlokas)) {
      const shlokaDiv = document.createElement("div");
      shlokaDiv.className = "chapter";

      const score = scoreObj.value ?? scoreObj;
      const note = scoreObj.note ?? "";

      shlokaDiv.textContent = `${shloka} : ${score}${note ? " : " + note : ""}`;
      devoteeDiv.appendChild(shlokaDiv);
    }
  }

  container.appendChild(devoteeDiv);
}

function Back_to_MCQ_Screen(otherLinkContianerDiv) {
  document.getElementById("dynamicIframe").style.display = "none";
  document.getElementById("dynamicIframe").src = "";
  SHOW_SPECIFIC_DIV(otherLinkContianerDiv);
}
