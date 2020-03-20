import React from 'react';
import './styles.css';

const MailCard = () => {
  return(
    <div id="mc_embed_signup">
      <form action="https://vcsilva.us19.list-manage.com/subscribe/post?u=5a83a33b0b8716f2ba5ecdf99&id=4bd7305ead" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
          <h2 className="newsletter-title">Subscribe to my newsletter</h2>
          <p className="paragraph-description">
            Subscribe to receive my posts every week into your inbox 📫
          </p>
          <div className="newsletter-container">
            <div className="mc-field-group">
              <input type="email" placeholder="Email Address" defaultValue="" name="EMAIL" className="required email" id="mce-EMAIL" />
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{display: 'none'}} />
              <div className="response" id="mce-success-response" style={{display: 'none'}} />
            </div>
            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_5a83a33b0b8716f2ba5ecdf99_4bd7305ead" tabIndex={-1} defaultValue /></div>
            <div className="clear"><input type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MailCard;