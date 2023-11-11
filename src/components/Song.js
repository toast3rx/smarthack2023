import { Grid } from "@mui/material";
import "./styles/Song.css";

export const Song = () => {
  return (
    <Grid container>
      <Grid item xs={12} textAlign={"center"} className = "tab">
        <h1> Song{' '}  </h1>
      </Grid>
    </Grid>
  );
};
