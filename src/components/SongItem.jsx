import { CardActionArea, Grid } from "@mui/material";
import "./styles/SongItem.css";
import { useNavigate } from "react-router";

export const SongItem = ({ title, author, score, songId }) => {

  const navigate = useNavigate();

  return (
    <CardActionArea onClick={() => {
      navigate("/stats/" + songId);
    }}>
      <Grid item xs={12} style={{ padding: "10px" }}>
        <div className="score">Best Score: {score}</div>
        <div className="songtitle">{title}</div>
        <div className="author">{author} </div>
      </Grid>
    </CardActionArea>
  );
};
