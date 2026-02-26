import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./hero.css";

const FIRST_SCENE_MS = 4200;

export default function Hero({ onEnterDashboard }) {
  const [phase, setPhase] = useState("intro");
  const audioRef = useRef(null);
  const transitionVideoRef = useRef(null);

  const playBgm = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = 0.6;
      await audioRef.current.play();
    } catch {
      // Playback can still fail on unsupported codec/device policies.
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("main"), FIRST_SCENE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    void playBgm();
  }, [playBgm]);

  useEffect(() => {
    const unlockAudio = () => {
      void playBgm();
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [playBgm]);

  useEffect(() => {
    if (phase !== "transition" || !transitionVideoRef.current) return;
    transitionVideoRef.current.playbackRate = 0.82;
  }, [phase]);

  return (
    <div className="ww-shell">
      <audio ref={audioRef} autoPlay loop preload="auto" playsInline>
        <source src="/audio/bgm.m4a" type="audio/mp4" />
      </audio>

      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.section
            key="intro"
            className="scene scene-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="scene-video scene-intro-video" aria-hidden="true" />
            <div className="scene-vignette" />

            <motion.h1
              className="ww-logo ww-logo-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              WUTHERING
              <br />
              WAVES
            </motion.h1>

            <motion.p
              className="intro-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.82 }}
              transition={{ duration: 1.2, delay: 1.4 }}
            >
              INITIALIZING WORLD STREAM...
            </motion.p>
          </motion.section>
        ) : phase === "main" ? (
          <motion.section
            key="main"
            className="scene scene-main"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <div className="scene-video scene-main-video" aria-hidden="true" />
            <div className="scene-vignette" />

            <p className="ww-logo-corner">dipa</p>

            <motion.div
              className="scene-main-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <button
                className="enter-btn"
                type="button"
                onClick={() => {
                  void playBgm();
                  setPhase("transition");
                }}
              >
                TAP TO ENTER
              </button>
              <p className="scene-hint">dipa | v0.0.1</p>
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            key="transition"
            className="scene scene-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <video
              ref={transitionVideoRef}
              className="scene-transition-media"
              src="/videos/login.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => onEnterDashboard?.()}
              onError={() => onEnterDashboard?.()}
            />
            <div className="scene-transition-flash" />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
