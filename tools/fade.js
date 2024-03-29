import React, { useState } from 'react';

function Fade(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div className={`fade-in-section ${isVisible || (typeof domRef.current !== "undefined" &&
            domRef.current.className.includes("is-visible")) ? 'is-visible' : ''}`} ref={domRef}>
            {props.children}
        </div>
    );
}

export default Fade