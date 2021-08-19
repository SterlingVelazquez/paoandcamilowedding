import Head from 'next/head'
import React from 'react';

var checkRender = false;
var images = ["images/chicago.jpg", "images/column.jpg", "images/disney.jpg", "images/london.jpg", 
    "images/mountain.jpg", "images/puertorico.jpg", "images/ski.jpg", "images/stadium.jpg"],
    imageIndex = 0;

function triggerAnimation() {
  if (checkRender && typeof document != "undefined") {
    document.getElementById("introimage").classList.toggle("show");
    document.getElementById("introvideo").classList.toggle("show");
  } else {
    checkRender = !checkRender;
  }
  setTimeout(triggerAnimation, 5000);
}

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

function Pulse(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div className={`pulse-section ${isVisible || (typeof domRef.current !== "undefined" &&
      domRef.current.className.includes("is-visible")) ? 'is-visible' : ''}`} ref={domRef}>
      {props.children}
    </div>
  );
}

class Home extends React.Component {

  async componentDidMount() {
    document.getElementById("fullscreen").style.display="block";
  }

  openImage(num) {
      imageIndex = num;
      document.getElementById("fullscreen").classList.toggle("active");
      document.getElementById("fullscreenshadow").classList.toggle("active");
      if (("fullscreenimage" + num) !== document.getElementsByClassName("fullScreenImage active")[0].id) {
        document.getElementsByClassName("fullScreenImage active")[0].classList.toggle("active");
        document.getElementById("fullscreenimage" + num).classList.toggle("active");
      }
  }

  async changeImage(e, num) {
    e.stopPropagation();
    imageIndex += num;
    if (imageIndex < 0)
      imageIndex = images.length - 1;
    else if (imageIndex > images.length - 1)
      imageIndex = 0;
    document.getElementsByClassName("fullScreenImage active")[0].classList.toggle("active");
    document.getElementById("fullscreenimage" + imageIndex).classList.toggle("active");
  }

  closeImage() { 
    document.getElementById("fullscreen").classList.toggle("active");
    document.getElementById("fullscreenshadow").classList.toggle("active");
  }

  switchMap(id) {
    var loc = "loc" + id, map = "map" + id;
    var locElements = document.getElementsByClassName("locationBox");
    var mapElements = document.getElementsByClassName("googlemap");
    for (var i = 0; i < 3; i++) {
      if (locElements[i].className.includes("main")) {
        locElements[i].classList.toggle("main");
        mapElements[i].classList.toggle("show");
        break;
      }
    }
    if (!document.getElementById(loc).className.includes("main"))
      document.getElementById(loc).classList.toggle("main");
      document.getElementById(map).classList.toggle("show");
  }

