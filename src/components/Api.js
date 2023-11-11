import { useState } from "react";

export const Api = () => {
    const songDuration = 242;  // 4:02
    const songBPM = 151;  // beats per minute
    const bpm = songBPM / 1;
    const bps = bpm / 60;

    const listenRatio = 1 / 4;
    const startListen = 1;  // start listening after `startListen` beats

    const [dataRef1, setDataRef1] = useState([0.0]);
    const [inputData1, setInputData1] = useState([0.0]);
    const [dataRef2, setDataRef2] = useState([0.0]);
    const [inputData2, setInputData2] = useState([0.0]);
    const [dataRef3, setDataRef3] = useState([0.0]);
    const [inputData3, setInputData3] = useState([0.0]);
    const [dataRef4, setDataRef4] = useState([0.0]);
    const [inputData4, setInputData4] = useState([0.0]);

    const refFiles = ["/data/you_ref.wav", "/data/tried_ref.wav", "/data/fell_ref.wav", "/data/trying_ref.wav"]
    const inputFiles = ["/data/you1.wav", "/data/tried1.wav", "/data/fell1.wav", "/data/trying1.wav"]
    // const [dataRef, setDataRef] = useState([0.0]);
    // const [inputData, setInputData] = useState([0.0]);

    let dataRef = [];
    let inputData = [];

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

    async function wavCompare() {
        for (let i = 0; i < refFiles.length; i++) {
            let r = await readAudio(refFiles[i]);
            dataRef.push(r);
            // console.log("dataRef[" + i + "] len:" + r.length);
        }
        for (let i = 0; i < inputFiles.length; i++) {
            let r = await readAudio(inputFiles[i]);
            inputData.push(r);
            // console.log("inputData[" + i + "] len:" + r.length);
        }

        for (let i = 0; i < dataRef.length; i++) {
            console.log("comparison for index " + i + ": " + dataBinsCompare(dataRef[i], inputData[i]))
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

    const buttonClick = () => {
        console.log("Button clicked");
    }

    return (
        <div>
            <button onClick={buttonClick}> Click me </button>
            <button onClick={() => {wavCompare()}}> Test </button>
        </div>

    );
}