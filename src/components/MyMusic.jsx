import { Grid } from "@mui/material";
import "./styles/MyMusic.css"
import { LastPlayed } from "./LastPlayed";

export const MyMusic = () => {
  return (
    <Grid container style={{ padding: "40px" }}>
      <Grid item xs={12}>
        <div className="music-title"> My Music </div>
      </Grid>
	  <Grid item xs={12}>
		<LastPlayed />
		</Grid>
    </Grid>
  );
};
