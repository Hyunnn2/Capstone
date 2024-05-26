import React from 'react';

const VideoPlayer = () => {
    return (
        <>
            <img src="http://203.255.57.136:5255/video_feed" alt="Video Feed" width={'100%'} height={'100%'} style={{ overflow: 'hidden', objectFit: 'cover'}}/>
        </>
    );
}

export default VideoPlayer;
