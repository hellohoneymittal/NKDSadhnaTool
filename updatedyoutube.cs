Add Scroll Event Listeners:

// Add infinite scrolling for playlists
document.getElementById("yTubePlayListImageCardView").addEventListener("scroll", function () {
  const container = this;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
    // Fetch next batch when near the bottom
    if (nextPageTokenPlaylists) fetchPlaylists();
  }
});

// Add infinite scrolling for playlist items
document.getElementById("yTubeItemImageCardView").addEventListener("scroll", function () {
  const container = this;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
    // Fetch next batch when near the bottom
    if (nextPageTokenItems) fetchPlaylistItems();
  }
});




Modify fetchPlaylistItems:

async function fetchPlaylistItems(playlistId) {
  try {
    if (isFetching) return; // Avoid duplicate API calls
    isFetching = true;

    const url = `${BASE_URL_YOUTUBE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY_YOUTUBE_NKD}${
      nextPageTokenItems ? `&pageToken=${nextPageTokenItems}` : ""
    }`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      playListInnerItemData = [...playListInnerItemData, ...data.items]; // Append new videos
      renderVideos(playListInnerItemData);
      nextPageTokenItems = data.nextPageToken || null; // Store the next page token
    } else {
      console.error("No videos found in the playlist.", data);
    }

    isFetching = false; // Allow next API call
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    isFetching = false; // Reset fetching state
  }
}


Modify fetchPlaylists:

async function fetchPlaylists() {
  try {
    if (isFetching) return; // Avoid duplicate API calls
    isFetching = true;
    IsLoading(true);

    const url = `${BASE_URL_YOUTUBE}/playlists?part=snippet&channelId=UCyPwLzmeTmyhpDsCBrMubbQ&maxResults=50&key=${API_KEY_YOUTUBE_NKD}${
      nextPageTokenPlaylists ? `&pageToken=${nextPageTokenPlaylists}` : ""
    }`;

    const playlistsResponse = await fetch(url);
    IsLoading(false);

    if (!playlistsResponse.ok) {
      SHOW_ERROR_POPUP(`HTTP error! Status: ${playlistsResponse.status}`);
      throw new Error(`HTTP error! Status: ${playlistsResponse.status}`);
    }

    const data = await playlistsResponse.json();

    if (data.items) {
      playlistsData = [...playlistsData, ...data.items]; // Append new items
      renderPlaylists(playlistsData);
      nextPageTokenPlaylists = data.nextPageToken || null; // Store the next page token
    } else {
      console.error("No playlists found.", data);
    }

    isFetching = false; // Allow next API call
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    isFetching = false; // Reset fetching state
  }
}


Global Variables:
let nextPageTokenPlaylists = null; // For playlists
let nextPageTokenItems = null; // For playlist items
let isFetching = false; // To prevent duplicate API calls during scroll