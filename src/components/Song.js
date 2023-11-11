import { Grid } from "@mui/material";
import "./styles/Song.css";
import { MusicTab } from "./MusicTab";
import { useState } from "react";

export const Song = () => {
  return (
    <Grid container>
      <Grid item xs={12} className="tab">
        <h2>Song</h2>
        <h3 style={{ color: "grey" }}>Author</h3>
      </Grid>
      <MusicTab bpm="151" seconds={6300}/>
    </Grid>
  );
};
