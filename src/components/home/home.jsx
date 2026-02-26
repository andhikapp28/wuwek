import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./home.css";

const REGIONS = [
  {
    id: "lahai-roi",
    name: "Lahai-Roi",
    order: "Latest Release",
    accent: "#9ad7ff",
    characters: [
      {
        name: "Aster Vale",
        title: "Tidelord Cartographer",
        element: "Glacio",
        weapon: "Rectifier",
        rarity: "5-Star",
        release: "2026-01-18",
        quote: "The tide records every choice you make.",
        image: "https://picsum.photos/seed/lahairoi-aster/1920/1200",
        splash: "/characters/Luuk_Herssen_Splash_Art.webp",
        skills: ["Tidebreak Verse", "Polar Bloom", "Deepwater Oath"],
      },
      {
        name: "Caelum",
        title: "Gatekeeper of Saltwind",
        element: "Aero",
        weapon: "Sword",
        rarity: "5-Star",
        release: "2025-12-04",
        quote: "I open roads where storms say no.",
        image: "https://picsum.photos/seed/lahairoi-caelum/1920/1200",
        skills: ["Windline Slash", "Current Arc", "Skyward Seal"],
      },
      {
        name: "Nessa",
        title: "Abyss Relay Runner",
        element: "Electro",
        weapon: "Pistols",
        rarity: "4-Star",
        release: "2025-11-10",
        quote: "Fast messages save slow cities.",
        image: "https://picsum.photos/seed/lahairoi-nessa/1920/1200",
        skills: ["Pulse Dash", "Relay Spark", "Blue Meridian"],
      },
    ],
    cities: [
      {
        name: "Aurelia Spire",
        image: "https://picsum.photos/seed/lahairoi-city-a/1800/900",
      },
      {
        name: "Nacre Coast",
        image: "https://picsum.photos/seed/lahairoi-city-b/1200/900",
      },
      {
        name: "Saltwind Basin",
        image: "https://picsum.photos/seed/lahairoi-city-c/1200/900",
      },
    ],
  },
  {
    id: "rinascita",
    name: "Rinascita",
    order: "Second Latest",
    accent: "#88c7ff",
    characters: [
      {
        name: "Lumenna",
        title: "Opera Sentinel",
        element: "Spectro",
        weapon: "Broadblade",
        rarity: "5-Star",
        release: "2025-08-21",
        quote: "Every strike should have a chorus.",
        image: "https://picsum.photos/seed/rinascita-lumenna/1920/1200",
        skills: ["Ariaslash", "Solar Motif", "Stage of Dawn"],
      },
      {
        name: "Brizio",
        title: "Canal Duelist",
        element: "Fusion",
        weapon: "Gauntlets",
        rarity: "4-Star",
        release: "2025-06-02",
        quote: "One heartbeat ahead is enough.",
        image: "https://picsum.photos/seed/rinascita-brizio/1920/1200",
        skills: ["Canal Break", "Heat Tempo", "Final Encore"],
      },
      {
        name: "Fiora",
        title: "Archivist of Echo Glass",
        element: "Havoc",
        weapon: "Rectifier",
        rarity: "4-Star",
        release: "2025-05-15",
        quote: "Memories still cut when polished.",
        image: "https://picsum.photos/seed/rinascita-fiora/1920/1200",
        skills: ["Prism Bind", "Glass Waltz", "Nocturne Fold"],
      },
    ],
    cities: [
      {
        name: "Solare Piazza",
        image: "https://picsum.photos/seed/rinascita-city-a/1800/900",
      },
      {
        name: "Canale Nuovo",
        image: "https://picsum.photos/seed/rinascita-city-b/1200/900",
      },
      {
        name: "Vento Archivio",
        image: "https://picsum.photos/seed/rinascita-city-c/1200/900",
      },
    ],
  },
  {
    id: "blackshores",
    name: "Blackshores",
    order: "Earlier",
    accent: "#7cb8f7",
    characters: [
      {
        name: "Epsimart",
        title: "Shorekeeper Unit",
        element: "Spectro",
        weapon: "Rectifier",
        rarity: "5-Star",
        release: "2024-09-29",
        quote: "Guardianship starts before dawn.",
        image: "https://picsum.photos/seed/blackshores-epsimart/1920/1200",
        skills: ["Origin Calculus", "Chaos Theory", "Second Silence"],
      },
      {
        name: "Noelleth",
        title: "Signal Diver",
        element: "Aero",
        weapon: "Pistols",
        rarity: "4-Star",
        release: "2024-08-11",
        quote: "I hear waves no one else can.",
        image: "https://picsum.photos/seed/blackshores-noelleth/1920/1200",
        skills: ["Signal Net", "Blue Wake", "Spiral Trigger"],
      },
      {
        name: "Kaori",
        title: "Boundary Auditor",
        element: "Glacio",
        weapon: "Sword",
        rarity: "4-Star",
        release: "2024-06-24",
        quote: "Borders are promises, not walls.",
        image: "https://picsum.photos/seed/blackshores-kaori/1920/1200",
        skills: ["Cold Mark", "Gauge Edge", "Harbor Verdict"],
      },
    ],
    cities: [
      {
        name: "Abyssal Terminal",
        image: "https://picsum.photos/seed/blackshores-city-a/1800/900",
      },
      {
        name: "Signal Quay",
        image: "https://picsum.photos/seed/blackshores-city-b/1200/900",
      },
      {
        name: "Tidewall Keep",
        image: "https://picsum.photos/seed/blackshores-city-c/1200/900",
      },
    ],
  },
  {
    id: "huanglong",
    name: "Huanglong",
    order: "Oldest Release",
    accent: "#5a99dc",
    characters: [
      {
        name: "Baizhi",
        title: "Remnant Healer",
        element: "Glacio",
        weapon: "Rectifier",
        rarity: "4-Star",
        release: "2024-05-23",
        quote: "Healing means carrying hope forward.",
        image: "https://picsum.photos/seed/huanglong-baizhi/1920/1200",
        skills: ["Emergency Stitch", "Echo Care", "White Petal Path"],
      },
      {
        name: "Yangyang",
        title: "Feathered Scout",
        element: "Aero",
        weapon: "Sword",
        rarity: "4-Star",
        release: "2024-05-23",
        quote: "I move first so everyone returns.",
        image: "https://picsum.photos/seed/huanglong-yangyang/1920/1200",
        skills: ["Feather Burst", "Drift Spiral", "Tempest Signal"],
      },
      {
        name: "Chixia",
        title: "Outrider of Jinzhou",
        element: "Fusion",
        weapon: "Pistols",
        rarity: "4-Star",
        release: "2024-05-23",
        quote: "No target survives my grin.",
        image: "https://picsum.photos/seed/huanglong-chixia/1920/1200",
        skills: ["Scorchline", "Crossfire Beat", "Full Impact"],
      },
    ],
    cities: [
      {
        name: "Jinzhou",
        image: "https://picsum.photos/seed/huanglong-city-a/1800/900",
      },
      {
        name: "Port Gunchao",
        image: "https://picsum.photos/seed/huanglong-city-b/1200/900",
      },
      {
        name: "Qichi Village",
        image: "https://picsum.photos/seed/huanglong-city-c/1200/900",
      },
    ],
  },
];

