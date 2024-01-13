import axios from "axios";
import { createTrack } from "../services/track.service";
import { Track } from "../models/track.model";

const CreateTracksInTable = (tracks: any[]) => {
  try {
    tracks.forEach(async (item) => {
      const newTrack: Track = {
        spotifyId: item.track.id,
        name: item.track.name,
        image: item.track.album.images[1].url,
        artistSpotifyId: item.track.artists[0].id,
        artistName: item.track.artists[0].name,
        previewUrl: item.track.preview_url,
      };

      await createTrack(newTrack);
    });
  } catch (error) {
    console.error(error);
  }
};

export const initilizeSongsTableByPlaylists = async (
  playlistIds: string[],
  apiKey: string,
  apiHost: string
) => {
  [...playlistIds].forEach(async (id) => {
    const options = {
      method: "GET",
      url: `https://${apiHost}/playlist_tracks/`,
      params: {
        id,
        offset: "0",
        limit: "100",
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    };

    try {
      const response = await axios.request(options);
      await CreateTracksInTable(response.data.items);
      console.log(
        `successfuly added ${response.data.items.length} tracks from playlist id: ${id}`
      );
    } catch (error) {
      console.error(error);
    }
  });
};