  render() {

    triggerAnimation();

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
            <video className="introVideo" id="introvideo" src="images/pop.mp4" autoPlay muted playsInline loop preload="auto"></video>
            <img className="introImage show" id="introimage" src="images/paocamiloengaged.jpg"></img>
            <div className="introOverlay"></div>
            <div className="introHeaderSection">
              <p className="introTitle">Paola &amp; Camilo</p>
              <div className="introDivider">SAVE THE DATE</div>
              <p className="introDate">November 27, 2021</p>
            </div>
            <div className="introFade"></div>
          </div>

          <div className="eventDiv">
            <img className="eventBackground" src="images/flower.png"></img>
            <Fade>
              <div className="eventHeaderSection">
                <p className="eventHeader">Event Attractions</p>
                <p className="eventSubHeader">Below you'll find everything you need to know to be ready for all the events.</p>
                <img className="eventHeaderImage" src="images/rose-icon-01.png"></img>
              </div>
            </Fade>
            <div className="eventGrid">
              <div className="event">
                <Fade>
                  <div className="iconBox">
                    <div className="iconHolder">
                      <Pulse><img className="eventIcon" src="briefcase.svg"></img></Pulse>
                    </div>
                  </div>
                  <p className="eventTitle">Hotels</p>
                  <p className="eventDescription"><b>Hilton Garden Inn</b><br /><a href="tel:+5724854444" className="phoneLink">+57 2 4854444</a><br />
                    <a className="hotelLink" href="https://goo.gl/maps/mVEy4BbeqkemzkV98" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
                  <p className="eventDescription"><b>Hotel MS Ciudad Jardín Plus</b><br /><a href="tel:+5723156060" className="phoneLink">+57 2 3156060</a><br />
                    <a className="hotelLink" href="https://goo.gl/maps/ctkT5Q2doREXithN7" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
                  <div className="smallBorder"></div>
                </Fade>
              </div>
              <div className="event">
                <Fade>
                  <div className="iconBox">
                    <div className="iconHolder">
                      <Pulse><img className="eventIcon" src="dress.svg"></img></Pulse>
                    </div>
                  </div>
                  <p className="eventTitle">What To Wear</p>
                  <p className="eventDescription">Black Tie Attire</p>
                  <div className="smallBorder"></div>
                </Fade>
              </div>
              <div className="event">
                <Fade>
                  <div className="iconBox">
                    <div className="iconHolder">
                      <Pulse><img className="eventIcon" src="party-hat.svg"></img></Pulse>
                    </div>
                  </div>
                  <p className="eventTitle">Celebration</p>
                  <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
                  <div className="smallBorder"></div>
                </Fade>
              </div>
              <div className="event">
                <Fade>
                  <div className="iconBox">
                    <div className="iconHolder">
                      <Pulse><img className="eventIcon" src="food.svg"></img></Pulse>
                    </div>
                  </div>
                  <p className="eventTitle">Food &amp; Drinks</p>
                  <p className="eventDescription">This is a short description elaborating the service you have mentioned above.</p>
                  <div className="smallBorder"></div>
                </Fade>
              </div>
            </div>
            <Fade>
              <div className="slideshowDiv">
                <div className="convolutedDiv">
                  <div className="slideshowSide"></div>
                  <div className="slideshowSide"></div>
                </div>
                <div className="slideshowImages">
                  <img className="slideshowImage" src="images/chicago.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(0)}></img>
                  <img className="slideshowImage" src="images/column.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(1)}></img>
                  <img className="slideshowImage" src="images/disney.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(2)}></img>
                  <img className="slideshowImage" src="images/london.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(3)}></img>
                  <img className="slideshowImage" src="images/mountain.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(4)}></img>
                  <img className="slideshowImage" src="images/puertorico.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(5)}></img>
                  <img className="slideshowImage" src="images/ski.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(6)}></img>
                  <img className="slideshowImage" src="images/stadium.jpg" onMouseDown={e => e.preventDefault()} onClick={e => this.openImage(7)}></img>
                </div>
              </div>
            </Fade>
          </div>

          <div className="locationDiv">
            <div className="locationFade"></div>
            <img className="locationImage" src="images/champagne.png"></img>
            <div className="eventHeaderSection">
              <Fade>
                <p className="eventHeader">When &amp; Where</p>
                <img className="eventHeaderImage" src="images/rose-icon-01.png"></img>
              </Fade>
            </div>
            <Fade>
              <div className="eventGrid">
                <div className="locationBox" id="loc1" onClick={e => this.switchMap(1)}>
                  <div className="locIconBox">
                    <div className="locIconHolder">
                      <Pulse><img className="locEventIcon" src="party.svg"></img></Pulse>
                    </div>
                  </div>
                  <p className="locationTitle">Welcome Cocktail</p>
                  <p className="locationDescription">Friday, November 26, 2021<br />
                    7:00 PM - 10:00 PM<br />Hilton Garden Inn<br />Cl. 15a #100 21, Cali<br />
                    <a className="hotelLink" href="https://goo.gl/maps/mVEy4BbeqkemzkV98" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
                </div>
                <div className="locationBox main" id="loc2" onClick={e => this.switchMap(2)}>
                  <div className="locIconBox">
                    <div className="locIconHolder">
                      <Pulse><img className="locEventIcon" src="heart.svg"></img></Pulse>
                    </div>
                  </div>
                  <p className="locationTitle">The Ceremony</p>
                  <p className="locationDescription">Saturday, November 27, 2021<br />
                    4:00 PM - 5:00 PM<br />Iglesia La Merced<br />Cra. 3 #6 - 62, Cali<br />
                    <a className="hotelLink" href="https://goo.gl/maps/cqjbkbDo9JdHFSTx5" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
                </div>
                <div className="locationBox" id="loc3" onClick={e => this.switchMap(3)}>
                  <div className="locIconBox">
                    <div className="locIconHolder">
                      <Pulse><img className="locEventIcon" src="bouquet.svg"></img></Pulse>
                    </div>
                  </div>
                  <p className="locationTitle">The Reception</p>
                  <p className="locationDescription">Saturday, November 27, 2021<br />
                    6:00 PM - 3:00 AM<br />Club Campestre Farallones<br />Av. El Banco, Cra. 127, Cali<br />
                    <a className="hotelLink" href="https://goo.gl/maps/9izkwh4BnDosC35N9" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
                </div>
              </div>
              <p className="googlemapsp"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.928872446845!2d-76.5331735852421!3d3.3675634975486504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a1be2dcf2329%3A0x3de5085900f6f660!2sHilton%20Garden%20Inn%20Cali%20Ciudad%20Jardin!5e0!3m2!1sen!2sus!4v1629243144869!5m2!1sen!2sus"
                className="googlemap" id="map1" allowFullScreen="" loading="lazy"></iframe></p>
              <p className="googlemapsp"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.5851003427674!2d-76.53856828524181!3d3.4505834974885183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a664d7141a83%3A0x9dc96eb907465bd5!2sIglesia%20La%20Merced!5e0!3m2!1sen!2sus!4v1629241343201!5m2!1sen!2sus"
                className="googlemap show" id="map2" allowFullScreen="" loading="lazy"></iframe></p>
              <p className="googlemapsp"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.0777331067716!2d-76.54548718524227!3d3.3309728975751574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a1fea95e7407%3A0xa0558cc1bd57d122!2sClub%20Campestre%20Farallones!5e0!3m2!1sen!2sus!4v1629243187295!5m2!1sen!2sus"
                className="googlemap" id="map3" allowFullScreen="" loading="lazy"></iframe></p>
            </Fade>
          </div>
        </main>

        <div className="fullScreen" id="fullscreen" style={{display:"none"}} onClick={e => this.closeImage()}>
          <img className="fullScreenImage active" id="fullscreenimage0" src="images/chicago.jpg"></img>
          <img className="fullScreenImage" id="fullscreenimage1" src="images/column.jpg"></img>
          <img className="fullScreenImage" id="fullscreenimage2" src="images/disney.jpg"></img>
          <img className="fullScreenImage" id="fullscreenimage3" src="images/london.jpg"></img>
          <img className="fullScreenImage" id="fullscreenimage4" src="images/mountain.jpg"></img>
          <img className="fullScreenImage" id="fullscreenimage5" src="images/puertorico.jpg"></img>
          <img className="fullScreenImage" id="fullscreenimage6" src="images/ski.jpg"></img>
          <img className="fullScreenImage" id="fullscreenimage7" src="images/stadium.jpg"></img>
          <div className="arrowBox" id="arrowboxleft" onClick={e => this.changeImage(e, 1)}>
            <div className="arrow"></div>
          </div>
          <div className="arrowBox" id="arrowboxright" onClick={e => this.changeImage(e, -1)}>
            <div className="arrow"></div>
          </div>
        </div>
        <div className="fullScreenShadow" id="fullscreenshadow"></div>

      </div>
    )
  }
}

export default Home;
