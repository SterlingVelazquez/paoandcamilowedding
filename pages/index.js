import Head from 'next/head'
import React from 'react';
import ReactDOM from 'react-dom';

export default function Home() {

  function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
      });
      observer.observe(domRef.current);
    }, []);
    return (
      <div
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Pao and Camilo's Wedding</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Alice&family=Mulish:wght@200;300&display=swap" rel="stylesheet"></link>
      </Head>

      <main className="main-wrapper">
        <div className="introDiv">
          <img className="introImage" src="images/paocamiloengaged.jpg"></img>
          <div className="introOverlay"></div>
          <div className="introHeaderSection">
            <p className="introTitle">Paola &amp; Camilo</p>
            <div className="introDivider">SAVE THE DATE</div>
            <p className="introDate">November 27, 2021</p>
            <div className="centerCalendarBtn">
              <button className="calendarBtn">ADD TO MY CALENDAR</button>
            </div>
          </div>
          <div className="introFade"></div>
        </div>

        <div className="eventDiv">
          <div className="eventHeaderSection">
            <p className="eventHeader">Event Attractions</p>
            <p className="eventSubHeader">Below you'll find everything you need to know to be ready for all the events.</p>
            <img className="eventHeaderImage" src="images/rose-icon-01.png"></img>
          </div>
          <div className="eventGrid">
            <div className="event">
              <div className="iconBox">
                <div className="iconHolder">
                  <img className="eventIcon" src="briefcase.svg"></img>
                </div>
              </div>
              <p className="eventTitle">Accomodation</p>
              <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
              <div className="smallBorder"></div>
            </div>
            <div className="event">
              <div className="iconBox">
                <div className="iconHolder">
                  <img className="eventIcon" src="dress.svg"></img>
                </div>
              </div>
              <p className="eventTitle">What To Wear</p>
              <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
              <div className="smallBorder"></div>
            </div>
            <div className="event">
              <div className="iconBox">
                <div className="iconHolder">
                  <img className="eventIcon" src="car.svg"></img>
                </div>
              </div>
              <p className="eventTitle">Parking Area</p>
              <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
              <div className="smallBorder"></div>
            </div>
            <div className="event">
              <div className="iconBox">
                <div className="iconHolder">
                  <img className="eventIcon" src="camera.svg"></img>
                </div>
              </div>
              <p className="eventTitle">Documentation</p>
              <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
              <div className="smallBorder"></div>
            </div>
            <div className="event">
              <div className="iconBox">
                <div className="iconHolder">
                  <img className="eventIcon" src="party-hat.svg"></img>
                </div>
              </div>
              <p className="eventTitle">Celebration</p>
              <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
              <div className="smallBorder"></div>
            </div>
            <div className="event">
              <div className="iconBox">
                <div className="iconHolder">
                  <img className="eventIcon" src="food.svg"></img>
                </div>
              </div>
              <p className="eventTitle">Food &amp; Drinks</p>
              <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
              <div className="smallBorder"></div>
            </div>
          </div>
          <div className="slideshowDiv">
            <div className="convolutedDiv">
              <div className="slideshowSide"></div>
              <div className="slideshowSide"></div>
            </div>
            <div className="slideshowImages">
              <img className="slideshowImage" src="images/chicago.jpg"></img>
              <img className="slideshowImage" src="images/column.jpg"></img>
              <img className="slideshowImage" src="images/disney.jpg"></img>
              <img className="slideshowImage" src="images/london.jpg"></img>
              <img className="slideshowImage" src="images/mountain.jpg"></img>
              <img className="slideshowImage" src="images/puertorico.jpg"></img>
              <img className="slideshowImage" src="images/ski.jpg"></img>
              <img className="slideshowImage" src="images/stadium.jpg"></img>
            </div>
          </div>
        </div>

        <div className="locationDiv">
          <div className="locationFade"></div>
          <img className="locationImage" src="images/champagne.png"></img>
          <div className="eventHeaderSection">
            <p className="eventHeader">When &amp; Where</p>
            <img className="eventHeaderImage" src="images/rose-icon-01.png"></img>
          </div>
          <div className="eventGrid">
            <div className="locationBox">
              <div className="firstIconBox">
                <div className="firstIconHolder">
                  <img className="firstEventIcon" src="heart.svg"></img>
                </div>
              </div>
              <p className="firstLocationTitle">The Ceremony</p>
              <p className="firstLocationDescription">Saturday, November 27, 2021<br/>
                11:30 AM - 01.00 PM<br/>678 Central Square<br/>Cali, Colombia</p>
            </div>
            <div className="locationBox">
              <div className="otherIconBox">
                <div className="otherIconHolder">
                  <img className="otherEventIcon" src="bouquet.svg"></img>
                </div>
              </div>
              <p className="locationTitle">The Reception</p>
              <p className="locationDescription">Saturday, November 27, 2021<br/>
                11:30 AM - 01.00 PM<br/>678 Central Square<br/>Cali, Colombia</p>
            </div>
            <div className="locationBox">
              <div className="otherIconBox">
                <div className="otherIconHolder">
                  <img className="otherEventIcon" src="party.svg"></img>
                </div>
              </div>
              <p className="locationTitle">The Party</p>
              <p className="locationDescription">Saturday, November 27, 2021<br/>
                11:30 AM - 01.00 PM<br/>678 Central Square<br/>Cali, Colombia</p>
            </div>
          </div>
          <p className="googlemapsp"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127450.10983778453!2d-76.59587550763219!3d3.3950618568448467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f0cc4bb3f1%3A0x1f0fb5e952ae6168!2sCali%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1sen!2sus!4v1615692973940!5m2!1sen!2sus" 
            className="googlemap" allowfullscreen="" loading="lazy"></iframe></p>
        </div>
      </main>
    
    </div>
  )
}

