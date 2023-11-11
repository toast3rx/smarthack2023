import { useEffect, useState } from "react";
import AudioCtxt from "../contexts/AudioCtxt";
import autoCorrelate from "./../libs/AutoCorrelate";
import {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
} from "./../libs/Helpers";

const audioCtx = AudioCtxt.getAudioContext();
const analyserNode = AudioCtxt.getAnalyser();
const buflen = 2048;
var buf = new Float32Array(buflen);

let startTime;
let beats_elapsed = 0; // cate batai au trecut
const beats_freq = 4; // la cate batai esantionez  == 1 / listenRatio
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

const refFiles = ["/data/you_ref.wav", "/data/tried_ref.wav", "/data/fell_ref.wav", "/data/trying_ref.wav"]
const inputFiles = ["/data/you1.wav", "/data/tried1.wav", "/data/fell1.wav", "/data/trying1.wav"]
let refData = [];
let inputData = [];

async function readAudio(url) {
    let audioData = await fetch(url).then(r => {
        return r.arrayBuffer();
    });
    let audioCtx = new AudioContext({sampleRate:8000});
    // audio is resampled to the AudioContext's sampling rate
    try {
        let decodedData = await audioCtx.decodeAudioData(audioData);
        // console.log(decodedData.length, decodedData.duration,
        //         decodedData.sampleRate, decodedData.numberOfChannels);
        let float32Data = decodedData.getChannelData(0); // Float32Array for channel 0
        return float32Data;
    } catch (err) {
        console.log(
            `Unable to fetch the audio file: ${url} Error: ${err.message}`,
            );
    }
}

async function loadRefData() {
    refData = [];
    for (let i = 0; i < refFiles.length; i++) {
        let r = await readAudio(refFiles[i]);
        refData.push(r);
        console.log("dataRef[" + i + "] len:" + r.length);
    }
}

// async function loadInputData() {
//     inputData = [];
//     for (let i = 0; i < inputFiles.length; i++) {
//         let r = await readAudio(inputFiles[i]);
//         inputData.push(r);
//         console.log("inputData[" + i + "] len:" + r.length);
//     }
// }

let refIndex = 0;
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
        refIndex = (beats_elapsed - 1) % beats_freq;
        console.log("---->", refIndex);

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
        loadRefData();
        // loadInputData();

        if (source != null) {
            source.connect(analyserNode);
            // seteaza timpul epoch cand butonul e apasat
            startTime = Date.now();
        }
    }, [source]);

    // const [dataRef1, setDataRef1] = useState([0.0]);
    // const [inputData1, setInputData1] = useState([0.0]);
    // const [dataRef2, setDataRef2] = useState([0.0]);
    // const [inputData2, setInputData2] = useState([0.0]);
    // const [dataRef3, setDataRef3] = useState([0.0]);
    // const [inputData3, setInputData3] = useState([0.0]);
    // const [dataRef4, setDataRef4] = useState([0.0]);
    // const [inputData4, setInputData4] = useState([0.0]);

    // const [dataRef, setDataRef] = useState([0.0]);
    // const [inputData, setInputData] = useState([0.0]);


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
        let averageB = absB.reduce((x, y) => x + y) / absB.length;
        return 1 - Math.abs(averageA - averageB) / averageA;
    };

    function wavCompare(inputDataBin, refIndex) {
        let result = dataBinsCompare(refData[refIndex], inputDataBin);
        console.log("comparison for index " + refIndex + ": " + result);
    }

    async function _wavCompare() {
        for (let i = 0; i < inputData.length; i++) {
            wavCompare(inputData[i], i);
        }

        // ////
        // await readAudio(refFiles[0]).then(r => dataRefa.push(r));
        // console.log("you_ref length: ", dataRefa[0].length);
        // readAudio(inputFiles[0]).then(r => setInputData1(r));
        // console.log("you1 length: ", inputData1.length);
        // console.log("you: " + compareArrays(dataRefa[0], inputData1));
        // ////
        // await readAudio(refFiles[1]).then(r => dataRefa.push(r));
        // console.log("tried_ref length: ", dataRefa[1].length);
        // readAudio(inputFiles[1]).then(r => setInputData2(r));
        // console.log("tried1 length: ", inputData2.length);
        // console.log("tried: " + compareArrays(dataRefa[1], inputData2));
        // ////
        // await readAudio(refFiles[2]).then(r => dataRefa.push(r));
        // console.log("fell_ref length: ", dataRefa[2].length);
        // readAudio(inputFiles[2]).then(r => setInputData3(r));
        // console.log("fell1 length: ", inputData3.length);
        // console.log("fell: " + compareArrays(dataRefa[2], inputData3));
        // ////
        // await readAudio(refFiles[3]).then(r => dataRefa.push(r));
        // console.log("trying_ref length: ", dataRefa[3].length);
        // readAudio(inputFiles[3]).then(r => setInputData4(r));
        // console.log("trying1 length: ", inputData4.length);
        // console.log("trying: " + compareArrays(dataRefa[3], inputData4));
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

    const buttonClick = () => {
        console.log("Button clicked");
    }

    // return (
    //     <div>
    //         <button onClick={buttonClick}> Click me </button>
    //         <button onClick={() => {_wavCompare()}}> Test </button>
    //     </div>

    // );
    return (
        <div className="flex flex-col items-center">
            {/* <button onClick={buttonClick}> Click me </button>
            <button onClick={() => {_wavCompare()}}> Test </button> */}
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
