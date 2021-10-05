import React, { useState } from 'react';

function Hotel(props) {
    return (
        <div>
            <p className="eventDescription hotels"><b>{props.name}</b><br /></p>
            <a className="eventDescription mapLink mini" target="_blank" rel="noopener noreferrer" href={props.maps}>Maps</a>
            <a className="eventDescription websiteLink mini" target="_blank" rel="noopener noreferrer" href={props.link}>Website</a>
        </div>
    )
}

export default Hotel