import React from 'react';
import '../styles/ContactForm.css';

const ContactForm = () => {
  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <h1>צור קשר</h1>
        <h2>לפניות בנושא אתר האינטרנט בלבד</h2>
        <p>לשירות מענה כתוב בלבד בוואטסאפ: 054-626-2272</p>
        <p>במייל: Support@Laline.co.il</p>
        <p>שעות פעילות מוקד שירות הלקוחות של האתר:</p>
        <p>ימים א'-ה': 09:00-16:00</p>
        <p>יום ו' וערבי חג: 9:00-13:00</p>
        <h2>בנושאים הקשורים לרשת החנויות או לכל נושא אחר</h2>
        <p>טלפון: 03-9051740</p>
        <p>מייל: sherutfox@fox.co.il </p>
        <p>פקס: 03-9050221 </p>
        <p>כתובת: רחוב החרמון 9, קריית שדה התעופה, ת.ד. 125, מיקוד 70100 נתב"ג</p>
      </div>

      <div className="form-section">
        <h2>ניתן לכתוב אלינו כאן בענייני האתר בכל שעה ונחזור אליכם בהקדם האפשרי</h2>

        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="שם" />
            <input type="text" placeholder="טלפון" />
          </div>

          <input type="email" placeholder="אימייל" />
          <textarea placeholder="הודעה"></textarea>
          <button type="submit">שלחי</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;