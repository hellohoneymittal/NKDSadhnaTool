function createMainAccordionWithList(data, accordionId) {
  const mainContainer = document.getElementById(accordionId);

  mainContainer.innerHTML = "";

  Object.entries(data).forEach(([sectionTitle, items]) => {
    const sectionItem = document.createElement("div");
    sectionItem.classList.add("accordion-item");

    const sectionHeader = document.createElement("button");
    sectionHeader.classList.add("accordion-header");

    sectionHeader.innerHTML = `${sectionTitle} (${items.length}) <span class="icon">▼</span>`;

    const sectionContent = document.createElement("div");
    sectionContent.classList.add("accordion-content");

    // Create child accordions
    items.forEach((item) => {
      createNestedAccordionWithList(sectionContent, item);
    });

    sectionHeader.addEventListener("click", function (event) {
      event.stopPropagation(); // IMPORTANT

      const isOpen = sectionContent.style.display === "block";

      // Close all main accordion contents
      mainContainer
        .querySelectorAll(":scope > .accordion-item > .accordion-content")
        .forEach((e) => (e.style.display = "none"));

      // Remove active class from all main headers
      mainContainer
        .querySelectorAll(":scope > .accordion-item > .accordion-header")
        .forEach((h) => h.classList.remove("active"));

      if (!isOpen) {
        sectionContent.style.display = "block";
        sectionHeader.classList.add("active");
      }
    });

    sectionItem.appendChild(sectionHeader);
    sectionItem.appendChild(sectionContent);
    mainContainer.appendChild(sectionItem);
  });
}

function createNestedAccordionWithList(container, item) {
  const entryItem = document.createElement("div");
  entryItem.classList.add("accordion-item", "child-accordion");

  const entryHeader = document.createElement("button");
  entryHeader.classList.add("accordion-header");

  entryHeader.innerHTML = `${item.title} <span class="icon">▼</span>`;

  const entryContent = document.createElement("div");
  entryContent.classList.add("accordion-content");

  const displayText =
    item.rawData?.message || item.rawData?.content || "No data available";

  entryContent.innerHTML = `
    <div style="
      background:#ffffff;
      padding:6px;
      border-radius:10px;
      line-height:1.7;
      font-size:14px;
      max-height:280px;
      overflow-y:auto;
      box-shadow: inset 0 0 8px rgba(0,0,0,.08);
    ">
      ${displayText.replace(/\n/g, "<br>")}
    </div>
  `;

  entryHeader.addEventListener("click", function (event) {
    event.stopPropagation(); // IMPORTANT

    const isOpen = entryContent.style.display === "block";

    // Close only sibling children (not parent)
    container
      .querySelectorAll(":scope > .accordion-item > .accordion-content")
      .forEach((c) => (c.style.display = "none"));

    container
      .querySelectorAll(":scope > .accordion-item > .accordion-header")
      .forEach((h) => h.classList.remove("active"));

    if (!isOpen) {
      entryContent.style.display = "block";
      entryHeader.classList.add("active");
    }
  });

  entryItem.appendChild(entryHeader);
  entryItem.appendChild(entryContent);
  container.appendChild(entryItem);
}

function renderGlorificationContainer(modifiedGlorificationData) {
  document.getElementById("glorificationAccordianContainer").style.display =
    "flex";
  createMainAccordionWithList(
    modifiedGlorificationData,
    "glorificationAccordion",
  );
}
