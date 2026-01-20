import React, { useEffect, useRef, useState } from "react";
import styles from "./FelizMesWithAudio.module.css";
import pareja from "../images/pareja.jpg";
// Importa el audio local si lo colocas en src/audio/tema.mp3
import temaLocal from "../audio/tema.mp3";

// Si prefieres usar la URL remota de Google Drive (menos fiable), descomenta y usa TEMA_URL
// const TEMA_URL = "https://drive.google.com/uc?export=download&id=1CNCV8gZeRgCpPh9ilzayxKlwXRVHVLPs";

export default function FelizMesWithAudio(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (!audioRef.current) {
      // Usa temaLocal (import) para mayor fiabilidad. Si quieres la URL remota,
      // reemplaza temaLocal por TEMA_URL.
      const audio = new Audio(temaLocal);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = volume;
      audioRef.current = audio;
    }

    const tryPlay = async () => {
      try {
        await audioRef.current!.play();
        setPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        setAutoplayBlocked(true);
        setPlaying(false);
      }
    };

    tryPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleUserPlay = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlaying(true);
      setAutoplayBlocked(false);
    } catch (err) {
      console.error("No se pudo reproducir el audio:", err);
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setAutoplayBlocked(true));
    }
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <main className={styles.card} role="article" aria-label="Tarjeta de felicitación — Feliz mes con música">
      <h1 className={styles.title}>Feliz mes, mi amor 💕</h1>

      <figure className={styles.figure}>
        <img
          src={pareja}
          alt="Pareja mirándose mientras se toman de las manos"
          className={styles.photo}
          loading="lazy"
        />
        <figcaption className={styles.figcaption} aria-hidden="true">
          Un mes más juntos
        </figcaption>
      </figure>

      <div className={styles.heart} aria-hidden="true">❤️</div>

      <p className={styles.paragraph}>
        Un mes más a tu lado,
        <br />
        un mes más de risas, abrazos
        <br />
        y momentos que quiero guardar para siempre.
      </p>

      <p className={styles.paragraph}>
        Gracias por hacerme tan feliz.
        <br />
        Te amo 💖
      </p>

      <div className={styles.controls} aria-hidden={false}>
        <button
          className={styles.controlBtn}
          onClick={handleTogglePlay}
          aria-pressed={playing}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
        >
          {playing ? "⏸" : "▶️"}
        </button>

        <label className={styles.volumeLabel}>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={onVolumeChange}
            aria-label="Volumen"
            className={styles.volume}
          />
        </label>
      </div>

      {autoplayBlocked && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Iniciar reproducción de tema">
          <div className={styles.overlayContent}>
            <p>Para escuchar el tema, pulsa reproducir</p>
            <button className={styles.playNow} onClick={handleUserPlay} aria-label="Reproducir ahora">
              ▶️ Reproducir tema
            </button>
          </div>
        </div>
      )}
    </main>
  );
}