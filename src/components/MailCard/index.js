import React from 'react';
import './styles.css';

const MailCard = () => {
  return(
    <div className="mc_embed_signup">
      <form
        action="https://tinyletter.com/vinicius0197" method="post" target="popupwindow"
        onsubmit="window.open('https://tinyletter.com/vinicius0197', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
          <div id="signup_scroll">
            <h2 className="newsletter-title">Subscribe to my newsletter</h2>
            <p className="paragraph-description">
              Subscribe to receive my posts every week into your inbox 📫
            </p>
            <div className="newsletter-container">
              <input type="text" placeholder="Email Address" name="email" id="tlemail" />
              <input type="hidden" defaultValue={1} name="embed" />
              <input type="submit" className="button" defaultValue="Subscribe" />
            </div>
          </div>
      </form>
    </div>
  );
};

export default MailCard;