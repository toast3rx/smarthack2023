import { CardActionArea, Grid } from "@mui/material";
import "./styles/SongItem.css";

export const SongItem = ({ title, author, score }) => {
  return (
    <CardActionArea>
      <Grid item xs={12} style={{ padding: "10px" }}>
        <div className="score">Best Score: {score}</div>
        <div className="songtitle">{title}</div>
        <div className="author">{author} </div>
      </Grid>
    </CardActionArea>
  );
};
