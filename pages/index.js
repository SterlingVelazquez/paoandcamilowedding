import Head from 'next/head'
import React from 'react';
import Fade from '../tools/fade.js'
import Hotel from '../tools/hotel.js'

var checkRender = false;
var currentAnswer = null;
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

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

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      note: '',
      checked: 'checked'
    }
  }

  toggleRSVP() {
    document.getElementById("rsvpform").scrollTo({ top: 0 });
    document.getElementById("rsvpform").classList.toggle("show");
    document.getElementById("fullscreenshadow").classList.toggle("show");
  }
  toggleSent() {
    document.getElementById("rsvpform").scrollTo({ top: 0 });
    document.getElementById('rsvpcontainer').classList.toggle("hide");
    document.getElementById("rsvpform").classList.toggle("submit");
  }
  closeRSVP() {
    this.cancelForm();
    document.getElementById('submitcontainer').classList.toggle("show");
    setTimeout(() => { this.toggleSent() }, 500);
  }
  submitForm(e) {
    e.preventDefault();
    var name = this.state.firstName + " " + this.state.lastName;
    var response = document.getElementById("accepted").checked ? "Accepted" : "Declined";
    var guests = document.getElementById("rsvpguests").value;
    if (response === "Declined") {
      Email.send({
        SecureToken: "8be73ead-f4db-4a68-aefa-45df4ba1284d",
        To: 'paolarabanal9@gmail.com',
        From: "paola@paoandcamilowedding.com",
        Subject: "Invite declined from " + this.state.firstName,
        Body: "<html><p>Name: " + name + "</p></br><p>Notes: " + this.state.note + "</p></br></br></html>",
      }).then(function () { })
      document.getElementById("sentsubheader").innerHTML = "We're sorry you couldn't make it! Thank you for letting us know."
    } else {
      Email.send({
        SecureToken: "8be73ead-f4db-4a68-aefa-45df4ba1284d",
        To: 'paolarabanal9@gmail.com',
        From: "paola@paoandcamilowedding.com",
        Subject: "Invite accepted from " + this.state.firstName,
        Body: "<html><p>Name: " + name + "</p></br><p>Number of Guests: " + guests + "</p></br><p>Notes: " + this.state.note + "</p></br></br></html>",
      }).then(function () { })
      document.getElementById("sentsubheader").innerHTML = "Thank you! You will also receive calls from our wedding planner for confirmation."
    }
    document.getElementById('submitcontainer').classList.toggle("show");
    this.toggleSent();
  }
  cancelForm() {
    this.toggleRSVP();
    this.setState({ checked: "checked" });
    document.getElementById("rsvpform").reset();
  }
  // 08D706D0F07B1C3CA8E5569FE286D5C3C7FC
  onCheck() {
    this.setState({ checked: !this.state.checked });
  }

  setFirstName(e) {
    var name = e.target.value;
    this.setState({ firstName: name });
  }
  setLastName(e) {
    var name = e.target.value;
    this.setState({ lastName: name });
  }
  changeGuests(input) {
    var guests = parseInt(document.getElementById("rsvpguests").value);
    if (guests > 1 && input === -1)
      guests -= 1;
    else if (guests < 10 && input === 1)
      guests += 1;
    document.getElementById("rsvpguests").value = guests;
  }
  setNote(e) {
    var note = e.target.value;
    this.setState({ note: note });
  }

  render() {

    // triggerAnimation();

    return (
      <div className="container">
        <Head>
          <title>Pao and Camilo's Wedding</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
          <link href="https://fonts.googleapis.com/css2?family=Alice&family=Mulish:wght@200;300&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Rouge+Script&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Ballet&display=swap" rel="stylesheet"></link>
          <script src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD" data-sdk-integration-source="button-factory"></script>
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
              <button className="rsvpButton" onClick={() => this.toggleRSVP()}>RSVP</button>
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
                <p className="eventDescription"> Please let us know if you can make it by November 1, 2021. We can’t wait to see you!</p>
                <button className="rsvpButton2 website" onClick={() => this.toggleRSVP()}>RSVP</button>
                <p className="eventTitle">Schedule</p>
                <p className="eventDescription"><b>Friday, November 26th</b></p>
                <p className="eventDescription">5:30 p.m. Cocktail Hour</p>
                <p className="eventDescription"><b>Saturday, November 27th</b></p>
                <p className="eventDescription">4:00 p.m. Ceremony</p>
                <p className="eventDescription">6:00 - 3:00 a.m. Reception</p>
                <p className="eventDescription"><b>Sunday, November 28th</b></p>
                <p className="eventDescription">11:00 a.m. Brunch</p>
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
                  <a className="eventDescription mapLink" id="map" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps?q=Iglesia+La+Merced,+Cra.+3+%236+-+62,+Cali,+Valle+del+Cauca,+Colombia&ftid=0x8e30a664d7141a83:0x9dc96eb907465bd5&hl=en-US&gl=us&entry=gps&shorturl=1">Open in Google Maps</a>
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
                <p className="eventDescription">We will have a complimentary bus running to and from the venue from two recommended hotels.</p>
                <p className="eventDescription"><b>Bus Schedule</b></p>
                <p className="eventDescription">2:30pm - Departure from Hilton Garden Inn</p>
                <p className="eventDescription">1:00-4:00am - Multiple return trips to hotels</p>
              </Fade>
            </div>
            <div className="events">
              <Fade>
                <p className="eventTitle">Where to Stay</p>
                <p className="eventDescription">
                  We are recommending six hotels for your stay. The Hilton Garden Inn is our most recommended as it is closest to the venue.
                </p>
                <p className="eventDescription">If you are hoping to spend a lot of time in Cali during your stay, we also recommend the Intercontinental Hotel which is closer to the center of the city.
                  <br />
                  <div className="hotel">
                    <p className="eventDescription"><b>Hilton Garden Inn</b><br />
                      Average Rate $110/night
                    </p>
                    <p className="eventDescription">
                      Cl. 15a #100 21, Cali<br />
                      Valle del Cauca, Colombia
                    </p>
                    <a className="eventDescription mapLink" target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/mVEy4BbeqkemzkV98">Open in Google Maps</a><br />
                    <a className="eventDescription websiteLink" target="_blank" rel="noopener noreferrer" href="https://www.hilton.com/en/hotels/cloccgi-hilton-garden-inn-cali-ciudad-jardin/?SEO_id=GMB-GI-CLOCCGI&y_source=1_MTkzOTkzNzMtNzE1LWxvY2F0aW9uLmdvb2dsZV93ZWJzaXRlX292ZXJyaWRl">Go to Hotel Website</a>
                    <br />
                    <button className="rsvpButton2 reservation"><a target="_blank" rel="noopener noreferrer" href="https://secure3.hilton.com/en_US/GI/reservation/book.htm?inputModule=HOTEL&ctyhocn=CLOCCGI&arrival=20211125&departure=20211126&datesFlex=true&stop_mobi=yes&spec_plan=GRPBOD">Reservations</a></button>
                    <p className="footnote">You can also reserve by calling Luisa Fernanda at:<br /><a className="phoneNumber" href="tel:+573184487029">+57 318 4487029</a>.<br />And be sure to use a card that does not have international fees!</p>
                  </div>
                  <div className="hotel">
                    <Hotel name="Movich Casa del Alferez" link="https://www.movichhotels.com/es/hotel-casalferez-en-cali/?partner=5652&utm_source=google&utm_medium=gmb&utm_campaign=web_link" maps="https://goo.gl/maps/HCeNTkcvaedRDr3AA" />
                    <Hotel name="Cali Marriot Hotel" link="https://www.marriott.com/hotels/travel/clomc-cali-marriott-hotel/" maps="https://goo.gl/maps/UdfhhS7cjNVSnjQf9" />
                    <Hotel name="Acqua Santa Lofts Hotel" link="http://www.acquasantahotel.com/inicio/" maps="https://goo.gl/maps/r9qttANd64pogjHG7" />
                    <Hotel name="Alko Hotel Casa Níspero" link="https://www.alkohoteles.com/" maps="https://goo.gl/maps/TP56pFhNSMA1k6pR9" />
                    <Hotel name="Hotel Pance 122" link="https://www.hotelpance122.com/" maps="https://goo.gl/maps/iBeDZeAvGLmPW79SA" />
                    <Hotel name="Hotel Intercontinental Cali" link="https://www.ihg.com/intercontinental/hotels/us/en/cali/cloha/hoteldetail?cm_mmc=GoogleMaps-_-IC-_-CO-_-CLOHA" maps="https://goo.gl/maps/sxfmr1FYdgBZpEiY7" />
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
                <div className="answerDiv">
                  <p className="answer">Both venues, the church ceremony and the reception are located in Cali, Colombia. The Church Ceremony in La Iglesia la Merced is
                    located approximately 30 minutes from the recommended hotels and the reception in Club Campestre Farallones is approximately 17 minutes from the recommended
                    hotels. If you are hoping to spend more time and explore the city, we also recommend to stay in the Intercontinental Hotel.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(1)}>What time is the ceremony?</button>
                <div className="answerDiv">
                  <p className="answer">The church ceremony is at 4:00 pm and the reception will start at 6:00pm.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(2)}>What should I wear?</button>
                <div className="answerDiv">
                  <p className="answer">The dress code is Black-Tie. Ladies must wear a floor length gown and gentlemen must wear a tuxedo. If you need any help here is a handy
                    guide for black-tie attire: <a className="answer covidLink" href="https://www.brides.com/story/black-tie-wedding-guest-dress-code-long-gowns" target="_blank" rel="noopener noreferrer">Black-Tie Guide</a></p>
                </div>
                <button className="question" onClick={e => triggerCollapse(3)}>Will there be any salons nearby?</button>
                <div className="answerDiv">
                  <p className="answer">We recommend two beauty salons, both of which are very close to the hotels:</p>
                  <div className="location">
                    <p className="eventDescription"><b>Praga Salón Cali</b><br /></p>
                    <p className="eventDescription">
                      Calle 18# 105-149 Local 16, Cali<br />
                      Valle del Cauca, Colombia
                    </p>
                    <a className="eventDescription mapLink" id="map" target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/oRSVEt4ep4SRqx3R9">Open in Google Maps</a>
                  </div>
                  <div className="location">
                    <p className="eventDescription"><b>Fernando Castillo</b><br /></p>
                    <p className="eventDescription">
                      Carrera 105A #14 - 00, Cali<br />
                      Valle del Cauca, Colombia
                    </p>
                    <a className="eventDescription mapLink" href="https://goo.gl/maps/kvhspEQPzUT6vosp9" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                  </div>
                </div>
                <button className="question" onClick={e => triggerCollapse(4)}>What is the weather like?</button>
                <div className="answerDiv">
                  <p className="answer">The weather in Cali in November is on average 83°F during the day and can go as low as 65°F at night, due to its location in the
                    mountains. The reception will be indoors but the area will not be air conditioned since it’s an open space with cool temperature.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(5)}>What about Covid?</button>
                <div className="answerDiv">
                  <p className="answer">We are hoping that the world will be a bit closer to normal by the time November comes around, but we will be closely following
                    recommended guidelines at our wedding. Even though it is not required, for the safety of our guests we recommend to get vaccinated. At the moment a PCR test is
                    not required to enter Colombia but you do have to present a Check-Mig registration using the the following link:
                    <a className="answer covidLink" href="https://migracioncolombia.gov.co/" target="_blank" rel="noopener noreferrer"> Migración Colombia</a><br/><br/>
                    We have scheduled a COVID Test (Antigen) to be performed in your hotel room for all of our Hilton guests. This service will be available for $32 USD on Saturday, November 27th
                    starting at 8 AM.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(6)}>Where are you registered?</button>
                <div className="answerDiv">
                  <p className="answer">We are not registered, your presence at our wedding is the greatest gift of all. If it is your wish to  bless us with a gift, we would
                    greatly appreciate your contribution to our honeymoon fund.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(7)}>Is there parking at the venue?</button>
                <div className="answerDiv">
                  <p className="answer">The parking at the church can be a little tricky but there is plenty of parking at the reception. We do recommend to take advantage of
                    our complimentary transportation from the recommended hotels. You may also use Uber or taxis.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(8)}>Can we bring our kids?</button>
                <div className="answerDiv">
                  <p className="answer">We love your kids, but this is an adults only wedding.</p>
                </div>
                <button className="question" onClick={e => triggerCollapse(9)}>How do I RSVP?</button>
                <div className="answerDiv">
                  <p className="answer" style={{ marginBottom: "0px" }}>You can RSVP here:</p>
                  <button className="rsvpButton2 website" onClick={() => this.toggleRSVP()}>RSVP</button>
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
                <button className="rsvpButton2" onClick={() => this.toggleRSVP()}>RSVP</button>
              </div>
            </div>
          </Fade>
        </main>

        <div className="fullScreenShadow" id="fullscreenshadow"></div>

        <form className="rsvpForm" id="rsvpform" onSubmit={e => this.submitForm(e)}>
          <div className="rsvpContainer" id="rsvpcontainer">
            <p className="rsvpHeader">RSVP</p>
            <p className="rsvpSubheader">Kindly reply <br />by November 1st</p>
            <input className="rsvpInput" id="rsvpfirst" defaultValue="" placeholder="First Name *" onInput={e => this.setFirstName(e)} required></input>
            <input className="rsvpInput" id="rsvplast" defaultValue="" placeholder="Last Name *" onInput={e => this.setLastName(e)} required></input>
            <br />
            <p className="rsvpInviteHeader">Invitation Response</p>
            <label className="rsvpInvite" id="accept">Accept
              <input type="radio" checked={this.state.checked} name="radio" onChange={() => this.onCheck()} id="accepted"></input>
              <span className="checkmark"></span>
            </label>
            <label className="rsvpInvite" id="decline">Decline
              <input type="radio" name="radio" onChange={() => this.onCheck()} checked={!this.state.checked}></input>
              <span className="checkmark"></span>
            </label>
            <br />
            <p className="rsvpGuests">Number of Guests</p>
            <p className="rsvpSign" id="minus" onClick={() => this.changeGuests(-1)}>-</p>
            <input className="rsvpInput" id="rsvpguests" defaultValue={1}></input>
            <p className="rsvpSign" id="plus" onClick={() => this.changeGuests(1)}>+</p>
            <textarea className="rsvpNote" id="rsvpnote" defaultValue="" onInput={e => this.setNote(e)} placeholder="Optional Notes (Dietary restrictions, requests, or send us a message!)"></textarea>
            <button type="button" className="cancelButton" id="cancelbutton" onClick={e => this.cancelForm()}>Cancel</button>
            <button type="submit" className="submitButton" id="submitbutton">Submit</button>
          </div>
          <div className="submitContainer" id="submitcontainer">
            <p className="sentHeader">RSVP Sent</p>
            <p className="sentSubheader" id="sentsubheader"></p>
            <button type="button" className="closeButton" onClick={() => this.closeRSVP()}>Close</button>
          </div>
        </form>

      </div >
    )
  }
}

export default Home;

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