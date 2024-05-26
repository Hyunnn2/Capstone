import React from 'react';
import './Home.css';
import Maps from './maps/Maps.js';
import Zed3DMapping from './zed/Zed3DMapping.js';
import { Resizable } from 're-resizable';
import styled from '@emotion/styled';
import ZedCamera from './zed/ZedCamera.js';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  background-color: lightgray;
`;

const LeftDiv = styled.div`
  flex: 1;
`;

const RightDiv = styled.div`

  flex: 1;
  background-color: skyblue;
`;

const Home = () => {

    return (
        <Container>
            <LeftDiv>
              <Maps />
            </LeftDiv>
            <Resizable
                defaultSize={{ width: '20%', height: '100%' }}
                minWidth={'20%'}
                maxWidth={'70%'}
                enable={{
                    top: false,
                    right: false,
                    bottom: false,
                    left: true,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                handleStyles={{ //좌우조절 바
                    left: {
                    width: '20px',
                    height: '100%',
                    left: '0px',
                    // backgroundColor: '#d1d5db',
                    backgroundColor: 'rgb(44, 44, 44)',
                    overflow: 'hidden',
                    zIndex:'100'
                    },
                }}
            >
            <ZedCamera />
            </Resizable>
        </Container>
    );
};

export default Home;
