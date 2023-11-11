import { Dialog, DialogTitle, Grid, List } from "@mui/material";
import "./styles/MusicTab.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";

export const MusicTab = ({ bpm, seconds }) => {
  const tabBckup = [
    `Before the [G]cool done run out, I'll be givin' it my bestest
and [D]nothin's gonna stop me but divine intervention
I [Em]reckon it's again my turn
To [C]win some or learn some`,

    `But [G]I won't hesi[D]tate
No more, no [Em]more
It cannot [C]wait; I'm you[G]rs  [D]    [Em]     [C]`,

    `[G]  Well, open up your mind and see like [D]me
Open up your plans and damn you're [Em]free
Look into your heart and you'll find [C]love, love, love, love`,

    `[G]Listen to the music of the moment, people dance [D]and sing, we're just one big fami[Em]ly
And it's our God-forsaken right to be [C]loved, loved, loved, loved, [A7]loved`,

    `So [G]I won't hesi[D]tat[Dsus4]e    
No more, no [Em]more
It cannot [C]wait, I'm sure
There's no [G]need to compli[D]cate
Our time is [Em]short
This is our [C]fate, I'm yours`,
  ];

  const [tab, setTab] = useState([
    `Well, [G]you done done me in; you bet I felt it`,
    `I [D]tried to be chill but you're so hot that I melted`,
    `I [Em]fell right through the cracks`,
    `Now I'm [C]tryin' to get back`,
  ]);
  const [formatedTab, setFormatedTab] = useState([]);

  const blankSpace = " ";

  let chordMap = new Map();

  const [chordIndex, setChordIndex] = useState(0);

  const [verseIndex, setVerseIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const formatTab = (index) => {
    let array = [];

    chordMap.clear();

    setTab(tabBckup[index].split("\n"));

    for (let i = 0; i < tab.length; i++) {
      let index;
      let verse = "";
      let verseWithoutChord = tab[i];
      let chordRow = "";

      while ((index = verseWithoutChord.indexOf("[")) > -1) {
        // add blank spaces in front of chord
        chordRow += blankSpace.repeat(index);

        // add chord
        chordRow += verseWithoutChord.substring(
          index + 1,
          verseWithoutChord.indexOf("]")
        );

        let chordLen = verseWithoutChord.substring(
          index + 1,
          verseWithoutChord.indexOf("]")
        ).length;
        chordMap.set({ row: i, col: index }, chordLen);

        // add the verse before the chord
        verse += verseWithoutChord.substring(0, index);

        // remove text before chord + the chord
        verseWithoutChord = verseWithoutChord.substring(
          verseWithoutChord.indexOf("]") + 1
        );
      }

      // add the remaining of the verse
      verse += verseWithoutChord + "\n";
      chordRow += "\n";

      array.push(chordRow, verse);
    }
    setFormatedTab(array);
  };

  const playStart = () => {
    setIsPlaying(true);
    console.log("play");
  }

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      if (isPlaying) setChordIndex((chordIndex + 1) % chordMap.length);
    }, 2000);

    //Clearing the interval
    return () => {
      clearInterval(interval);
    };
  }, [chordIndex]);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setChordIndex(0);
      if (isPlaying) setVerseIndex((verseIndex + 1) % tabBckup.length);
    }, seconds);

    //Clearing the interval
    return () => {
      if (verseIndex === tabBckup.length - 1) {
        setIsPlaying(false);
      }
      clearInterval(1000);
    };
  }, [verseIndex]);

  useEffect(() => {
    formatTab(verseIndex);
  }, [verseIndex]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="tab">
          <MusicNoteIcon /> {"= " + bpm}
        </div>
      </Grid>
      <Grid item xs={12}>
        <p className="tab" style={{ whiteSpace: "pre-wrap" }}>
          {formatedTab.map((row, index) => {
            if (index === chordIndex) {
              return <span style={{ color: "red" }}>{row}</span>;
            } else {
              return row;
            }
          })}
        </p>
      </Grid>

      <Grid item xs={12}>
        <button className="button" onClick={playStart}> Start </button>
      </Grid>
    </Grid>
  );
};

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}></List>
    </Dialog>
  );
}
