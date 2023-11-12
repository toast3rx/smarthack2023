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

export const SongStat = () => {
  const { songID } = useParams();
  const [data, setData] = useState([]);

  // console.log(songID);
  const song = songs[songID];
  let newData = [];
  useEffect (() => {
    newData = [];
    console.log(records[songID]);
    records[songID].info.forEach((elem, idx) => {
        newData.push({name: `record ${idx}`, pv: idx, uv: elem.score / 2, amt: elem.score / 2});
    });
    setData(newData);
  }, []);
  
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
          {console.log("--->", data)}
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
            <SongRecords songID={songID}/>
          </Grid>
        </Grid>
      </Grid>
      {/* LAST PLAYED END */}
    </Grid>
  );
};
