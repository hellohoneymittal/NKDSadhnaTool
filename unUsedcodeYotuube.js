// async function openYouTubeWindow() {
//  alert('hello');
// }

// // async function openYouTubeWindow() {
// //   await fetchPlaylists();
// //   SHOW_SPECIFIC_DIV(youTubeContainerNew);
// // }

// function filterPlaylists(searchValue) {
//   const lowerSearchValue = searchValue.toLowerCase();
//   const filteredPlaylists = playlistsData?.filter((playlist) =>
//     playlist?.snippet?.title.toLowerCase().includes(lowerSearchValue)
//   );
//   renderPlaylists(filteredPlaylists);
// }

// function filterShorts(searchValue) {
//   const lowerSearchValue = searchValue.toLowerCase();
//   const filteredPlaylists = shortsItemData?.filter((item) =>
//     item?.title.toLowerCase().includes(lowerSearchValue)
//   );
//   renderShorts(filteredPlaylists);
// }

// function onYouTubeVideoClick(videoID, parentId, playListTitle, itemTitle) {
//   const iframe = document.getElementById("youTubeVideoIframe");
//   const videoDiv = document.getElementById("youTubeVideoIframeDiv");
//   let videoStaticPart = "https://www.youtube.com/embed/";

//   iframe.src = videoStaticPart + videoID;
//   videoDiv.style.display = "block";
//   iframe.scrollIntoView({
//     behavior: "smooth", // Smooth scrolling
//     block: "center", // Align the iframe to the center of the viewport
//   });
// }

// function renderVideos(videos) {
//   const videoContainer = document.getElementById("youTubeItemImageCardView");
//   ;
//   if (!videoContainer) {
//     console.error("Required DOM elements are missing.");
//     return;
//   }

//   videoContainer.innerHTML = ""; // Clear container

//   videos.forEach((video) => {
//     try {
//       console.log("video ->", video);
//       const { title, videoID, publishedAt, thumbnailMedium, thumbnailDefault } =
//         video;

//       const videoItem = document.createElement("div");
//       videoItem.className = "image_card";
//       videoItem.innerHTML = `
//           <img class="image_thumbnail" src="${thumbnailMedium}" alt="${title}" />
//           <div class="image_title">${title}</div>
//         `;

//       // Add event listener for clicking a video item
//       videoItem.addEventListener("click", () => handleVideoClick(video));

//       videoContainer.appendChild(videoItem);
//     } catch (ex) {
//       console.log("renderVideos : videos", ex.message);
//     }
//   });
// }

// function handleVideoClick(selectedItem) {
//   // Show the specific video container
//   SHOW_SPECIFIC_DIV("youTubePlayVideoContainer");
//   const videoContainer2 = document.getElementById(
//     "youTubeRestVideoImageCardView"
//   );
//   videoContainer2.innerHTML = "";

//   const videoTitle = document.getElementById("video-title");
//   videoTitle.innerHTML = selectedItem?.title;

//   const iframe = document.getElementById("youTubeVideoIframe");
//   let videoStaticPart = "https://www.youtube.com/embed/";
//   iframe.src = videoStaticPart + selectedItem?.videoID;

//   iframe.scrollIntoView({
//     behavior: "smooth", // Smooth scrolling
//     block: "center", // Align the iframe to the center of the viewport
//   });

//   playListInnerItemData.forEach((video) => {
//     if (video?.videoID !== selectedItem?.videoID) {
//       const restVideoItem = document.createElement("div");
//       restVideoItem.className = "image_card";
//       restVideoItem.innerHTML = `
//       <img class="image_thumbnail" src="${video?.thumbnailDefault}" alt="${video?.title}" />
//       <div class="image_title">${video?.title}</div>
//     `;

//       // Add event listener for clicking a video item
//       restVideoItem.addEventListener("click", () => handleVideoClick(video));
//       videoContainer2.appendChild(restVideoItem);
//     }
//   });
// }

// function filteryouTubeItem(searchValue) {
//   const lowerSearchValue = searchValue.toLowerCase();
//   const filteredPlaylists = playListInnerItemData?.filter((item) =>
//     item?.title.toLowerCase().includes(lowerSearchValue)
//   );
//   renderVideos(filteredPlaylists);
// }

// async function openyouTubeShortsWindow() {
//   await fetchYouTubeShorts();
//   SHOW_SPECIFIC_DIV(youTubeShortsContainer);
// }

// async function fetchYouTubeShorts() {
//   try {
//     const shortsResponse = await CALL_API("GET_YOUTUBE_PLAYLIST_DATA", {
//       playlistName: "Shorts",
//     });

