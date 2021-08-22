import Head from 'next/head'
import React from 'react';

var checkRender = false;
var currentAnswer = null;

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

function triggerCollapse(id) {
  if (currentAnswer !== null) {
    document.getElementsByClassName("question")[currentAnswer].classList.toggle("active");
    document.getElementsByClassName("answerDiv")[currentAnswer].classList.toggle("active");
    collapseSection(currentAnswer);
  }
  if (currentAnswer === id)
    currentAnswer = null;
  else {
    expandSection(id);
    document.getElementsByClassName("question")[id].classList.toggle("active");
    document.getElementsByClassName("answerDiv")[id].classList.toggle("active");
    currentAnswer = id;
  }
}

function collapseSection(id) {
  var element = document.getElementsByClassName("answerDiv")[id];
  var sectionHeight = element.scrollHeight;
  var elementTransition = element.style.transition;
  element.style.transition = '';

  requestAnimationFrame(function () {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;

    requestAnimationFrame(function () {
      element.style.height = 0 + 'px';
    });
  });
}

function expandSection(id) {
  var element = document.getElementsByClassName("answerDiv")[id];
  var sectionHeight = element.scrollHeight;
  element.style.height = sectionHeight + 'px';
  element.addEventListener('transitionend', function (e) {
    element.removeEventListener('transitionend', e);
  });
}

class Home extends React.Component {

