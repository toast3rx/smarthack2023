export const Api = () => {

    const buttonClick = () => {
        console.log("Button clicked");
    }

    async function wavCompare() {
        readAudio("data/ref1_16.wav");
    }

    async function readAudio(url) {
        let audioData = await fetch(url).then(r => r.arrayBuffer());
        console.log(`${audioData.length}`);
        let audioCtx = new AudioContext({sampleRate:8000});
        // audio is resampled to the AudioContext's sampling rate
        try {
            let decodedData = await audioCtx.decodeAudioData(audioData);
            console.log(decodedData.length, decodedData.duration,
                    decodedData.sampleRate, decodedData.numberOfChannels);
            let float32Data = decodedData.getChannelData(0); // Float32Array for channel 0
            // processAudio(float32Data);  // PCM Float32 is between -1 to +1
            console.log("test " + float32Data);
        } catch (err) {
            console.log(
                `Unable to fetch the audio file: ${url} Error: ${err.message}`,
              );
        }
      }

    return (
        <div>
            <button onClick={buttonClick}> Click me </button>
            <button onClick={() => {wavCompare(2)}}> Test </button>
        </div>

    );
}