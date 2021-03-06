import Head from 'next/head'
import React from 'react';

var checkRender = false;
var currentAnswer = null;

/*
function triggerAnimation() {
  if (checkRender && typeof document != "undefined") {
    document.getElementById("introimage").classList.toggle("show");
    document.getElementById("introvideo").classList.toggle("show");
  } else {
    checkRender = !checkRender;
  }
  setTimeout(triggerAnimation, 3000);
}
*/

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

    // triggerAnimation();

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
            <img className="introImage" id="introimage" src="images/paocamiloengaged.jpg"></img>
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
                <p className="eventDescription"> Please let us know if you can make it by November 1, 2021. We can???t wait to see you!</p>
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
                <p className="eventTitle">Locations</p>
                <div className="location">
                  <p className="eventDescription"><b>Ceremony</b><br /></p>
                  <p className="eventDescription">
                    Iglesia La Merced<br />
                    Cra. 3 #6 - 62, Cali<br />
                    Valle del Cauca, Colombia
                  </p>
                  <a className="eventDescription mapLink" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps?q=Iglesia+La+Merced,+Cra.+3+%236+-+62,+Cali,+Valle+del+Cauca,+Colombia&ftid=0x8e30a664d7141a83:0x9dc96eb907465bd5&hl=en-US&gl=us&entry=gps&shorturl=1">Open in Google Maps</a>
                </div>
                <div className="location">
                  <p className="eventDescription"><b>Reception</b><br /></p>
                  <p className="eventDescription">
                    Club Campestre Farallones<br />
                    Av. El Banco, Cra. 127, Cali<br />
                    Valle del Cauca, Colombia
                  </p>
                  <a className="eventDescription mapLink" href="https://goo.gl/maps/9izkwh4BnDosC35N9" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                </div>
                <p className="eventTitle">Transportation</p>
                <p className="eventDescription">A complimentary bus will be available from our recommended hotels to Iglesia la Merced and to Club Campestre Farallones. We will also have return trips at the end of the night to the recommended hotels.</p>
                <p className="eventDescription">If you wish to drive there is also plenty of parking at the reception or you may use Uber or taxis.</p>
              </Fade>
            </div>
            <Fade>
              <div className="photoGallery" id="photogallery1">
                <img className="photo" id="beach" src="images/beach.jpg"></img>
                <img className="photo" id="colombia" src="images/football.jpeg"></img>
                <img className="photo" id="column" src="images/column.jpg"></img>
                <img className="photo" id="london" src="images/snow.jpg"></img>
              </div>
            </Fade>

            <Fade>
              <div className="eventHeaderSection hotelSection">
                <p className="eventHeader">Hotels and Transportation</p>
              </div>
            </Fade>
            <div className="events">
              <Fade>
                <p className="eventTitle">Travel</p>
                <p className="eventDescription">The recommended hotels are approximately 40 minutes from Cali international Airport. Iglesia la Merced is approximately 25 minutes from the recommended hotels. Club Campestre Farallones is approximately
                  35 minutes from the church. We will provide complimentary transportation to the wedding day events. We also recommend using Uber or local taxis if needed.</p>
                <p className="eventTitle">Wedding Day Transportation</p>
                <p className="eventDescription">
                  If you wish to drive yourself to and from the venues, parking will be available. You also have the option of using Uber or local taxis.
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
                  We are recommending two hotels for your stay. Both hotels are near the reception venue and both will have complimentary transportation.
                </p>
                <p className="eventDescription">If you are hoping to spend a lot of time in Cali during your stay, we also recommend the Intercontinental Hotel which is closer to the center of the city.
                  <br />
                  <div className="hotel">
                    <p className="eventDescription"><b>Hilton Garden Inn</b><br />
                      Average Rate $60/night
                    </p>
                    <p className="eventDescription">
                      Cl. 15a #100 21, Cali<br />
                      Valle del Cauca, Colombia
                    </p>
                    <a className="eventDescription mapLink" target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/mVEy4BbeqkemzkV98">Open in Google Maps</a><br />
                    <button className="rsvpButton2 website"><a target="_blank" rel="noopener noreferrer" href="https://www.hilton.com/en/hotels/cloccgi-hilton-garden-inn-cali-ciudad-jardin/?SEO_id=GMB-GI-CLOCCGI&y_source=1_MTkzOTkzNzMtNzE1LWxvY2F0aW9uLmdvb2dsZV93ZWJzaXRlX292ZXJyaWRl">Website</a></button>
                  </div>
                  <div className="hotel">
                    <p className="eventDescription"><b>Hotel MS Ciudad Jard??n Plus</b><br />
                      Average Rate $50/night
                    </p>
                    <p className="eventDescription">
                      Cra. 101 #15a-35, Cali<br />
                      Valle del Cauca, Colombia
                    </p>
                    <a className="eventDescription mapLink" target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/ctkT5Q2doREXithN7">Open in Google Maps</a><br />
                    <button className="rsvpButton2 website"><a target="_blank" rel="noopener noreferrer" href="https://hotelesms.com/ms-ciudad-jardin/">Website</a></button>
                  </div>
                </p>
              </Fade>
            </div>
            <Fade>
              <div className="photoGallery" id="photogallery2">
                <img className="photo" id="hall" src="images/colombia.jpg"></img>
                <img className="photo" src="images/hall.jpg"></img>
                <img className="photo" id="roman" src="images/london.jpg"></img>
                <img className="photo" id="snow" src="images/roman.jpg"></img>
              </div>
            </Fade>

            <Fade>
              <div className="eventHeaderSection">
                <p className="eventHeader" id="faqHeader">Frequently Asked Questions</p>
              </div>
            </Fade>
            <div className="faqSection">
              <Fade>
                <button className="question" onClick={e => triggerCollapse(0)}>Where is the venue? Is it close to Cali?</button>
                <div class="answerDiv">
                  <p className="answer">Both venues, the church ceremony and the reception are located in Cali, Colombia. The Church Ceremony en La Inglesia la Merced is
                    located approximately 30 minutes from the recommended hotels and the reception in Club Campestre Farallones is approximately 17 minutes from the recommended
                    hotels. If you are hoping to spend more time and explore the city, we also recommend to stay in the Intercontinental Hotel.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(1)}>What time is the ceremony?</button>
                <div class="answerDiv">
                  <p className="answer">The church ceremony is at 4:00 pm and the reception will start at 6:00pm.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(2)}>What should I wear?</button>
                <div class="answerDiv">
                  <p className="answer">The dress code is Black-Tie. Ladies must wear a floor length gown and gentlemen must wear a tuxedo. If you need any help here is a handy
                    guide for black-tie attire: <a className="answer covidLink" href="https://www.brides.com/story/black-tie-wedding-guest-dress-code-long-gowns" target="_blank" rel="noopener noreferrer">Black-Tie Guide</a></p>
                </div>
                <button className="question" onClick={e => triggerCollapse(3)}>What is the weather like?</button>
                <div class="answerDiv">
                  <p className="answer">The weather in Cali in November is on average 83 Deg F during the day and can go as low as 65 Deg F at night, due to its location in the
                    mountains. The reception will be indoors but the area will not be air conditioned since it???s an open space with cool temperature.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(4)}>What about Covid?</button>
                <div class="answerDiv">
                  <p className="answer">We are hoping that the world will be a bit closer to normal by the time November comes around, but we will be closely following
                    recommended guidelines at our wedding. Even though it is not required, for the safety of our guests we recommend to get vaccinated. At the moment a PCR test is
                    not required to enter Colombia but you do have to present a Check-Mig registration using the the following link: 
                    <a className="answer covidLink" href="https://migracioncolombia.gov.co/" target="_blank" rel="noopener noreferrer"> Migraci??n Colombia</a></p>
                </div>
                <button className="question" onClick={e => triggerCollapse(5)}>Where are you registered?</button>
                <div class="answerDiv">
                  <p className="answer">We are not registered, your presence at our wedding is the greatest gift of all. If it is your wish to  bless us with a gift, we would
                    greatly appreciate your contribution to our honeymoon fund.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(6)}>Is there parking at the venue?</button>
                <div class="answerDiv">
                  <p className="answer">The parking at the church can be a little tricky but there is plenty of parking at the reception. We do recommend to take advantage of
                    our complimentary transportation from the recommended hotels. You may also use Uber or taxis.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(7)}>Can we bring our kids?</button>
                <div class="answerDiv">
                  <p className="answer">We love your kids, but this is an adults only wedding.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(8)}>How do I RSVP?</button>
                <div class="answerDiv">
                  <p className="answer" style={{ marginBottom: "0px" }}>You can RSVP here:</p>
                  <button className="rsvpButton2 website">RSVP</button>
                  <p className="answer">You will also receive calls from our wedding planner for confirmation.</p>
                </div>
              </Fade>
            </div>
            <Fade>
              <div className="photoGallery2">
                <img className="photo2" id="ferris" src="images/ferris.jpg"></img>
                <img className="photo2" id="train" src="images/train.jpg"></img>
                <img className="photo2" id="mountain" src="images/mountain.jpg"></img>
              </div>
            </Fade>
          </div>

          <Fade>
            <div className="footer">
              <img className="footerBackground" src="images/champagne.png"></img>
              <p className="details">
                November 27, 2021<br />
                Iglesia La Merced<br />
                4:00PM
              </p>
              <div className="footerRSVP">
                <p className="rsvpText">Let us know if you can make it!</p>
                <button className="rsvpButton2">RSVP</button>
              </div>
            </div>
          </Fade>
        </main>

        <div className="fullScreenShadow" id="fullscreenshadow"></div>

      </div >
    )
  }
}

export default Home;
