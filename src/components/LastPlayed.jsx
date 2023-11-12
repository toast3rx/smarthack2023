import { Divider, Grid } from "@mui/material";
import "./styles/LastPlayed.css";
import { SongItem } from "./SongItem";
import { useEffect, useState } from "react";

export const LastPlayed = ({length = -1}) => {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
      try {
        fetch("http://127.0.0.1:8000/api/v1/songs").then(data => data.json()).then(songgs => setSongs(songgs.data.songs));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      if (length == -1)
        length = songs.length;
  }, []);
  return (
    <Grid container className="songs-container">
      {songs.slice(0, length).map((song, index) =>
        index !== songs.length - 1 ? (
          <>
            <SongItem
              title={song.title}
              author={song.author}
              score={song.score}
              songId={index}
            />
            <Grid item xs={12}>
              <hr className="rounded" />
            </Grid>
          </>
        ) : (
          <SongItem
            title={song.title}
            author={song.author}
            score={song.score}
          />
        )
      )}
    </Grid>
  );
};
