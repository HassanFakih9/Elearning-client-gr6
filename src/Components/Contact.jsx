import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../CSS/Contact.css'; 

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_25fbzyi', 
      'template_bqmuj8e', 
      form.current, 
      'FLSiIE_cf8fw1muNl')

      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <footer id='Contact-us-section' >
      <div className="container-contact">
        <div className="column1">
          <p className="follow">Follow us</p>
          <a href="www.facebook.com">
            <div className="item1">
              <img className="imgg1" src="icon-fb.png" alt="Images"/>
            </div>
          </a>

          <a href="www.facebook.com">
            <div className="item2">
              <img
                src="icon-insta.png"
                alt="Images"
                className="imgg2"
              />
            </div>
          </a>
          <a href="www.facebook.com">
            <div className="item3">
              <img
                src="icon-link.png"
                alt="Images"
                className="imgg3"
              />
            </div>
          </a>
        </div>
        <div className="column2">
          <div className="get-in-touch">Get in touch</div>
          <form  method="post" className='contact-form' ref={form} onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="name"  className='label-contact'>Name:</label>
              <div className="input-container">
                <input type="text" id="name" name="name" required className='input-contact'/>
                
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email"  className='label-contact'>Email:</label>
              <div className="input-container">
                <input type="email" id="email" name="email" required className='input-contact'/>
                
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message" className='label-contact'>Message:</label>
              <div className="input-container">
                <textarea id="message" name="message" required className='input-contact'></textarea>
                
              </div>
            </div>
            <div className="form-group3">
              <input type="submit" value="Submit" className='submit-button-contact'/>
            </div>
          </form>
        </div>
        <div className="column3">
          <img src="Contact-img.png" alt="Images" className="Mention-amico" />
        </div>
      </div>
    </footer>
  );
}

export default Contact;
