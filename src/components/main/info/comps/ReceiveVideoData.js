import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebSocketVideoData from '../../../../WebSocketVideoData';
import { setVideoData } from '../../../../redux/reducer/reducer';

const ReceiveVideoData = () => {
  const dispatch = useDispatch();
  const [videoURL, setVideoURL] = useState(null);
  const videoData = useSelector(state => state.videoData);

  useEffect(() => {
    const ip = '203.255.57.136';
    const port = 5253;

    const onDataReceived = (data) => {
      dispatch(setVideoData(data)); // 비디오 데이터를 Redux 스토어에 저장
      console.log("비디오", videoData)
      createVideoURL(data).then(url => {
        setVideoURL(url);
      });
    };

    WebSocketVideoData(ip, port, onDataReceived);

    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [dispatch, videoURL]);

  const createVideoURL = async (data) => {
    const blob = new Blob([data], { type: 'video/mp4' }); // 수정된 부분
    console.log(blob.size, blob.type);
    return URL.createObjectURL(blob);
    
  };

  return 
    

};

export default ReceiveVideoData;


