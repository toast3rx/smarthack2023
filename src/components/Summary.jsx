import { Grid, Tooltip, Typography, Button } from "@mui/material";
import { useState } from "react";
import "./styles/Summary.css";
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

const data = [
  {
    name: "Page A",
    pv: "25 oct",
    uv: 20,
    amt: 20,
  },
  {
    name: "Page B",
    pv: "26 oct",
    uv: 18,
    amt: 18,
  },
  {
    name: "Page C",
    pv: "27 oct",
    uv: 24,
    amt: 24,
  },
  {
    name: "Page D",
    pv: "28 oct",
    uv: 22,
    amt: 22,
  },
  {
    name: "Page E",
    pv: "29 oct",
    uv: 27,
    amt: 27,
  },
  {
    name: "Page F",
    pv: "30 oct",
    uv: 28,
    amt: 28,
  },
  {
    name: "Page G",
    pv: "31 oct",
    uv: 26,
    amt: 26,
  },
];

export const Summary = () => {
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  return (
    <Grid container style={{ padding: "40px" }}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="date" gutterBottom>
              {date.toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="summary">Summary</div>
          </Grid>
        </Grid>
      </Grid>

      {/* Activity */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <div className="activity">Activity</div>
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
        <Grid container>
          <Grid item xs={12}>
            <div className="last-played">Last played</div>
          </Grid>
          <Grid item xs={12}>
            <LastPlayed length={3} />
          </Grid>
        </Grid>
      </Grid>
      {/* LAST PLAYED END */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <button
              onClick={() => navigate("/mymusic")}
              className="button-play"
            >
              Start Playing
            </button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
