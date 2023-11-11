import { Grid } from "@mui/material";
import "./styles/Song.css";

export const Song = () => {

	const blankSpace = " ";

  return (
    <Grid container>
      <Grid item xs={12} textAlign={"center"} className = "tab">
        <p> {blankSpace.repeat(0)} Song </p>
		<p>1234567890</p>
      </Grid>
    </Grid>
  );
};
