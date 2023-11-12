import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles/Metronome.css";

export const Metronome = ({ bpm, isPlaying, startIndex }) => {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setIndex((index + 1) % 4);
        // startIndex++;
        // localStorage.setItem("metro", startIndex);
      }, bpm);
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
