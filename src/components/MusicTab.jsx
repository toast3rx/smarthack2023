import { Grid } from "@mui/material";
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

    `[G]Doo do do doo doo do, [D]doo do doo do [Em]doo do
Do you want to come on,[D] scooch on over [C]closer, dear
And I will nibble your [A7]ear`,

    `I've been spending [G]way too long checking my tongue in the mirror
And [D]bending over backwards just to try to see it clearer
But [Em]my breath fogged up the glass
And so I [C]drew a new face and I laughed
I [G]guess what I'll be saying is there ain't no better reason
To [D]rid yourself of vanities and just go with the seasons
It'[Em]s what we aim to do
Our [C]name is our virtue`,

    `But [G]I won't hesi[D]ta[Dsus4]te   
No more, no [Em]more
It cannot [C]wait; I'm you[G]rs
Well, open up your mind and see like [D]me
Open up your plans and damn you're f[Em]ree
Look into your heart and you'll find that[C] the sky is yours
So [G]please don't, please don't, please don't
There's no [D]need to c[Dsus4]omplicate
'Cause our [Em]time is short
This oh, this oh, this is our [C]fate
I'm you[A7]rs`,

    `Brr-ba-mmm, da-ba-mmm-d[G]ay
T-du, du, t-du, du, t-du, dudu, d[D]u-u, du-du
[Em]     Oh, [C]I'm yours
Oh, I'm [G]yours
Oh-oh-oh-oh, whoa-oh-[D]oh-oh
Baby, do believe I'm yo[Em]urs
You best believe, you best believe I'm y[C]ours
`,
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

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setChordIndex((chordIndex + 1) % chordMap.length);
    }, 2000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [chordIndex]);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
	  setChordIndex(0);
      setVerseIndex((verseIndex + 1) % tabBckup.length);
    }, seconds);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [verseIndex]);

  useEffect(() => {
    formatTab(verseIndex);
  }, [verseIndex]);

  return (
    <Grid container className="container">
      <Grid item xs={12}>
        <MusicNoteIcon /> {"= " + bpm}
      </Grid>
      <Grid item xs={12}>
        <Button>Color Chords</Button>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {formatedTab.map((row, index) => {
			if (index === chordIndex) {
			  return <span style={{color:"red"}}>{row}</span>;
			} else {
			  return row;
			}
		  })}
        </p>
      </Grid>
    </Grid>
  );
};