  render() {

    triggerAnimation();

    return (
      <div className="container">
        <Head>
          <title>Pao and Camilo's Wedding</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Alice&family=Mulish:wght@200;300&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Rouge+Script&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Ballet&display=swap" rel="stylesheet"></link>
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
              <button className="rsvpButton">RSVP</button>
            </div>
            <div className="introFade"></div>
          </div>

          <div className="eventDiv">
            <Fade>
              <div className="eventHeaderSection">
                <p className="eventHeader">Wedding Day Info</p>
              </div>
            </Fade>
            <div className="events">
              <Fade>
                <p className="eventTitle">RSVP</p>
                <p className="eventDescription"> Please let us know if you can make it by October 16, 2021. We can’t wait to see you!</p>
                <button className="rsvpButton2 website">RSVP</button>
                <p className="eventTitle">Schedule</p>
                <p className="eventDescription">2:30 p.m. Shuttle from hotels begin</p>
                <p className="eventDescription">4:00 p.m. Ceremony</p>
                <p className="eventDescription">5:30 p.m. Cocktail Hour</p>
                <p className="eventDescription">6:00 - 3:00 a.m. Reception</p>
                <p className="eventDescription">1:00 a.m. Shuttles begin leaving for hotels</p>
              </Fade>
            </div>
            <div className="events">
              <Fade>
                <p className="eventTitle">Location</p>
                <p className="eventDescription">
                  Iglesia La Merced<br />
                  Cra. 3 #6 - 62, Cali<br />
                  Valle del Cauca, Colombia</p>
                <a className="eventDescription mapLink" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps?q=Iglesia+La+Merced,+Cra.+3+%236+-+62,+Cali,+Valle+del+Cauca,+Colombia&ftid=0x8e30a664d7141a83:0x9dc96eb907465bd5&hl=en-US&gl=us&entry=gps&shorturl=1">Open in Google Maps</a>
                <p className="eventTitle">Transportation</p>
                <p className="eventDescription">
                  A complimentary bus will be available from our recommended hotels to Iglesia La Merced starting at
                  2:30PM. The first return trip to the hotels will begin at 1am.
                </p>
                <p className="eventDescription">If you wish to drive yourself, the venue has plenty of parking.</p>
              </Fade>
            </div>
            <div className="photoGallery" id="photogallery1">
              <img className="photo" id="beach" src="images/beach.jpg"></img>
              <img className="photo" id="colombia" src="images/colombia.jpg"></img>
              <img className="photo" id="column" src="images/column.jpg"></img>
              <img className="photo" id="london" src="images/london.jpg"></img>
            </div>

            <Fade>
              <div className="eventHeaderSection hotelSection">
                <p className="eventHeader">Hotels and Transportation</p>
              </div>
            </Fade>
            <div className="events">
              <Fade>
                <p className="eventTitle">Travel</p>
                <p className="eventDescription">The venue is approximately 45 minutes away from Cali International Airport,
                  or a little over an hour from the Hilton Garden Inn Hotel. Iglesia La Merced is approximately 1 hour from 
                  Hotel MS Ciudad, and not accessible by metro. If traveling to the area we recommend getting a rental car.</p>
                <p className="eventTitle">Wedding Day Transportation</p>
                <p className="eventDescription">
                  If you wish to drive yourself to and from the venue there is plenty of parking. Since this is a rural area,
                  rideshares won’t be available.
                </p>
                <p className="eventDescription">We will have a complimentary bus running to and from the venue from our two recommended hotels.</p>
                <p className="eventDescription"><b>Bus Schedule</b></p>
                <p className="eventDescription">2:30pm - Departure from Hilton Garden Inn</p>
                <p className="eventDescription">3:00pm - Departure from Hotel MS Ciudad</p>
                <p className="eventDescription">1:00-4:00am - Multiple return trips to hotels</p>
              </Fade>
            </div>
            <div className="events">
              <Fade>
                <p className="eventTitle">Where to Stay</p>
                <p className="eventDescription">
                  We are recommending two hotels for your stay. Both hotels are near the venue and both will
                  have a bus to take to the venue.
                </p>
                <p className="eventDescription">If you are hoping to spend a lot of time in Cali during your stay, we recommend getting a different hotel for the
                  other nights of your trip so that you don’t need to spend as much time driving back and forth.
                  <br />
                  <div className="hotel">
                    <p className="eventDescription"><b>Hilton Garden Inn</b><br/>
                      Average Rate $60/night
                    </p>
                    <p className="eventDescription">
                      Cl. 15a #100 21, Cali<br/>
                      Valle del Cauca, Colombia
                    </p>
                    <a className="eventDescription mapLink" target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/mVEy4BbeqkemzkV98">Open in Google Maps</a>
                    <button className="rsvpButton2 website"><a target="_blank" rel="noopener noreferrer" href="https://www.hilton.com/en/hotels/cloccgi-hilton-garden-inn-cali-ciudad-jardin/?SEO_id=GMB-GI-CLOCCGI&y_source=1_MTkzOTkzNzMtNzE1LWxvY2F0aW9uLmdvb2dsZV93ZWJzaXRlX292ZXJyaWRl">Website</a></button>
                  </div>
                  <div className="hotel">
                    <p className="eventDescription"><b>Hotel MS Ciudad Jardín Plus</b><br/>
                      Average Rate $50/night
                    </p>
                    <p className="eventDescription">
                      Cra. 101 #15a-35, Cali<br/>
                      Valle del Cauca, Colombia
                    </p>
                    <a className="eventDescription mapLink" target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/ctkT5Q2doREXithN7">Open in Google Maps</a>
                    <button className="rsvpButton2 website"><a target="_blank" rel="noopener noreferrer" href="https://hotelesms.com/ms-ciudad-jardin/">Website</a></button>
                  </div>
                </p>
              </Fade>
            </div>
            <div className="photoGallery" id="photogallery2">
              <img className="photo" id="hall" src="images/hall.jpg"></img>
              <img className="photo" src="images/puertorico.jpg"></img>
              <img className="photo" id="roman" src="images/roman.jpg"></img>
              <img className="photo" id="snow" src="images/snow.jpg"></img>
            </div>

            <Fade>
              <div className="eventHeaderSection">
                <p className="eventHeader" id="faqHeader">Frequently Asked Questions</p>
              </div>
            </Fade>
            <div className="faqSection">
              <Fade>
                <button className="question" onClick={e => triggerCollapse(0)}>Where is the venue? Is it close to Cali?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(1)}>What time is the ceremony?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(2)}>What should I wear?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(3)}>What is the weather like?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(4)}>What about Covid?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(5)}>Where are you registered?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(6)}>Is there parking at the venue?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(7)}>Can we bring our kids?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(8)}>How do I RSVP?</button>
                <div class="answerDiv">
                  <p className="answer">Sample text...</p>
                </div>
              </Fade>
            </div>
            <div className="photoGallery2">
              <img className="photo2" id="ferris" src="images/ferris.jpg"></img>
              <img className="photo2" id="train" src="images/train.jpg"></img>
              <img className="photo2" id="mountain" src="images/mountain.jpg"></img>
            </div>
          </div>

          <div className="footer">
            <img className="footerBackground" src="images/champagne.png"></img>
            <p className="details">
              November 27, 2021<br/>
              Iglesia La Merced<br/>
              4:00PM
            </p>
            <div className="footerRSVP">
              <p className="rsvpText">Let us know if you can make it!</p>
              <button className="rsvpButton2">RSVP</button>
            </div>
          </div>
        </main>

        <div className="fullScreenShadow" id="fullscreenshadow"></div>

      </div >
    )
  }
}

export default Home;
