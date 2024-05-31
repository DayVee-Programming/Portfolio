import "./Contact.css";
import { useState } from "react";

const Contact = ({ contactProps }) => {
  const [result, setResult] = useState("");
  const generateLinks = () => {
    return contactProps.links.map((el) => (
      <a key={el.id} href={el.link} target="_blank" className="contact__main-socials-link">
        <div className="contact__main-socials-link-top">
          <img
            className="contact__main-socials-link-top-img"
            src={el.value}
            alt=""
          />
          <span className="contact__main-socials-link-top-span">
            {el.appName}
          </span>
        </div>
        <span className="contact__main-socials-link-text">{el.text}</span>
      </a>
    ));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");
    const formData = new FormData(e.target);
    console.log(formData);
    formData.append("access_key", "7b5d61c7-68fa-4fb3-956e-27668a1a72b4");
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setResult("Form submitted successfully");
      e.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id="contact" className="contact">
      <div className="container contact__wrap">
        <div className="contact__main">
          <p className="contact__main-tag tag">Contact</p>
          <h2 className="contact__main-title title">{contactProps.title}</h2>
          <p className="contact__main-text">{contactProps.text}</p>
          <div className="contact__main-socials">{generateLinks()}</div>
        </div>
        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="contact__form-label">Your name</label>
          <input
            className="contact__form-input"
            name="name"
            required
            type="text"
          />
          <label className="contact__form-label">Email</label>
          <input
            className="contact__form-input"
            type="email"
            name="email"
            required
          />
          <label className="contact__form-label">Message</label>
          <textarea
            className="contact__form-textarea"
            rows={5}
            placeholder="Type your message here"
            name="message"
            required
          ></textarea>
          <span className="contact__form-span">{result}</span>
          <button className="contact__form-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
