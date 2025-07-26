import api from './authentication';

const BASE_URL = 'https://api.spotify.com/v1';

export const fetchUserProfile = async () => {
  try {
    const response = await api.get(BASE_URL + '/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const fetchPaylist = async () => {
  try {
    const response = await api.get(BASE_URL + '/me/playlists');
    return response.data;
  } catch (error) {
    console.error('Error fetching user playlist:', error);
    return null;
  }
};

export const fetchCurrentPaylist = async (playlistId) => {
  try {
    const response = await api.get(BASE_URL + '/playlists/' + playlistId);
    return response.data;
  } catch (error) {
    console.error('Error fetching user playlist:', error);
    return null;
  }
};
export const fetchAudioFeature = async (playlistId) => {
  try {
    const response = await api.get(
      BASE_URL +
        '/audio-features?' +
        'ids=3DJVLBNKQi8fzhTWFxAzS6,7Csa4PStpuYIfUqNMKQ4V8,0rk2X5TAhraBC5aCIXK2Rq,1FqpAzjciSjrmrTVqSGQ66,6anGj4SX83j5DyG3aZOzqc,4wr3QwOxLqh4uBlHKhtTlx,5i4nGuVaofelQlV7aAzsrZ,4roFMBSQp7W4fYVxKMmhA5,7G5wpuR61ABrT7R1snos7C,1bhYympuYYM80b63IbCgQr,5ayTQo5gOcvPq44csmBODm,1gEHNfJRSXpDVaEicwRRfe,5yrOQvVuly6KPTCBIGFjCw,3eSm4iAkLsn3BeggfiQOH9,53qsjAlyLvk6AE0xPHSBlM,3xIyi0QRmcz0cBDbVPTNGd,4OOXIr4Wce7TuLUu65v653,5Ggb9pKiKcr5vNV9v1e1vs,0KtHnXQjYkHNDsjTX3XqLc,0EH7sgeiFqDa3eS7ieW2zs'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching audio feature:', error);
    return null;
  }
};
export const fetchFollowing = async () => {
  try {
    const response = await api.get(BASE_URL + '/me/following?type=artist');
    return response.data;
  } catch (error) {
    console.error('Error fetching user following:', error);
    return null;
  }
};

export const fetchTopArtist = async (time_range = 'long_term') => {
  try {
    const response = await api.get(
      BASE_URL + '/me/top/artists?limit=50&time_range=' + time_range
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user following:', error);
    return null;
  }
};

export const fetchTopTrack = async (time_range = 'long_term') => {
  try {
    const response = await api.get(
      BASE_URL + '/me/top/tracks?limit=50&time_range=' + time_range
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user following:', error);
    return null;
  }
};

export const fetchRecentlyPlayed = async (time_range = 'long_term') => {
  try {
    const response = await api.get(BASE_URL + '/me/player/recently-played');
    return response.data;
  } catch (error) {
    console.error('Error fetching user following:', error);
    return null;
  }
};

export const getRecommendations = async (ids) => {
  try {
    const response = await api.get(
      'https://api.spotify.com/v1/recommendations?seed_tracks=3eSm4iAkLsn3BeggfiQOH9,0rk2X5TAhraBC5aCIXK2Rq,7Csa4PStpuYIfUqNMKQ4V8,0KtHnXQjYkHNDsjTX3XqLc,4wr3QwOxLqh4uBlHKhtTlx'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    return null;
  }
};

export const getTrackById = async (id) => {
  try {
    const response = await api.get(BASE_URL + '/tracks/' + id);

    return response.data;
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    return null;
  }
};
