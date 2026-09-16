import { useState, useEffect } from 'react';
import '../styling/terminal.css';

const TYPING_SPEED = 55;      // ms per character while typing
const DELETING_SPEED = 30;    // ms per character while deleting
const PAUSE_AFTER_TYPE = 1400; // ms to hold the full line before deleting
const PAUSE_AFTER_DELETE = 300; // ms to wait before typing the next line

/**
 * Reusable terminal-style typing loop.
 *
 * <Terminal
 *   title="poojan@portfolio ~ %"
 *   lines={["const developer = 'Poojan';", "npm run build"]}
 * />
 *
 * Drop it into any page - it carries its own styling (terminal.css)
 * and only needs a `lines` array (and optionally a `title`) as props.
 *
 * Pass `popOnScroll` to keep it hidden (and idle - no typing happens
 * while hidden) until the user scrolls the page for the first time,
 * at which point it pops in and starts typing. Useful for a terminal
 * placed above the fold, where the usual "scrolled into view" reveal
 * pattern won't trigger since it's already on screen at load.
 */
function Terminal({ lines = [], title = 'poojan@portfolio ~ %', popOnScroll = false }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'deleting'
  const [visible, setVisible] = useState(!popOnScroll);

  useEffect(() => {
    if (!popOnScroll) return undefined;

    const handleScroll = () => {
      setVisible(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [popOnScroll]);

  useEffect(() => {
    if (!lines.length || !visible) return undefined;

    const currentLine = lines[lineIndex % lines.length];
    let timeout;

    if (phase === 'typing') {
      if (text.length < currentLine.length) {
        timeout = setTimeout(
          () => setText(currentLine.slice(0, text.length + 1)),
          TYPING_SPEED
        );
      } else {
        timeout = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(currentLine.slice(0, text.length - 1)),
          DELETING_SPEED
        );
      } else {
        timeout = setTimeout(() => {
          setLineIndex((i) => (i + 1) % lines.length);
          setPhase('typing');
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, lineIndex, lines, visible]);

  const revealClass = popOnScroll ? (visible ? 'terminal-visible' : 'terminal-hidden') : '';

  return (
    <div className={`terminal-window ${revealClass}`}>
      <div className="terminal-title-bar">
        <span className="terminal-dot"></span>
        <span className="terminal-dot"></span>
        <span className="terminal-dot"></span>
        <span className="terminal-title-text">{title}</span>
      </div>
      <div className="terminal-body">
        <span className="terminal-prompt">$</span>
        <span className="terminal-text">{text}</span>
        <span className="terminal-cursor">|</span>
      </div>
    </div>
  );
}

export default Terminal;