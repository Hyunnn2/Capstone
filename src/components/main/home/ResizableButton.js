import React, { useRef, useEffect } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const ResizableButton = ({ resizableRef }) => {
    const buttonRef = useRef(null);
    let initialX;
    let initialWidthResizable;
    
    useEffect(() => {
        const resizableElement = resizableRef.current;
        const buttonElement = buttonRef.current;

        const onMouseMove = (event) => {
            const dx = event.clientX - initialX;
            const newWidthResizable = initialWidthResizable + dx;
            if (newWidthResizable >= 100) { // 최소 너비 설정
                resizableElement.style.width = `${newWidthResizable}px`;
            }
        };

        const onMouseDown = (event) => {
            initialX = event.clientX;
            initialWidthResizable = resizableElement.offsetWidth;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        buttonElement.addEventListener('mousedown', onMouseDown);

        return () => {
            buttonElement.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [resizableRef]);

    return (
        <div className='ResizableButton' ref={buttonRef}>
            <DragIndicatorIcon/>
        </div>
    );
};

export default ResizableButton;