//     if (shortsResponse.result.length > 0) {
//       let result = shortsResponse.result.map(function (row) {
//         return {
//           title: row[0],
//           videoID: row[1],
//           publishedAt: row[2],
//           thumbnailMedium: row[3],
//           thumbnailDefault: row[4],
//         };
//       });

//       shortsItemData = result;
//       renderShorts(shortsItemData);
//     } else {
//       console.error("No Shorts found.", data);
//     }
//   } catch (error) {
//     console.error("Error fetching Shorts:", error.message);
//   }
// }

// function renderShorts(shorts) {
//   const container = document.getElementById("youTubeShortsImageCardView");
//   container.innerHTML = ""; // Clear container

//   // Iterate through each Short and log its name and URL
//   shorts.forEach((short) => {
//     try {
//       const card = document.createElement("div");
//       card.className = "image_card";

//       card.innerHTML = `
//         <img class="image_thumbnail" src="${short.thumbnailMedium}" alt="${short.title}" />
//         <div class="image_title">${short.title}</div>
//       `;

//       card.addEventListener("click", () => {
//         embedShortsVideo(short);
//       });

//       container.appendChild(card);
//     } catch (ex) {
//       console.log("renderShorts : error", ex.message);
//     }
//   });
// }

// function embedShortsVideo(short) {
//   try {
//     // Show the specific video container with iframe
//     SHOW_SPECIFIC_DIV("youTubeShortsPlayVideoContainer");

//     const videoContainer2 = document.getElementById(
//       "youTubeShortsRestVideoImageCardView"
//     );
//     videoContainer2.innerHTML = "";

//     const videoTitle = document.getElementById("shorts-video-title");
//     videoTitle.innerHTML = short.title;

//     let videoStaticPart = "https://www.youtube.com/embed/";
//     const iframe = document.getElementById("youTubeShortsVideoIframe");
//     iframe.src = videoStaticPart + short.videoID;

//     iframe.scrollIntoView({
//       behavior: "smooth", // Smooth scrolling
//       block: "center", // Align the iframe to the center of the viewport
//     });

//     shortsItemData.forEach((video) => {
//       if (video?.videoID !== short?.videoID) {
//         const restVideoItem = document.createElement("div");
//         restVideoItem.className = "image_card";
//         restVideoItem.innerHTML = `
//       <img class="image_thumbnail" src="${short.thumbnailDefault}" alt="${short.title}" />
//       <div class="image_title">${short.title}</div>
//     `;

//         // Add event listener for clicking a video item
//         restVideoItem.addEventListener("click", () => embedShortsVideo(video));

//         videoContainer2.appendChild(restVideoItem);
//       }
//     });
//   } catch (error) {
//     console.error("Error embedding Shorts video:", error.message);
//   }
// }

// function CREATE_ACCORDIAN_ITEM_WITH_LINKS_YOUTBUE(
//   accordionContainerId,
//   parentId,
//   item,
//   callback
// ) {
//   ;
//   const accordionContainer = document.getElementById(accordionContainerId);
//   const accordionItem = document.createElement("div");
//   accordionItem.classList.add("accordion-item");

//   const header = document.createElement("button");
//   header.classList.add("accordion-header");
//   header.innerHTML = `${item.title} <span class="icon">▼</span>`;

//   const content = document.createElement("div");
//   content.classList.add("accordion-content");
//   ;
//   // Check if links exist in the provided item
//   if (item.data) {
//     // Iterate over the links directly from the item object
//     let videoStaticPart = "https://www.youtube.com/embed/";
//     item.data.forEach((linkData) => {
//       const link = document.createElement("a");
//       link.href = videoStaticPart + linkData.videoID;
//       link.textContent = linkData.title;

//       // Add a click event listener for each link
//       link.addEventListener("click", function (event) {
//         event.preventDefault(); // Prevent default link behavior
//         callback(linkData.videoID, parentId, item.title, linkData.title);
//       });

//       content.appendChild(link);
//     });
//   } else if (item.content) {
//     content.innerHTML = `<p>${item.content}</p>`; // If content exists, just append it
//   }

//   // Toggle the accordion section on click
//   header.addEventListener("click", function () {
//     const isOpen = content.style.display === "block";
//     document.querySelectorAll(".accordion-content").forEach((item) => {
//       item.style.display = "none";
//     });
//     document.querySelectorAll(".accordion-header").forEach((item) => {
//       item.classList.remove("active");
//     });

//     if (!isOpen) {
//       content.style.display = "block";
//       header.classList.add("active");
//     }
//   });

//   accordionItem.appendChild(header);
//   accordionItem.appendChild(content);
//   accordionContainer.appendChild(accordionItem);
// }
