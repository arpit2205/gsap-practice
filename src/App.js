import React, { useRef, useEffect, useState } from "react";
import "./App.scss";
import desktopImg from "./images/desktop.jpg";
import mobileImg from "./images/mobile.jpg";
import { TimelineLite, Power2 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

function App() {
  const [size, setSize] = useState(window.screen.width);
  window.addEventListener("resize", () => {
    setSize(window.screen.width);
  });

  let image = useRef(null);
  let imageReveal = CSSRulePlugin.getRule(".img-container:after");
  let container = useRef(null);
  let text = useRef(null);
  console.log(imageReveal);

  let tl = new TimelineLite();

  useEffect(() => {
    tl.to(container, 0, { css: { visibility: "visible" } })
      .from(text, 1, { y: 20, opacity: 0, delay: 1 })
      .to(imageReveal, 2, {
        height: "0%",
        ease: Power2.easeInOut,
        delay: 1,
      })
      .from(image, 2, { scale: 1.6, ease: Power2.easeInOut, delay: -2 });
  }, []);
  return (
    <div ref={(el) => (container = el)} className="container">
      <div className="img-container">
        <img
          ref={(el) => (image = el)}
          src={window.screen.width > 600 ? desktopImg : mobileImg}
        />
        <h1 ref={(el) => (text = el)} className="title">
          MUSIC
          <br />
          UNITES US
        </h1>
      </div>
    </div>
  );
}

export default App;
