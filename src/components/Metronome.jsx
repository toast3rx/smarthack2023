import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles/Metronome.css";

export const Metronome = ({ bpm, isPlaying }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setIndex((index + 1) % 4);
      }, bpm);
    } else {
      setIndex(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, index]);
  return (
    <Grid container>
      {[0, 1, 2, 3].map((i) => {
        if (i === index) {
          return (
            <Grid item xs={3}>
              <div
                style={{
                  backgroundColor: "#7fbeec9d",
                  borderColor: "#7fbeec9d",
                }}
                className="type"
                key={i}
              ></div>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={3}>
              <div className="type circle" key={i}></div>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};
