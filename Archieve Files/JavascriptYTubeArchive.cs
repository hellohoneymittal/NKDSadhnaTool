<button class="green" style="display: none" onclick="openYTubeWindow()">
  Youtube
</button>;


 <div id="youtubeContainer">
        <div class="popup" id="yTubeContainer">
          <div class="popup-content scrollable-content">
            <h2>NKD PlayList</h2>
            <button
              class="red"
              style="margin-bottom: 10px"
              onclick="SHOW_SPECIFIC_DIV('mainContainer')"
            >
              Back
            </button>
            <button
              class="green"
              style="margin: 0px"
              onclick="openYTubeShortsWindow()"
            >
              Youtube Shorts
            </button>

            <div class="search-container">
              <input
                type="text"
                id="yTubePlayListInput"
                class="liveSearch"
                placeholder="Select playlist..."
                oninput="filterPlaylists(this.value)"
              />
            </div>

            <div id="yTubePlayListImageCardView" class="image_container"></div>
            <div id="yTubePlayListVideoContainer" class="video-list"></div>
          </div>
        </div>

        <div class="popup" id="yTubePlayListItemContainer">
          <div class="popup-content scrollable-content">
            <h2>PlayList Item</h2>
            <button
              class="red"
              style="margin-bottom: 10px"
              onclick="SHOW_SPECIFIC_DIV('yTubeContainer')"
            >
              Back
            </button>

            <div class="search-container">
              <input
                type="text"
                id="yTubeItemInput"
                class="liveSearch"
                placeholder="Select video..."
                oninput="filterYTubeItem(this.value)"
              />
            </div>

            <div id="yTubeItemImageCardView" class="image_container"></div>
          </div>
        </div>

        <div class="popup" id="yTubePlayVideoContainer">
          <div class="popup-content scrollable-content">
            <h2>Video</h2>
            <button
              class="red"
              style="margin-bottom: 10px"
              onclick="SHOW_SPECIFIC_DIV('yTubeContainer')"
            >
              Back
            </button>

            <div class="video-container" id="yTubePlayVideo">
              <iframe
                id="YTubeVideoIframe"
                loading="lazy"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
            <div id="video-title" class="image_title"></div>
            <div
              id="yTubeRestVideoImageCardView"
              class="playlist_image_container"
            ></div>
          </div>
        </div>
      </div>

      <div id="youtubeshorts">
        <div class="popup" id="yTubeShortsContainer">
          <div class="popup-content scrollable-content">
            <h2>NKD Shorts</h2>
            <button
              class="red"
              style="margin-bottom: 10px"
              onclick="SHOW_SPECIFIC_DIV('yTubeContainer')"
            >
              Back
            </button>

            <div class="search-container">
              <input
                type="text"
                id="yTubeShortsPlayListInput"
                class="liveSearch"
                placeholder="Select shorts..."
                oninput="filterShorts(this.value)"
              />
            </div>

            <div id="yTubeShortsImageCardView" class="image_container"></div>
          </div>
        </div>

        <div class="popup" id="yTubeShortsPlayVideoContainer">
          <div class="popup-content scrollable-content">
            <h2>Video</h2>
            <button
              class="red"
              style="margin-bottom: 10px"
              onclick="SHOW_SPECIFIC_DIV('yTubeShortsContainer')"
            >
              Back
            </button>

            <div class="video-container" id="yTubeShortsPlayVideo">
              <iframe
                id="YTubeShortsVideoIframe"
                loading="lazy"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
            <div id="shorts-video-title" class="image_title"></div>
            <div
              id="yTubeShortsRestVideoImageCardView"
              class="playlist_image_container"
            ></div>
          </div>
        </div>
      </div>



const yTubeContainer = "yTubeContainer";
const yTubePlayListItemContainer = "yTubePlayListItemContainer";
const yTubePlayVideoContainer = "yTubePlayVideoContainer";
const yTubeShortsContainer = "yTubeShortsContainer";
let playlistsData = [];
let playListInnerItemData = [];
let shortsItemData = [];
async function openYTubeWindow() {
  await fetchPlaylists();
  SHOW_SPECIFIC_DIV(yTubeContainer);
}

