import { CardActionArea, Grid } from "@mui/material";
import "./styles/RecordItem.css";
import "./styles/SongItem.css";

export const RecordItem = ({ date, score }) => {
  return (
    <CardActionArea>
      <Grid item xs={12} style={{ padding: "10px" }}>
        <div className="score">Score: {score}</div>
        <div className="date">{date} </div>
      </Grid>
    </CardActionArea>
  );
};
