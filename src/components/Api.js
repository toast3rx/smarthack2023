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
const treshold = 30; // Hz
var buf = new Float32Array(buflen);
const G = [281.89645316086563, 281.78846776388224, 281.71181837209417, 281.71181837209417, 281.37436814050545, 280.87815608783524, 280.23967772848084, 279.5997418317667, 279.45405880430235, 279.45405880430235, 279.2936856325222, 279.64130014843823, 279.9615422812112, 280.4789511962733, 280.89113981123984, 281.21893117226165, 281.390746458746, 281.0984205404588, 281.14169659491716, 280.9059042543492, 280.779620576336, 280.5586633183073, 280.68886070555345, 280.9561572636438, 281.6062682390296, 281.35228173864095, 281.23036297472214, 281.05528771713256, 280.8499314909742, 280.9851797094314, 280.9489608463128, 281.1427987090268, 280.9958207951038, 281.24809999886685, 281.6791660778724, 281.6123277069699, 281.6123277069699, 848.4742290754757, 850.1934060451371];
const D = [267.04118261077457, 266.61828227005554, 266.3123320361729, 266.8246495844469, 266.71785870175046, 266.8810788551726, 267.1256696231094, 267.1256696231094, 267.93810614710213, 267.93810614710213, 268.2791418627627, 268.3991025862326, 268.47420403748146, 268.24621502406393, 268.06756828403877, 267.84460431232293, 267.5352074681435, 267.41625560979173, 267.3099195065884, 267.10637791781284, 267.23880775712973, 267.1336120890269, 267.2829498277189, 267.467829614391, 267.467829614391, 267.17043168393644, 267.01016347149977, 267.0126056262942, 266.819968376091, 267.1594390999192, 267.06399047973963, 267.21700044839776, 267.28100791612076, 267.1832821499579, 267.0629165481274, 266.86421283237064, 266.68063572926076, 266.3816031421185, 266.2430894296323, 265.7962120576346];
const Em = [282.27526339081857, 282.1760397958831, 282.2464951609591, 282.2243368625693, 282.0394666043041, 281.9542234606871, 282.0290139845071, 281.94025987863233, 282.16292541925384, 282.3665960085064, 282.3148774543607, 282.3148774543607, 282.27329582871977, 282.1445015046927, 281.7533593025302, 281.68161499657276, 281.5184390984805, 281.6278505824107, 282.02268623262825, 282.3014906085837, 282.57547474196076, 282.9133546018473, 282.9328395141598, 282.6796695652784, 282.58627901803317, 282.3431117940387, 282.2539046443656, 282.36480477515056, 282.43806061699166, 282.651745162257, 282.7161829368138, 282.73718846518875, 282.5610020332053, 282.27222581222173, 282.1411566496396, 282.0633540257242, 282.23671903651217, 282.7532249337828, 283.16805026691];
const C = [163.46578450921382, 163.8301395174313, 164.19336848304104, 164.36906878559802, 164.4493119515476, 164.7737535172488, 164.94569759942522, 165.30809114244332, 165.6303438634042, 166.58018058645897, 166.45266426720866, 166.07625533844922, 166.07625533844922, 166.0497228106176, 165.73579964451488, 165.73579964451488, 165.09562196786172, 165.09562196786172, 164.9492549304946, 164.62512985333208, 164.62512985333208, 164.5022531827985, 164.51977301468236, 164.68018124700828, 164.5457494169537, 164.5457494169537, 164.5900917001079, 164.5900917001079, 164.89298899475412, 111.56987936207871, 111.56987936207871, 112.0997012256104, 112.0997012256104, 110.92332784602476, 110.84629467488425, 166.9264480018344, 167.0241253299778, 167.0241253299778];
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

// const refFiles = ["/data/you_ref.wav", "/data/tried_ref.wav", "/data/fell_ref.wav", "/data/trying_ref.wav"]
// const refFiles = ["./data/you.ref", "./data/tried.ref", "./data/fell.ref", "/data/trying.ref"]
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

// async function loadRefData() {
//     refData = [];
//     for (let i = 0; i < refFiles.length; i++) {
//         // let audioData = await fetch(refFiles[i]).then(r => {
//         //     return r.arrayBuffer();
//         // });
//         let r = await readAudio(refFiles[i]);
//         // let r = audioCtx.decodeAudioData(audioData)
//         refData.push(r);
//         console.log("dataRef[" + i + "] len:" + r.length);
//     }
// }

// function loadRefData2() {
//     refData = [];
//     for (let i = 0; i < refFiles.length; i++) {
//         const obj = JSON.parse(refFiles[i]);
//         console.log(obj.data);
//         refData.push(obj.data);
//     }
// }

let refIndex = 0;
let zero = 0;
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
                console.log(refIndex);
                // console.log(input_values);
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
        // loadRefData2();
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
        console.log("avgA = ", averageA);
        let averageB = absB.reduce((x, y) => x + y) / absB.length;
        console.log("avgB = ", averageB);

        // return 1 - Math.abs(averageA - averageB) / averageA;
        if (Math.abs(averageA - averageB) > treshold)
            return 0;
        return 1;
    };

    function wavCompare(inputDataBin, refIndex) {
        // console.log("--->", refData2[refIndex]);
        let result = dataBinsCompare(refData2[refIndex], inputDataBin);
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
