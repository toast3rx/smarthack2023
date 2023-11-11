import { useEffect, useState } from "react";
import AudioContext from "./../contexts/AudioContext";
import autoCorrelate from "./../libs/AutoCorrelate";
import {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
} from "./../libs/Helpers";

const audioCtx = AudioContext.getAudioContext();
const analyserNode = AudioContext.getAnalyser();
const buflen = 2048;
var buf = new Float32Array(buflen);

const songDuration = 180; //(s)
const tempo = 1; // (batai / s)
let startTime;
// const v_ref = [1000, 2000, 3000]; // hardcodat vectorul de referinta
let beats_elapsed = 0; // cate batai au trecut
const beats_freq = 4; // la cate batai esantionez
const durata_bataie = 1000; // in milisecunde
let input_values = [];
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

export const Api = () => {
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
      if (beats_elapsed % beats_freq === 0) {
        console.log(input_values);
        input_values = [];
      }
      console.log("elapsed", thisTime - startTime);
      startTime = thisTime;
      beats_elapsed++;
      console.log("beats elapsed", beats_elapsed);
    }
    // daca nu sunt in perioada care imi trebuie, nu am nevoie sa citesc macar datele de la microfon
    if (beats_elapsed % beats_freq !== 0)
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

  return (
      <div className="flex flex-col items-center">
        {!started ? (
          <button
            className="start"
            onClick={start}
          >
            Start
          </button>
        ) : (
          <button
            className="stop"
            onClick={stop}
          >
            Stop
          </button>
        )}
      </div>
  );
}
