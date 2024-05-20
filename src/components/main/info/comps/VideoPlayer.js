import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = () => {
    return (
        <div>
            <img src="http://203.255.57.136:5255/video_feed" alt="Video Feed" />
        </div>
    );
}

export default VideoPlayer;
