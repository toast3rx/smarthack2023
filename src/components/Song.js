import { Grid } from "@mui/material";
import "./styles/Song.css";
import { MusicTab } from "./MusicTab";
import { useState } from "react";

export const Song = ({title="I'm Yours", author="Jason Mraz", bestScore="40%"}) => {
  return (
    <Grid container style={{ padding: "40px" }}>
      <Grid item xs={12}>
        <div className="song-title">{title}</div>
        <div className="score">Best Score: {bestScore}</div>
        <div className="author">{author} </div>
        <hr className="rounder" />
      </Grid>
      <div style={{marginTop: "40px", height: "10px", width: "10px"}}></div>
      <MusicTab bpm="151" seconds={6300}/>
    </Grid>
  );
};
