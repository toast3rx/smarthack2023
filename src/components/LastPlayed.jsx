import { Divider, Grid } from "@mui/material";
import "./styles/LastPlayed.css";
import { SongItem } from "./SongItem";

export const LastPlayed = () => {
  const songs = [
    {
      title: "Song Title",
      author: "Song Author",
      score: "80%",
    },
    {
      title: "Song Title",
      author: "Song Author",
      score: "80%",
    },
    {
      title: "Song Title",
      author: "Song Author",
      score: "80%",
    },
  ];

  return (
    <Grid container className="songs-container">
      {songs.map((song, index) =>
        index !== songs.length - 1 ? (
          <>
            <SongItem
              title={song.title}
              author={song.author}
              score={song.score}
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
