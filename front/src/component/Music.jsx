import React, { useRef, useState } from "react";

const Music = (props) => {
    let audioTrack = new Audio(props.track);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioPromiseRef = useRef(Promise.resolve());
    const start = () => {
        setIsPlaying(true);
        audioPromiseRef.current.then(() => audioTrack.play());
        audioTrack.volume = 0.1;
        console.log(isPlaying);
    };
    const stop = () => {
        setIsPlaying(false);
        audioPromiseRef.current.then(() => audioTrack.pause());
    };

    return (
        <div>
            <button onClick={isPlaying ? stop : start}>Play | Pause</button>
            <button onClick={stop}>11</button>
        </div>
    );
};

export default Music;
