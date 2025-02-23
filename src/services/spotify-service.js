import axios from "axios";

let token = localStorage.getItem("spotifyToken");

const BASE_URL = "https://api.spotify.com/v1";

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(BASE_URL + "/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.warn("Access token expired. Refreshing...");
      const newToken = await getRefreshToken();
      if (newToken) return fetchUserProfile(newToken);
    }
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const fetchPaylist = async () => {
  try {
    const response = await axios.get(BASE_URL + "/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user playlist:", error);
    return null;
  }
};

export const fetchFollowing = async () => {
  try {
    const response = await axios.get(BASE_URL + "/me/following?type=artist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user following:", error);
    return null;
  }
};

const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("refresh_token");
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: "c39454715c1c4cba9bf7a7672f42a628",
    }),
  };
  const body = await fetch(url, payload);
  const response = await body.json();
  token = response.accessToken;
  localStorage.setItem("spotifyToken", response.accessToken);
  if (response.refreshToken) {
    localStorage.setItem("refresh_token", response.refreshToken);
  }
};

export const fetchTopArtist = async (time_range = "long_term") => {
  try {
    const response = await axios.get(
      BASE_URL + "/me/top/artists?limit=50&time_range=" + time_range,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user following:", error);
    return null;
  }
};

export const fetchTopTrack = async () => {
  try {
    const response = await axios.get(
      BASE_URL + "/me/top/tracks?limit=50&time_range=long_term",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user following:", error);
    return null;
  }
};
