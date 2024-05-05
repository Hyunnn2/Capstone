import React from 'react';
import './Home.css';
import Maps from './maps/Maps.js';
import Zed3DMapping from './zed/Zed3DMapping.js';
import { Resizable } from 're-resizable';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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
                maxWidth={'80%'}
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
                    width: '10px',
                    height: '100%',
                    left: '0px',
                    backgroundColor: '#d1d5db',
                    },
                }}
            >
                <RightDiv>
                    <Zed3DMapping />
                </RightDiv>
            </Resizable>
        </Container>
    );
};

export default Home;
