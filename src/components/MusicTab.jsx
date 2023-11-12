import { Dialog, DialogTitle, Grid, List } from "@mui/material";
import "./styles/MusicTab.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { clear } from "localforage";
import { Metronome } from "./Metronome";
import AudioCtxt from "../contexts/AudioCtxt";
import autoCorrelate from "./../libs/AutoCorrelate";
import {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
} from "./../libs/Helpers";

export const MusicTab = ({ bpm1=151, seconds = 6358 }) => {
  //////////////////////////////////////////////////////////
  /////////////////// Sound utils /////////////////////////
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
const audioCtx = AudioCtxt.getAudioContext();
const analyserNode = AudioCtxt.getAnalyser();
const buflen = 2048;
const treshold = 35; // Hz
var buf = new Float32Array(buflen);
const G = [
    154.95703700500525,
    154.95703700500525,
    155.2020176210264,
    155.2020176210264,
    155.2020176210264,
    154.33004197731472,
    154.33004197731472,
    154.33004197731472,
    155.94965770600308,
    155.94965770600308,
    155.94965770600308,
    156.01433723960068,
    156.01433723960068,
    156.01433723960068,
    155.56131606188447,
    155.56131606188447,
    156.01298787021528,
    156.01298787021528,
    156.01298787021528,
    156.79459735151514,
    156.79459735151514,
    156.79459735151514,
    156.73900866620997,
    156.73900866620997,
    156.73900866620997,
    155.59451758931732,
    155.59451758931732,
    155.59451758931732,
    155.2602833783648,
    155.2602833783648,
    155.2602833783648,
    155.7109365642574,
    155.7109365642574,
    155.7109365642574,
    154.29283244201224,
    154.29283244201224,
    155.57099833380647,
    155.57099833380647,
    154.93927739000847,
    154.93927739000847,
    154.93927739000847,
    156.20549234328138,
    156.20549234328138,
    156.20549234328138,
    154.8582052498462,
    154.8582052498462,
    154.8582052498462,
    153.019650913888,
    153.019650913888,
    153.019650913888,
    150.47646879905713,
    150.47646879905713,
    150.47646879905713
]
const D = [
    92.88718785590801,
    92.88718785590801,
    92.88718785590801,
    92.88687096473507,
    92.88687096473507,
    92.88687096473507,
    92.85926708096778,
    92.85926708096778,
    92.67489865823453,
    92.67489865823453,
    92.67489865823453,
    92.68150433606306,
    92.68150433606306,
    92.68150433606306,
    92.63060439728365,
    92.63060439728365,
    92.82674379583169,
    92.82674379583169,
    92.82674379583169,
    92.96142732919738,
    92.96142732919738,
    92.96142732919738,
    92.87946269194394,
    92.87946269194394,
    92.69962748644753,
    92.69962748644753,
    92.69962748644753,
    92.58568119278112,
    92.58568119278112,
    92.58568119278112,
    92.50863996654753,
    92.50863996654753,
    92.50863996654753,
    92.72137030510488,
    92.72137030510488,
    92.72137030510488,
    92.78469858539465,
    92.78469858539465,
    92.70979359505657,
    92.70979359505657,
    92.70979359505657,
    92.5677739724924,
    92.5677739724924,
    92.5677739724924,
    92.49125500127735,
    92.49125500127735,
    92.49125500127735,
    92.49955244467111,
    92.49955244467111,
    92.49955244467111,
    92.57572551440792,
    92.57572551440792
]
const Em = [
    82.28022367135884,
    82.28022367135884,
    82.28022367135884,
    81.61813623833372,
    81.61813623833372,
    81.61813623833372,
    82.1336217393093,
    82.1336217393093,
    82.1336217393093,
    82.0463831764343,
    82.0463831764343,
    82.0463831764343,
    81.88633663212643,
    81.88633663212643,
    82.00135596110034,
    82.00135596110034,
    82.00135596110034,
    82.19103455543913,
    82.19103455543913,
    82.19103455543913,
    81.6421357620395,
    81.6421357620395,
    81.6421357620395,
    81.75980852866427,
    81.75980852866427,
    81.75980852866427,
    153.4635790106287,
    153.4635790106287,
    153.4635790106287,
    82.10687391187675,
    82.10687391187675,
    82.34840104896578,
    82.34840104896578,
    82.34840104896578,
    82.05198586143695,
    82.05198586143695,
    82.05198586143695,
    82.31903602787021,
    82.31903602787021,
    82.31903602787021,
    82.16266473916913,
    82.16266473916913,
    82.16266473916913,
    81.96036723787248,
    81.96036723787248,
    81.96036723787248,
    82.36874717699109,
    82.36874717699109
]
const C = [
    82.44141312277861,
    82.15748785498769,
    82.15748785498769,
    82.15748785498769,
    82.32122915255839,
    82.32122915255839,
    82.32122915255839,
    82.65726552723955,
    82.65726552723955,
    82.65726552723955,
    82.7015800824605,
    82.7015800824605,
    82.7015800824605,
    82.6978547987299,
    82.6978547987299,
    82.6978547987299,
    82.48822124301398,
    82.48822124301398,
    82.37868131362656,
    82.37868131362656,
    82.37868131362656,
    82.63971700119016,
    82.63971700119016,
    82.63971700119016,
    82.26248412683928,
    82.26248412683928,
    82.26248412683928,
    82.21805316545388,
    82.21805316545388,
    82.21805316545388,
    83.11731224545228,
    83.11731224545228,
    83.11731224545228,
    82.47472692372914,
    82.47472692372914,
    82.13796128508923,
    82.13796128508923,
    82.13796128508923,
    82.7905119111075,
    82.7905119111075,
    82.7905119111075,
    82.19330299934909,
    82.19330299934909,
    82.19330299934909,
    82.34482268421687,
    82.34482268421687,
    82.45009020616163,
    82.45009020616163,
    82.32018255410539,
    82.32018255410539,
    82.32018255410539
]
const refData2 = [G, D, Em, C];
let startTime;
let beats_elapsed = 0; // cate batai au trecut
const beats_freq = 8; // la cate batai esantionez  == 1 / listenRatio
let input_values = [];


const songDuration = 242;  // 4:02
const songBPM = 151;  // beats per minute
const bpm = songBPM / 1;
const bps = bpm / 60;
const bpms = bps / 1000;
const durata_bataie = 1 / bpms; // in milisecunde

const listenRatio = 1 / 4;
const startListen = 1;  // start listening after `startListen` beats

const noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

async function readAudio(url) {
    let audioData = await fetch(url).then(r => {
        return r.arrayBuffer();
    });
    let audioCtx = new AudioContext({sampleRate:8000});
    // audio is resampled to the AudioContext's sampling rate
    try {
        let decodedData = await audioCtx.decodeAudioData(audioData);
        let float32Data = decodedData.getChannelData(0); // Float32Array for channel 0
        return float32Data;
    } catch (err) {
        console.log(
            `Unable to fetch the audio file: ${url} Error: ${err.message}`,
            );
    }
}

let refIndex = 0;
let zero = 0;

    const [source, setSource] = useState(null);
    const [started, setStart] = useState(false);
    const [pitchNote, setPitchNote] = useState("C");
    const [pitchScale, setPitchScale] = useState("4");
    const [pitch, setPitch] = useState("0 Hz");
    const [detune, setDetune] = useState("0");
    const [notification, setNotification] = useState(false);

    const updatePitch = (time) => {
        const thisTime = Date.now();
        analyserNode.getFloatTimeDomainData(buf);
        var ac = autoCorrelate(buf, audioCtx.sampleRate);
    
        if (thisTime - startTime >= durata_bataie) {
            if (beats_elapsed % beats_freq === 1) {
                console.log(refIndex);
                console.log(input_values);
                wavCompare(input_values, refIndex);
                input_values = [];
                refIndex++;
                refIndex %= (beats_freq / 2);
            }
            // console.log("elapsed", thisTime - startTime);
            startTime = thisTime;
            beats_elapsed++;
            // console.log("beats elapsed", beats_elapsed);
        }
        // daca nu sunt in perioada care imi trebuie, nu am nevoie sa citesc macar datele de la microfon
        // if ((beats_elapsed % beats_freq !== 1) && (beats_elapsed % beats_freq !== 2))
        if (beats_elapsed % beats_freq !== 1)
            return;

        // ma aflu in perioada corecta
        if (ac > -1) {
            let note = noteFromPitch(ac);
            let sym = noteStrings[note % 12];
            let scl = Math.floor(note / 12) - 1;
            let dtune = centsOffFromPitch(ac, note);
            setPitch(parseFloat(ac).toFixed(2) + " Hz");
            setPitchNote(sym);
            setPitchScale(scl);
            setDetune(dtune);
            setNotification(false);
            // pun frecventele in vectorul care e dat ca parametru in functia de comparare cu ref-ul
            input_values.push(ac);
        }
    };

    useEffect(() => {
        if (source != null) {
            source.connect(analyserNode);
            // seteaza timpul epoch cand butonul e apasat
            startTime = Date.now();
        }
    }, [source]);

    const absArray = (array) => {
        if (!array || !array.length) {
            return [0.0];
        }
        return array.map(Math.abs);
    }

    const dataBinsCompare = (a, b) => {
        let absA = absArray(a);
        let absB = absArray(b);
        let averageA = absA.reduce((x, y) => x + y) / absA.length;
        console.log("avgA = ", averageA);
        let averageB = absB.reduce((x, y) => x + y) / absB.length;
        console.log("avgB = ", averageB);

        if (Math.abs(averageA - averageB) > treshold)
            return 0;
        return 1;
    };

    function wavCompare(inputDataBin, refIndex) {
        // console.log("--->", refData2[refIndex]);
        let result = dataBinsCompare(refData2[refIndex], inputDataBin);
        console.log("comparison for index " + refIndex + ": " + result);
        setWaveRes(result);
    }

    setInterval(updatePitch, 1);

    const start = async () => {
        const input = await getMicInput();

        if (audioCtx.state === "suspended") {
        await audioCtx.resume();
        }
        setStart(true);
        setNotification(true);
        setTimeout(() => setNotification(false), 5000);
        setSource(audioCtx.createMediaStreamSource(input));
    };

    const stop = () => {
        source.disconnect(analyserNode);
        console.log("stopped");
        setStart(false);
    };

    const getMicInput = () => {
        return navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: true,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0,
        },
        });
    };
  

  const tabBckup = [
    `Before the [C]cool done run out, I'll be givin' it my bestest
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
  const [verseIndex, setVerseIndex] = useState(-1);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [missedNotes, setMissedNotes] = useState(0);
  const [correctNotes, setCorrectNotes] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

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

  const [score, setScore] = useState(100);

  const [wavRes, setWaveRes] = useState(0);

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
          setOpen(true);
        }
      }, seconds);
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

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setAverageScore(averageScore + 1);
      }, 1586);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, averageScore]);

  useEffect(() => {
    setAverageScore(averageScore + 1);
  }, [isPlaying]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="bpm">
          <MusicNoteIcon /> {"= " + bpm1}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Metronome bpm={397} isPlaying={isPlaying} />
      </Grid>
      <Grid item xs={12}>
        <p className="tab" style={{ whiteSpace: "pre-wrap" }}>
          {formatedTab}
        </p>
      </Grid>

      <Grid item xs={12}>
        <div className="scoreDiv"> Score: {wavRes}</div>
      </Grid>
      <Grid item xs={12}>
        <button
          className="button"
          onClick={() => {
            setButtonClicked(true);
            setButtonText(timer);
            start();
          }}
        >
          {buttonText}
        </button>
      </Grid>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        selectedValue={averageScore}
      />
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
      <DialogTitle>Your score: {selectedValue}</DialogTitle>
      <Grid container style={{ padding: "20px" }} justifyContent={"center"}>
        <button className="tryagainBtn"> Try again </button>
        <div style={{ height: "10px", width: "10px" }}></div>
        <button className="tryagainBtn"> Go Home </button>
      </Grid>

      <List sx={{ pt: 0 }}></List>
    </Dialog>
  );
}
