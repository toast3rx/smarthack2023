import { Grid, Tooltip, Typography, Button } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./styles/SongStat.css";
import { records } from "./Records";

import {
  CartesianAxis,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { SongItem } from "./SongItem";
import { LastPlayed } from "./LastPlayed";
import { useNavigate } from "react-router";
import { SongRecords } from "./SongRecords";
const songs = [
  {
    title: "I'm yours",
    author: "Jason Mraz",
    score: "65%",
  },
  {
    title: "Kilobita mea",
    author: "Fara zahar",
    score: "90%",
  },
  {
    title: "Someone You Loved",
    author: "Lewis Capaldi",
    score: "34%",
  },
  {
    title: "Dragostea din Tei",
    author: "O-Zone",
    score: "87%",
  },
  {
    title: "Wonderwall",
    author: "Oasis",
    score: "33",
  },
  {
    title: "LIke a Rolling Stone",
    author: "Bob Dylan",
    score: "84%",
  },
  {
    title: "Believer",
    author: "Imagine Dragons",
    score: "45%",
  },
  {
    title: "Shape of You",
    author: "Ed Sheeran",
    score: "23%",
  },
  {
    title: "Für Elise",
    author: "Ludwig van Beethoven",
    score: "82%",
  },
  {
    title: "Hallelujah",
    author: "Leonard Cohen",
    score: "57%",
  },
  {
    title: "Stairway to Heaven",
    author: "Led Zeppelin",
    score: "76%",
  },
  {
    title: "I want to Hold Your Hand",
    author: "The Beatles",
    score: "40%",
  },
  {
    title: "Purple Haze",
    author: "Jimi Hendrix",
    score: "62%",
  },
  {
    title: "Rolling in the Deep",
    author: "Adele",
    score: "92",
  },
];

const data = [
  {
    name: "score A",
    pv: "25 oct",
    uv: 90 / 2 ,
    amt: 97 / 2,
  },
  {
    name: "score B",
    pv: "26 oct",
    uv: 89 / 2,
    amt: 89 / 2,
  },
  {
    name: "score C",
    pv: "27 oct",
    uv: 83 / 2,
    amt: 83 / 2,
  },
  {
    name: "score D",
    pv: "28 oct",
    uv: 79 / 2,
    amt: 79 / 2,
  },
  {
    name: "score E",
    pv: "29 oct",
    uv: 73 / 2,
    amt: 73 / 2,
  },
  {
    name: "score F",
    pv: "30 oct",
    uv: 71 / 2,
    amt: 71 / 2,
  },
  {
    name: "score G",
    pv: "31 oct",
    uv: 67 / 2,
    amt: 67 / 2,
  },
  {
    name: "score G",
    pv: "31 oct",
    uv: 61 / 2,
    amt: 61 / 2,
  },
];


export const SongStat = () => {
  const { songID } = useParams();
  // console.log(songID);
  const song = songs[songID];
  // useEffect (() => {
  //   let newData = [];
  //   data.forEach((elem) => {
      
  //   });
  // }, []);
  const navigate = useNavigate();

  return (
    <Grid container style={{ padding: "40px" }}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <div className="songTitle">{song.title}</div>
            <div className="author">{song.author}</div>
          </Grid>
        </Grid>
      </Grid>

      {/* Activity */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <div class="horizontal-bar"></div>
          </Grid>
          {/* CHART */}
          <Grid item xs={12} style={{ marginTop: "40px" }}>
            <LineChart width={300} height={200} data={data}>
              <CartesianAxis strokeDasharray="3 3" />
              <XAxis interval={6} type="category" />
              <YAxis interval={3}  type="number" domain={[0, 60]} />
              <Tooltip />
              <Line dot={false} dataKey="uv" stroke="#dbb82a" strokeWidth={4} />
            </LineChart>
          </Grid>
        </Grid>
      </Grid>
      {/* CHART END */}

      {/* LAST PLAYED */}
      <Grid item xs={12}>
        <Grid container className="songs-container">
          <Grid item xs={12}>
            <div className="last-played"></div>
          </Grid>
          <Grid item xs={12}>
            {/* <LastPlayed length={3} /> */}
            <SongRecords song={songID}/>
          </Grid>
        </Grid>
      </Grid>
      {/* LAST PLAYED END */}

      <Grid item xs={12}>
        <button className="practice-button" onClick={() => {
          navigate("/song");
        }}>Practice</button>
        </Grid>
    </Grid>
  );
};
