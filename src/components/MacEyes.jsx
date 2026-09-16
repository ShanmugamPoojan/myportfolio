import { useEffect, useRef, useState } from 'react';

const MAC_IMG_URL = `${import.meta.env.BASE_URL}assets/icons/mac.svg`;
const PUPIL_IMG_URL = 'https://cdn.prod.website-files.com/5e87e737ee7085b9ba02c101/5e8b908b9e1374230cad9efb_pupil.svg';

// The eye socket in mac.svg is a circle at cx=269, cy=188, r=44
// within a 507x399 viewBox. We size/position a covering circle at the
// same spot (in matching % so it renders as a true circle regardless
// of the image's own aspect ratio), then move the pupil image inside it.
const VIEWBOX_W = 507;
const VIEWBOX_H = 399;
const EYE_CX_PCT = (269 / VIEWBOX_W) * 100;
const EYE_CY_PCT = (188 / VIEWBOX_H) * 100;
const EYE_DIAMETER_W_PCT = (88 / VIEWBOX_W) * 100; // 2 * r, as % of width
const EYE_DIAMETER_H_PCT = (88 / VIEWBOX_H) * 100; // 2 * r, as % of height

function MacEyes() {
  const coverRef = useRef(null);
  const hasSpokenRef = useRef(false);
  const activationStartedRef = useRef(false);
  const isActiveRef = useRef(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [speechVisible, setSpeechVisible] = useState(false);

  useEffect(() => {
    let activationTimeout;

    const handleMouseMove = (e) => {
      // Wait 2s from the first detected mouse movement before the eyes
      // actually start reacting - ignore movement until then.
      if (!isActiveRef.current) {
        if (!activationStartedRef.current) {
          activationStartedRef.current = true;
          activationTimeout = setTimeout(() => {
            isActiveRef.current = true;
          }, 1000);
        }
        return;
      }

      if (!coverRef.current) return;
      const rect = coverRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      const angle = Math.atan2(dy, dx);
      const maxOffset = rect.width * 0.22; // keep pupil inside the white cover circle
      const distance = Math.min(Math.hypot(dx, dy) * 0.15, maxOffset);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });

      if (!hasSpokenRef.current) {
        hasSpokenRef.current = true;
        setSpeechVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(activationTimeout);
    };
  }, []);

  return (
    <div className="mac-eyes-wrapper">
      <div className={`mac-speech-bubble ${speechVisible ? 'visible' : ''}`}>
        I can see you...
      </div>
      <img src={MAC_IMG_URL} alt="hero" className="hero-image" draggable="false" />
      <div
        className="mac-pupil-cover"
        ref={coverRef}
        style={{
          left: `${EYE_CX_PCT}%`,
          top: `${EYE_CY_PCT}%`,
          width: `${EYE_DIAMETER_W_PCT}%`,
          height: `${EYE_DIAMETER_H_PCT}%`,
        }}
      >
        <img
          src={PUPIL_IMG_URL}
          alt=""
          className="mac-pupil-img"
          style={{
            transform: `translate(calc(-50% + ${pupilOffset.x}px), calc(-50% + ${pupilOffset.y}px))`,
          }}
        />
      </div>
    </div>
  );
}

export default MacEyes;