export default function Home() {
  const [regionId, setRegionId] = useState("lahai-roi");
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [activeCity, setActiveCity] = useState(0);
  const pageRef = useRef(null);
  const sectionsRef = useRef([]);

  const selectedRegion = useMemo(
    () => REGIONS.find((region) => region.id === regionId) ?? REGIONS[0],
    [regionId],
  );

  useEffect(() => {
    setActiveCharacter(0);
    setActiveCity(0);
    if (pageRef.current) {
      pageRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [regionId]);

  useEffect(() => {
    const handleScroll = () => {
      const current = sectionsRef.current.reduce(
        (best, section, index) => {
          if (!section) return best;
          const distance = Math.abs(section.getBoundingClientRect().top - window.innerHeight * 0.2);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setActiveCharacter(current.index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedRegion]);

  return (
    <main className="home-shell" ref={pageRef}>
      <div className="home-bg-glow" aria-hidden="true" />

      <header className="home-header sticky">
        <p className="home-logo">WUTHERING WAVES</p>
        <nav className="header-region-nav">
          {REGIONS.map((region) => (
            <button
              key={region.id}
              type="button"
              className={region.id === regionId ? "header-region-btn is-active" : "header-region-btn"}
              onClick={() => setRegionId(region.id)}
            >
              {region.name}
            </button>
          ))}
        </nav>
        <p className="home-order-note">Regions</p>
      </header>

      <section className="city-overview">
        <div
          className="city-hero"
          style={{ "--city-main": `url("${selectedRegion.cities[activeCity].image}")` }}
        >
          <div className="city-hero-overlay" />
          <div className="city-hero-content">
            <p className="home-kicker">Overview</p>
            <h2>{selectedRegion.name}</h2>
            <p>{selectedRegion.cities[activeCity].name}</p>
          </div>
        </div>

        <div className="city-thumbs">
          {selectedRegion.cities.map((city, index) => (
            <button
              key={city.name}
              type="button"
              onClick={() => setActiveCity(index)}
              className={index === activeCity ? "city-thumb is-active" : "city-thumb"}
              style={{ "--city-thumb": `url("${city.image}")` }}
            >
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="region-meta">
        <p>Resonators</p>
        <span>{selectedRegion.order}</span>
      </section>

      <nav className="region-tabs">
        {selectedRegion.characters.map((character, index) => (
          <button
            key={character.name}
            type="button"
            onClick={() =>
              sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="tab"
          >
            {character.name}
          </button>
        ))}
      </nav>

      <section className="character-flow">
        {selectedRegion.characters.map((character, index) => (
          <motion.article
            key={character.name}
            className="character-panel"
            ref={(node) => {
              sectionsRef.current[index] = node;
            }}
            style={{
              "--region-accent": selectedRegion.accent,
              "--char-bg": `url("${character.image}")`,
            }}
            initial={{ opacity: 0.65, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-20% 0px -20% 0px", once: false }}
            transition={{ duration: 0.6 }}
          >
            <div className="panel-art" />
            <div className="panel-shade" />
            {character.splash ? (
              <div className="panel-splash-wrap">
                <img className="panel-splash" src={character.splash} alt={`${character.name} splash art`} />
              </div>
            ) : null}

            <div className="panel-content">
              <p className="panel-region">{selectedRegion.name}</p>
              <h2>{character.name}</h2>
              <p className="panel-title">{character.title}</p>

              <div className="panel-tags">
                <span>{character.element}</span>
                <span>{character.weapon}</span>
                <span>{character.rarity}</span>
              </div>

              <p className="panel-quote">"{character.quote}"</p>

              <div className="panel-skills">
                {character.skills.map((skill) => (
                  <p key={skill}>{skill}</p>
                ))}
              </div>

              <p className="panel-release">Release: {character.release}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <aside className="character-rail">
        {selectedRegion.characters.map((character, index) => (
          <button
            key={character.name}
            type="button"
            onClick={() => sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className={index === activeCharacter ? "rail-item is-active" : "rail-item"}
            aria-label={`Go to ${character.name}`}
          >
            <img src={character.image} alt={character.name} loading="lazy" />
          </button>
        ))}
      </aside>
    </main>
  );
}