async function fetchPlaylists() {
  try {
    // Fetch all playlists
    IsLoading(true);
    const playlistsResponse = await fetch(
      `${BASE_URL_YOUTUBE}/playlists?part=snippet&channelId=UCyPwLzmeTmyhpDsCBrMubbQ&maxResults=50&key=${API_KEY_YOUTUBE_NKD}`
    );
    IsLoading(false);

    if (!playlistsResponse.ok) {
      SHOW_ERROR_POPUP(`HTTP error! Status: ${playlistsResponse.status}`);
      throw new Error(`HTTP error! Status: ${playlistsResponse.status}`);
    }

    const data = await playlistsResponse.json();

    if (data.items) {
      playlistsData = data.items;
      renderPlaylists(playlistsData);
    } else {
      console.error("No playlists found.", data);
    }
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
  }
}

function renderPlaylists(playlists) {
  const container = document.getElementById("yTubePlayListImageCardView");
  container.innerHTML = ""; // Clear container

  // Iterate through each playlist and log its name and URL
  playlists.forEach((playlist) => {
    try {
      const { title, thumbnails } = playlist.snippet;
      const playlistId = playlist.id;
      const card = document.createElement("div");
      card.className = "image_card";

      card.innerHTML = `
                <img class="image_thumbnail" src="${thumbnails.medium.url}" alt="${title}" />
                <div class="image_title">${title}</div>
              `;

      card.addEventListener("click", () => {
        fetchPlaylistItems(playlistId);
      });
      container.appendChild(card);
    } catch (ex) {
      console.log("renderPlaylists : error", ex.message);
    }
  });
}

function filterPlaylists(searchValue) {
  const lowerSearchValue = searchValue.toLowerCase();
  const filteredPlaylists = playlistsData?.filter((playlist) =>
    playlist?.snippet?.title.toLowerCase().includes(lowerSearchValue)
  );
  renderPlaylists(filteredPlaylists);
}

async function fetchPlaylistItems(playlistId) {
  try {
    const response = await fetch(
      `${BASE_URL_YOUTUBE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=1000&key=${API_KEY_YOUTUBE_NKD}`
    );
    const data = await response.json();

    if (data.items) {
      playListInnerItemData = data.items;
      renderVideos(playListInnerItemData);
      SHOW_SPECIFIC_DIV(yTubePlayListItemContainer);
    } else {
      console.error("No videos found in the playlist.", data);
    }
  } catch (error) {
    console.error("Error fetching playlist items:", error);
  }
}

function renderVideos(videos) {
  const videoContainer = document.getElementById("yTubeItemImageCardView");

  if (!videoContainer) {
    console.error("Required DOM elements are missing.");
    return;
  }

  if (
    videos.length > 0 &&
    videos[0].snippet.playlistId == "PLJdKXHW1Y1A1nuWW-9h4xSeJurnAiw9Gw"
  ) {
    videos.sort(
      (a, b) =>
        new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
    );
  }

  videoContainer.innerHTML = ""; // Clear container

  videos.forEach((video) => {
    try {
      console.log("video ->", video);
      const { title, thumbnails } = video.snippet;

      if (!thumbnails?.medium?.url) {
        console.warn("Thumbnail URL missing for video:", title);
        return;
      }
      const videoItem = document.createElement("div");
      videoItem.className = "image_card";
      videoItem.innerHTML = `
          <img class="image_thumbnail" src="${thumbnails.medium.url}" alt="${title}" />
          <div class="image_title">${title}</div>
        `;

      // Add event listener for clicking a video item
      videoItem.addEventListener("click", () => handleVideoClick(video));

      videoContainer.appendChild(videoItem);
    } catch (ex) {
      console.log("renderVideos : videos", ex.message);
    }
  });
}

function handleVideoClick(selectedItem) {
  const { title } = selectedItem.snippet;

  // Show the specific video container
  SHOW_SPECIFIC_DIV("yTubePlayVideoContainer");
  const videoContainer2 = document.getElementById(
    "yTubeRestVideoImageCardView"
  );
  videoContainer2.innerHTML = "";

  const videoTitle = document.getElementById("video-title");
  videoTitle.innerHTML = title;

  const iframe = document.getElementById("YTubeVideoIframe");
  const videoId = selectedItem?.snippet?.resourceId?.videoId;
  let videoStaticPart = "https://www.youtube.com/embed/";
  iframe.src = `${videoStaticPart}${videoId}`;

  iframe.scrollIntoView({
    behavior: "smooth", // Smooth scrolling
    block: "center", // Align the iframe to the center of the viewport
  });

  playListInnerItemData.forEach((video) => {
    if (video?.id !== selectedItem?.id) {
      const { title, thumbnails } = video.snippet;
      const restVideoItem = document.createElement("div");
      restVideoItem.className = "image_card";
      restVideoItem.innerHTML = `
      <img class="image_thumbnail" src="${thumbnails.default.url}" alt="${title}" />
      <div class="image_title">${title}</div>
    `;

      // Add event listener for clicking a video item
      restVideoItem.addEventListener("click", () => handleVideoClick(video));

      videoContainer2.appendChild(restVideoItem);
    }
  });
}

