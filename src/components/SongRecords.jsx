import { Divider, Grid } from "@mui/material";
import "./styles/LastPlayed.css";
import { RecordItem } from "./RecordItem";
import { records } from "./Records";

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

export const SongRecords = ({length = 3, songID = 0}) => {
  
  return (
    <Grid container className="record-container">
        {
            records[songID].info.map((record, index) =>
            index !== records[songID].info.length - 1 ? (
            <>
                <RecordItem
                date={record.date}
                score={record.score}
                />
                <Grid item xs={12}>
                <hr className="rounded" />
                </Grid>
            </>
            ) : (
            <RecordItem
                date={record.date}
                score={record.score}
            />
            )
      )
        }
    </Grid>
  );
};
