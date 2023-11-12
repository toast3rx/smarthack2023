import { Dialog, DialogTitle, Grid, List } from "@mui/material";
import "./styles/MusicTab.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { clear } from "localforage";

export const MusicTab = ({ bpm, seconds }) => {
  const tabBckup = [
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
  const [verseIndex, setVerseIndex] = useState(-1);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  //////////////////////////////////
  //// Format tab into an array/////
  //////////////////////////////////
  const formatTab = (index) => {
    let array = [];

    chordMap.clear();

    if (tabBckup[index] !== undefined) setTab(tabBckup[index].split("\n"));

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

  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timer, setTimer] = useState(3);

  const [buttonText, setButtonText] = useState("Start");

  /////////////////////////////////////////////
  //////  Start timer after button click //////
  /////////////////////////////////////////////
  useEffect(() => {
    let interval = null;
    if (buttonClicked) {
      interval = setInterval(() => {
        if (timer > 1) {
          setButtonText(timer - 1);
          setTimer(timer - 1);
        }
        if (timer === 1) {
          clearInterval(interval);
          setIsPlaying(true);
          setButtonClicked(false);
          setButtonText("Listening...");
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [buttonClicked, timer]);

  /////////////////////////////////////////////
  //////  Change tabs //////
  /////////////////////////////////////////////
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      if (verseIndex === 0) setVerseIndex(verseIndex + 1);
      interval = setInterval(() => {
        if (verseIndex < tabBckup.length) {
          setVerseIndex(verseIndex + 1);
        } else {
          setIsPlaying(false);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, verseIndex]);

  /////////////////////////////////////////////
  //////  Format tab //////
  /////////////////////////////////////////////
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
          {formatedTab}
        </p>
      </Grid>

      <Grid item xs={12}>
        <button
          className="button"
          onClick={() => {
            setButtonClicked(true);
            setButtonText(timer);
          }}
        >
          {buttonText}
        </button>
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