function filterYTubeItem(searchValue) {
  const lowerSearchValue = searchValue.toLowerCase();
  const filteredPlaylists = playListInnerItemData?.filter((item) =>
    item?.snippet?.title.toLowerCase().includes(lowerSearchValue)
  );
  renderVideos(filteredPlaylists);
}

async function openYTubeShortsWindow() {
  await fetchYouTubeShorts();
  SHOW_SPECIFIC_DIV(yTubeShortsContainer);
}

async function fetchYouTubeShorts() {
  try {
    IsLoading(true);
    const shortsResponse = await fetch(
      `${BASE_URL_YOUTUBE}/search?part=snippet&channelId=UCyPwLzmeTmyhpDsCBrMubbQ&type=video&videoDuration=short&maxResults=50&key=${API_KEY_YOUTUBE_NKD}`
    );
    IsLoading(false);

    if (!shortsResponse.ok) {
      SHOW_ERROR_POPUP(`HTTP error! Status: ${shortsResponse.status}`);
      throw new Error(`HTTP error! Status: ${shortsResponse.status}`);
    }

    const data = await shortsResponse.json();

    if (data.items) {
      const shortsData = data.items;
      shortsItemData = shortsData;
      renderShorts(shortsData);
    } else {
      console.error("No Shorts found.", data);
    }
  } catch (error) {
    console.error("Error fetching Shorts:", error.message);
  }
}

function renderShorts(shorts) {
  const container = document.getElementById("yTubeShortsImageCardView");
  container.innerHTML = ""; // Clear container

  // Iterate through each Short and log its name and URL
  shorts.forEach((short) => {
    try {
      const { title, thumbnails } = short.snippet;

      const card = document.createElement("div");
      card.className = "image_card";

      card.innerHTML = `
        <img class="image_thumbnail" src="${thumbnails.medium.url}" alt="${title}" />
        <div class="image_title">${title}</div>
      `;

      card.addEventListener("click", () => {
        embedShortsVideo(short);
      });

      container.appendChild(card);
    } catch (ex) {
      console.log("renderShorts : error", ex.message);
    }
  });
}

function embedShortsVideo(short) {
  try {
    const { title } = short.snippet;
    const videoId = short.id.videoId;

    // Show the specific video container with iframe
    SHOW_SPECIFIC_DIV("yTubeShortsPlayVideoContainer");

    const videoContainer2 = document.getElementById(
      "yTubeShortsRestVideoImageCardView"
    );
    videoContainer2.innerHTML = "";

    const videoTitle = document.getElementById("shorts-video-title");
    videoTitle.innerHTML = title;

    let videoStaticPart = "https://www.youtube.com/embed/";
    const iframe = document.getElementById("YTubeShortsVideoIframe");
    iframe.src = `${videoStaticPart}${videoId}`;

    iframe.scrollIntoView({
      behavior: "smooth", // Smooth scrolling
      block: "center", // Align the iframe to the center of the viewport
    });

    shortsItemData.forEach((video) => {
      if (video?.id !== short?.id) {
        const { title, thumbnails } = video.snippet;
        const restVideoItem = document.createElement("div");
        restVideoItem.className = "image_card";
        restVideoItem.innerHTML = `
      <img class="image_thumbnail" src="${thumbnails.default.url}" alt="${title}" />
      <div class="image_title">${title}</div>
    `;

        // Add event listener for clicking a video item
        restVideoItem.addEventListener("click", () => embedShortsVideo(video));

        videoContainer2.appendChild(restVideoItem);
      }
    });
  } catch (error) {
    console.error("Error embedding Shorts video:", error.message);
  }
}
