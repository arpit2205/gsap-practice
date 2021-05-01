import React, { useRef, useEffect, useState } from "react";
import "./App.scss";
import desktopImg from "./images/desktop.jpg";
import mobileImg from "./images/mobile.jpg";
import { TimelineLite, TweenMax, Power2 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import guitar from "./images/guitar.png";
import sticks from "./images/sticks.png";
import me from "./images/me.JPG";
import meTwo from "./images/meTwo.JPG";
import drums from "./images/drums.jpg";

function App() {
  const [size, setSize] = useState(window.screen.width);
  window.addEventListener("resize", () => {
    setSize(window.screen.width);
  });

  let image = useRef(null);
  let imageReveal = CSSRulePlugin.getRule(".img-container:after");
  let container = useRef(null);
  let text = useRef(null);
  let guitarImg = useRef(null);
  let nav = useRef(null);
  let navContent = useRef(null);
  let sticksImg = useRef(null);
  // console.log(imageReveal);

  let tl = new TimelineLite();

  const showMenu = () => {
    tl.to(nav, 1, {
      // css: { visibility: "visible" },
      height: "100vh",
      ease: Power2.easeInOut,
    })
      .to(navContent, 1, {
        css: { visibility: "visible" },
      })
      .to(navContent, 1, { opacity: 1, ease: Power2.easeInOut, delay: -1 });

    TweenMax.to(container, 0, { css: { overflow: "hidden" } });
  };

  const hideMenu = () => {
    tl.to(navContent, 1, { opacity: 0, ease: Power2.easeInOut })
      .to(navContent, 0, { css: { visibility: "hidden" } })
      .to(nav, 1, { height: "0%", ease: Power2.easeInOut });

    TweenMax.to(container, 0, { css: { overflowY: "auto" } });
  };

  useEffect(() => {
    tl.to(container, 0, { css: { visibility: "visible" } })
      .from(text, 1, { y: 20, opacity: 0, delay: 1 })
      .to(imageReveal, 2, {
        height: "0%",
        ease: Power2.easeInOut,
      })
      .from(image, 2, { scale: 1.6, ease: Power2.easeInOut, delay: -2 })
      .from(guitarImg, 0.4, { opacity: 0, y: -20, ease: Power2.easeInOut });
  }, []);
  return (
    <div ref={(el) => (container = el)} className="container">
      <img
        ref={(el) => (guitarImg = el)}
        src={guitar}
        className="guitar"
        onClick={showMenu}
      />
      <div ref={(el) => (nav = el)} className="nav">
        <nav ref={(el) => (navContent = el)} className="nav-content">
          <img
            ref={(el) => (sticksImg = el)}
            src={sticks}
            className="sticks"
            onClick={hideMenu}
          />

          <div className="links">
            <h2 className="link">ABOUT</h2>
            <h2 className="link">PROJECTS</h2>
            <h2 className="link">CONTACT</h2>
          </div>
        </nav>
      </div>

      <div className="img-container">
        <img
          ref={(el) => (image = el)}
          src={window.screen.width > 600 ? drums : mobileImg}
        />
        <h1 ref={(el) => (text = el)} className="title">
          MUSIC
          <br />
          UNITES US
        </h1>
      </div>

      <section className="secondary">
        <div className="sec-container"></div>
      </section>
    </div>
  );
}

export default App;
