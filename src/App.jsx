import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ChevronUp,
  Guitar,
  Crown,
  BusFront,
  AudioWaveform,
  Drum,
  Zap,
  Coffee,
  Menu,
  X,
  Globe,
  Volume2,
  VolumeX,
  Mail,
  Send,
  ShieldCheck,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { Floating3DWrapper } from './components/ui/3d-card';
import { BuyMeCoffeeCard } from './components/ui/buy-me-coffee-card';
import { PixCard } from './components/ui/PixCard';
import { PayPalCard } from './components/ui/PayPalCard';
import { AboutMeSection } from './components/ui/AboutMeSection';
import { GeddyEasterEgg } from './components/ui/GeddyEasterEgg';
import { CardCarousel } from './components/ui/CardCarousel';
import { translations } from './translations.jsx';
import { BigMoneyCard } from './components/ui/BigMoneyCard';
import { BigMoneySection } from './components/ui/BigMoneySection';
import { EditorialSection } from './components/ui/EditorialSection';
import { BlahahaSection } from './components/ui/BlahahaSection';
import { SectionSideLabel } from './components/ui/SectionSideLabel';
import { AnimatedTitle } from './components/ui/AnimatedTitle';
import './index.css';
import './hero.css';

const highlightText = (text) => {
  if (typeof text !== 'string') return text;
  const regex = /\b(Geddy Lee|Geddy|Lee|Ged|Big Beautiful Book of Bass|My Effin' Life|Rush)\b|("Working Man"|Working Man)/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (/^(Geddy Lee|Geddy|Lee|Ged|Big Beautiful Book of Bass|My Effin' Life)$/.test(part)) {
      return <span key={i} className="geddy-highlight">{part}</span>;
    }
    if (/^(Rush|"Working Man"|Working Man)$/.test(part)) {
      return <span key={i} className="rush-highlight">{part}</span>;
    }
    return part;
  });
};

const highlightHeroText = (text) => {
  if (typeof text !== 'string') return text;
  const regex = /(Geddy Lee|Rick Beato|Anika Nilles|Alex Lifeson|Rush)/gi;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    const lower = part.toLowerCase();
    if (lower === 'rush') {
      return <span key={i} className="hero-highlight-rush">RUSH</span>;
    }
    if (lower === 'geddy lee' || lower === 'anika nilles' || lower === 'alex lifeson') {
      return <span key={i} className="hero-highlight-yellow">{part}</span>;
    }
    if (lower === 'rick beato') {
      return <span key={i} className="hero-highlight-blue">{part}</span>;
    }
    return part;
  });
};

const CustomCrown = ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 20h16" />
    <path d="M4 17 V6 l4 8 4-8 4 8 4-8 v11 Z" />
  </svg>
);

const getTopics = (t) => [
  {
    id: 't1',
    badge: '01',
    title: t.t1Title,
    category: 'criacao',
    icon: <img src={`${import.meta.env.BASE_URL}imgi_3_rush-bass-icon.png`} alt="Rush Logo" className="custom-rush-icon" />,
    videoStart: 18,
    summary: t.t1Summary,
    detail: t.t1Detail,
  },
  {
    id: 't2',
    badge: '02',
    title: t.t2Title,
    category: 'equipamento',
    icon: <img src={`${import.meta.env.BASE_URL}2 herois do baixo Rush - Yes Cream The Who.jpg`} alt="Heróis do Baixo" className="t2-custom-icon" />,
    videoStart: 167,
    summary: t.t2Summary,
    detail: t.t2Detail,
  },
  {
    id: 't3',
    badge: '03',
    title: t.t3Title,
    category: 'equipamento',
    icon: <img src={`${import.meta.env.BASE_URL}2button-baixo-azul-esquisito-drop-bass.png`} alt="Baixo Azul Esquisito" className="t2-custom-icon" />,
    videoStart: 438,
    summary: t.t3Summary,
    detail: t.t3Detail,
  },
  {
    id: 't4',
    badge: '04',
    title: t.t4Title,
    category: 'turne',
    icon: <img src={`${import.meta.env.BASE_URL}4-button-r50-rush-fifthysomething.png`} alt="Turnê Fifty Something" className="t2-custom-icon" />,
    videoStart: 524,
    summary: t.t4Summary,
    detail: t.t4Detail,
  },
  {
    id: 't5',
    badge: '05',
    title: t.t5Title,
    category: 'criacao',
    icon: <img src={`${import.meta.env.BASE_URL}criacao-musicas.png`} alt="Criação das Músicas" className="t2-custom-icon" />,
    videoStart: 670,
    summary: t.t5Summary,
    detail: t.t5Detail,
  },
  {
    id: 't7',
    badge: '06',
    title: t.t7Title,
    category: 'bastidores',
    icon: <img src={`${import.meta.env.BASE_URL}6-button- Alex Lifeson.png`} alt="Alex Lifeson Aparece de Supetão" className="t2-custom-icon" />,
    videoStart: 2707,
    summary: t.t7Summary,
    detail: t.t7Detail,
  },
  {
    id: 't6',
    badge: '07',
    title: t.t6Title,
    category: 'turne',
    icon: <img src={`${import.meta.env.BASE_URL}7-button-anikanilles-.png`} alt="Anika Nilles Logo" className="t2-custom-icon" />,
    videoStart: 3527,
    summary: t.t6Summary,
    detail: t.t6Detail,
  }
];

const HolographicImage = ({ src, alt }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // The divisor controls the intensity of the 3D rotation
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.setProperty('--bg-x', '50%');
    card.style.setProperty('--bg-y', '50%');
  };

  return (
    <div
      className="holographic-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="holographic-card" ref={cardRef}>
        <img src={src} alt={alt} />
        <div className="holo-glow"></div>
        <div className="holo-glare"></div>
      </div>
    </div>
  );
};

const getInitialLanguage = () => {
  if (typeof window === 'undefined' || !navigator) return 'pt';
  const userLang = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
  if (userLang.startsWith('en')) return 'en';
  if (userLang.startsWith('es')) return 'es';
  return 'pt';
};

const App = () => {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [videoStart, setVideoStart] = useState(null);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isGershonActive, setIsGershonActive] = useState(false);
  const [showHeroTitle, setShowHeroTitle] = useState(false);
  const [isAnikaMuted, setIsAnikaMuted] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  
  const clickSequence = useRef([]);
  const anikaVideoRef = useRef(null);

  const anikaRef = useRef(null);
  const isAnikaInView = useInView(anikaRef, { once: true, margin: "400px 0px" });

  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, margin: "400px 0px" });

  const t = translations[language];
  const topics = getTopics(t);
  const hasAnyActive = expandedTopic !== null;

  const handleCardClick = (topic, event) => {
    // Record click history for Easter Egg
    const newSequence = [...clickSequence.current, topic.id].slice(-4);
    clickSequence.current = newSequence;

    // Check sequence: t2 -> t1 -> t1 -> t2
    if (newSequence.join(',') === 't2,t1,t1,t2') {
      setIsEasterEggActive(true);
    } else if (isEasterEggActive) {
      setIsEasterEggActive(false);
    }

    const isClosing = expandedTopic === topic.id;
    
    if (isClosing && event) {
      const cardElement = event.currentTarget;
      const y = cardElement.getBoundingClientRect().top + window.scrollY - 120;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 350);
    }
    
    setExpandedTopic(isClosing ? null : topic.id);
    if (!isClosing) {
      setVideoStart(topic.videoStart);
    }
  };

  const videoSrc = isGershonActive
    ? 'https://www.youtube.com/embed/8WYWcGOGwog?autoplay=1'
    : (isEasterEggActive
      ? 'https://www.youtube.com/embed/wk_Dlx6VL6c?autoplay=1&rel=0'
      : (videoStart !== null
        ? `https://www.youtube.com/embed/GLkvbCn3xbw?start=${videoStart}&autoplay=1&rel=0`
        : 'https://www.youtube.com/embed/GLkvbCn3xbw?autoplay=0&showinfo=0&rel=0'));

  return (
    <>
      {/* ===== NAVIGATION ===== */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <button className="nav-icon-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          
          <div className="nav-center">
            <a href="https://portalrushbrasil.com.br/" target="_blank" rel="noopener noreferrer" className="nav-logo">
              <img src={`${import.meta.env.BASE_URL}logo_portalrush.png`} alt="Portal Rush Brasil" className="nav-logo-img" />
            </a>
          </div>

          <div className="nav-right">
            <div className="language-dropdown-container">
              <button className="nav-icon-btn lang-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                <img 
                  src={`https://flagcdn.com/${language === 'pt' ? 'br' : language === 'en' ? 'us' : 'es'}.svg`} 
                  width="22" 
                  alt={language} 
                  style={{ borderRadius: '2px', marginRight: '4px' }} 
                />
                <span className="lang-text">{language.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    className="lang-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button className={language === 'pt' ? 'active' : ''} onClick={() => { setLanguage('pt'); setIsLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src="https://flagcdn.com/br.svg" width="18" alt="PT" style={{ borderRadius: '2px' }} /> PT
                    </button>
                    <button className={language === 'en' ? 'active' : ''} onClick={() => { setLanguage('en'); setIsLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src="https://flagcdn.com/us.svg" width="18" alt="EN" style={{ borderRadius: '2px' }} /> EN
                    </button>
                    <button className={language === 'es' ? 'active' : ''} onClick={() => { setLanguage('es'); setIsLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src="https://flagcdn.com/es.svg" width="18" alt="ES" style={{ borderRadius: '2px' }} /> ES
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE/FULLSCREEN MENU ===== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fullscreen-menu"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="fullscreen-menu-links">
              <a href="#dobra-1" onClick={() => setIsMenuOpen(false)}>{t.navCapaVideo}</a>
              <a href="#dobra-2" onClick={() => setIsMenuOpen(false)}>{t.navEditorialVideo}</a>
              <a href="#dobra-3" onClick={() => setIsMenuOpen(false)}>{t.navEntrevistaBeato}</a>
              <a href="#dobra-4" onClick={() => setIsMenuOpen(false)}>{t.navPuzzleGershon}</a>
              <a href="#dobra-5" onClick={() => setIsMenuOpen(false)}>{t.navBigMoney}</a>
              <a href="#dobra-6" onClick={() => setIsMenuOpen(false)}>{t.navBlahaha}</a>
              <a href="#dobra-7" onClick={() => setIsMenuOpen(false)}>{t.navCamisas}</a>
              <a href="#dobra-8" onClick={() => setIsMenuOpen(false)}>{t.navAnikaNilles}</a>
              <a href="#dobra-9" onClick={() => setIsMenuOpen(false)}>{t.navContato}</a>
              <a href="#dobra-10" onClick={() => setIsMenuOpen(false)}>{t.navPoliticas}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="bento-bg">
        <img src={`${import.meta.env.BASE_URL}Fundo_hero.png`} alt="Cenário de Fundo" />
        <div className="bento-bg-overlay"></div>
      </div>

      {/* ================================================================= */}
      {/* DOBRA 1: CAPA (O TRAILER) — HERO                                 */}
      {/* ================================================================= */}
      <section id="dobra-1" className="dobra-section hero-trailer-section" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#000', zIndex: 5 }}>
        <video 
          src={`${import.meta.env.BASE_URL}01-hero/RushZine-Cover.mp4`}
          autoPlay
          loop
          muted
          playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero-video-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%)', zIndex: 6 }}></div>
        
        <div className="hero-zine-content-stack" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Logotipo logozine-alpha */}
          <img 
            src={`${import.meta.env.BASE_URL}ZINELOGO/Zine-Logo-Modelo-no-elements-removebg-preview.png`} 
            alt="RUSHZINE Logo Alpha" 
            className="hero-main-logo-anim"
            style={{ maxWidth: '460px', width: '85%', height: 'auto', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.9))', marginBottom: '2.5rem' }}
          />


        </div>
      </section>

      {/* ================================================================= */}
      {/* DOBRA 2: EDITORIAL EM VÍDEO                                      */}
      {/* ================================================================= */}
      <section id="dobra-2" className="dobra-section editorial-section" style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <SectionSideLabel number="2" title={t.navEditorialVideo} animatedLogo={true} />
        <EditorialSection t={t} language={language} mode="poster" />
        
        {/* Espaço para Vídeo Explicativo do Tânios em Inglês */}
        <div className="tanios-video-container" style={{ width: '100%', maxWidth: '1150px', margin: '3rem auto 0 auto', padding: '0 20px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(20,20,28,0.95) 0%, rgba(10,10,16,0.98) 100%)', border: '1px solid rgba(255,139,84,0.4)', borderRadius: '24px', padding: '35px', boxShadow: '0 20px 40px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,139,84,0.15)', color: '#ff8b54', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>
              <Globe size={16} /> {language === 'pt' ? 'Editorial em Vídeo (Em Inglês)' : language === 'en' ? 'Video Editorial (In English)' : 'Editorial en Vídeo (En Inglés)'}
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px', fontFamily: "'BeyondTheLightedStage', sans-serif" }}>
              {language === 'pt' ? 'Apresentação Oficial da RUSHZINE por Tânios Acácio' : language === 'en' ? 'Official RUSHZINE Presentation by Tânios Acácio' : 'Presentación Oficial de RUSHZINE por Tânios Acácio'}
            </h3>
            <p style={{ color: '#aaa', maxWidth: '780px', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px' }}>
              {language === 'pt' 
                ? 'Espaço reservado para o vídeo exclusivo de apresentação da RUSHZINE em inglês, explicando a trajetória de 16 anos do Portal Rush Brasil.' 
                : language === 'en' 
                ? 'Reserved space for the exclusive RUSHZINE presentation video in English, detailing Portal Rush Brasil\'s 16-year journey.' 
                : 'Espacio reservado para el vídeo exclusivo de presentación de RUSHZINE en inglés, detallando la trayectoria de 16 años de Portal Rush Brasil.'}
            </p>
            
            {/* Placeholder Container para Vídeo Explicativo */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '850px', aspectRatio: '16/9', borderRadius: '18px', overflow: 'hidden', background: '#050508', border: '1px dashed rgba(255,139,84,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={`${import.meta.env.BASE_URL}sobre mim - tanios acacio - portal rush referencia.png`} alt="Tânios Acácio" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <div style={{ width: '75px', height: '75px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff8b54, #d32f2f)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(255,139,84,0.7)' }}>
                  <span style={{ fontSize: '2.2rem', color: '#fff', marginLeft: '5px' }}>▶</span>
                </div>
                <span style={{ color: '#fff', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: "'SnakesAndArrows', sans-serif" }}>
                  {language === 'pt' ? 'Vídeo Explicativo em Breve' : language === 'en' ? 'Explanatory Video Coming Soon' : 'Vídeo Explicativo Próximamente'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DOBRA 3: ENTREVISTA RICK BEATO                                   */}
      {/* ================================================================= */}
      <section id="dobra-3" className="dobra-section entrevista-section" style={{ scrollMarginTop: '80px', marginTop: '2rem', paddingTop: '4rem', width: '100%', position: 'relative' }}>
        <SectionSideLabel number="3" title={t.navEntrevistaBeato} animatedLogo={true} />
        <AnimatedTitle />

        <div className="hero-main-layout" style={{ paddingTop: '0px' }}>
          <div className="dashboard-video-pane">
            <div className="bento-video">
              <iframe
                key={videoStart}
                src={videoSrc}
                title="Geddy Lee & Alex Lifeson — Rick Beato Interview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <aside 
            className="hero-side-panel"
            style={{
              maxHeight: hasAnyActive ? 'none' : undefined,
              height: hasAnyActive ? 'auto' : undefined
            }}
          >
            {topics.map(topic => {
              const isExpanded = expandedTopic === topic.id;
              const isInactive = hasAnyActive && !isExpanded;
              return (
                <div 
                  key={topic.id} 
                  className="accordion-item"
                  style={{
                    maxHeight: isInactive ? '0px' : '900px',
                    opacity: isInactive ? 0 : 1,
                    transform: isInactive ? 'scale(0.8)' : 'scale(1)',
                    marginBottom: isInactive ? '0px' : '18px',
                    overflow: isInactive ? 'hidden' : 'visible',
                    pointerEvents: isInactive ? 'none' : 'auto',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                >
                  <div
                    className={`interactive-topic-card ${isExpanded ? 'card-active' : ''}`}
                    onClick={(e) => handleCardClick(topic, e)}
                  >
                    <div className="topic-card-row">
                      <div className={`topic-card-icon-wrapper ${(topic.id === 't1' || topic.id === 't2' || topic.id === 't3' || topic.id === 't4' || topic.id === 't5' || topic.id === 't6' || topic.id === 't7') ? 't1-icon-wrapper' : ''}`}>
                        <div className={`topic-card-icon ${(topic.id === 't1' || topic.id === 't2' || topic.id === 't3' || topic.id === 't4' || topic.id === 't5' || topic.id === 't6' || topic.id === 't7') ? 't1-icon' : ''}`}>
                          {topic.icon}
                        </div>
                      </div>
                      <h4 className="topic-card-title">{topic.title}</h4>
                      <div className="topic-card-number-wrapper">
                        <span className="topic-card-badge">{topic.badge}</span>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          className="accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="accordion-inner">
                            <p className="topic-card-summary-expanded">{highlightText(topic.summary)}</p>
                            <div className="accordion-divider"></div>
                            {topic.detail.split('\n\n').map((paragraph, index) => (
                              <p key={index}>{highlightText(paragraph)}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isExpanded && (
                      <span className="accordion-collapse-hint">
                        <ChevronUp size={14} /> {t.collapseHint}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DOBRA 4: PUZZLE GERSHON                                          */}
      {/* ================================================================= */}
      <section id="dobra-4" className="dobra-section puzzle-section" style={{ position: 'relative', paddingTop: '4rem' }}>
        <SectionSideLabel number="4" title={t.navPuzzleGershon} />
        <GeddyEasterEgg 
          onSuccess={() => {
            setIsGershonActive(true);
            document.getElementById('dobra-3')?.scrollIntoView({ behavior: 'smooth' });
          }} 
          t={t} 
        />
      </section>

      {/* ================================================================= */}
      {/* DOBRA 5: THE BIG MONEY (APOIO)                                   */}
      {/* ================================================================= */}
      <section id="dobra-5" className="dobra-section big-money-section" style={{ position: 'relative', marginTop: '3rem', paddingTop: '4rem' }}>
        <SectionSideLabel number="5" title={t.navBigMoney} />
        <BigMoneySection language={language} />
        
        <div className="footer-content-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "60px", position: "relative", zIndex: 2, marginTop: "2rem" }}>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "1250px" }}>
            <BuyMeCoffeeCard 
              title={<span style={{ fontFamily: "'BeyondTheLightedStage', sans-serif" }}>Quero Pagar um Café para essa Zine</span>}
              description={<span style={{ fontSize: '1.15rem', lineHeight: '1.4', display: 'block', marginTop: '10px', fontFamily: "'BeyondTheLightedStage', sans-serif" }}>Pague um Café para a Gente para termos mais e mais <span style={{ color: '#ff8b54', fontWeight: 'bold' }}>ZINES</span></span>}
              image={`${import.meta.env.BASE_URL}imgi_17_buy-me-a-coffee.png`} 
              coffeeLink="https://buymeacoffee.com/portalrushzine" 
            />
            <PixCard 
              title={<span style={{ fontFamily: "'BeyondTheLightedStage', sans-serif" }}>🇧🇷 <span style={{color: '#009c3b'}}>P</span><span style={{color: '#ffdf00'}}>I</span><span style={{color: '#009c3b'}}>X</span>-<span style={{color: '#ff8b54'}}>ZINE</span></span>}
              description={<span style={{ fontSize: '1.15rem', lineHeight: '1.4', display: 'block', marginTop: '10px', fontFamily: "'BeyondTheLightedStage', sans-serif" }}>Faça um PIX e aumente as edições da <span style={{ color: '#ff8b54', fontWeight: 'bold' }}>ZINE</span> do Portal Rush Brasil.</span>}
              borderColor="#009c3b"
              borderBgColor="#ffdf00"
              accentColor="#009c3b"
              bannerImage={`${import.meta.env.BASE_URL}pix-qrcode.jpeg`} 
              qrImage={`${import.meta.env.BASE_URL}pix-qrcode.jpeg`} 
            />
            <PayPalCard 
              title={<span style={{ fontFamily: "'BeyondTheLightedStage', sans-serif" }}>💳 PayPal Internacional</span>}
              description={<span style={{ fontSize: '1.15rem', lineHeight: '1.4', display: 'block', marginTop: '10px', fontFamily: "'BeyondTheLightedStage', sans-serif" }}>Faça sua contribuição internacional com segurança via <span style={{ color: '#0079C1', fontWeight: 'bold' }}>PayPal</span>.</span>}
              buttonText="Doar via PayPal 💳"
              borderColor="#0079C1"
              borderBgColor="rgba(0, 121, 193, 0.3)"
              accentColor="#0079C1"
              image={`${import.meta.env.BASE_URL}paypal-custom.jpeg`}
              paypalLink="https://www.paypal.com/donate/?hosted_button_id=ZD7N6PHUEWLSS"
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DOBRA 6: DALLAS (BLAH-BLAH-HA)                                   */}
      {/* ================================================================= */}
      <section id="dobra-6" className="dobra-section blahaha-section" style={{ position: 'relative', paddingTop: '4rem' }}>
        <SectionSideLabel number="6" title={t.navBlahaha} />
        <BlahahaSection t={t} language={language} />
      </section>

      {/* ================================================================= */}
      {/* DOBRA 7: LOJA DO PORTAL                                          */}
      {/* ================================================================= */}
      <section id="dobra-7" className="dobra-section loja-section" style={{ 
        position: 'relative', 
        padding: '4rem 24px 6rem 24px', 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${import.meta.env.BASE_URL}fundo_loja_portalrushbrasil.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <SectionSideLabel number="7" title={t.navCamisas} />
        
        {/* Moldura com estética Verde e Amarela */}
        <div className="camisas-brasil-frame">
          <div className="footer-banners-container" style={{ marginTop: '-10px', marginBottom: '15px', marginLeft: '35px' }}>
            {[
              { num: 1, href: 'https://www.camisasdorush.com.br/colecoes/geddy-lee/?utm_source=portalrushzine&utm_medium=website&utm_campaign=zine_edicao1' },
              { num: 2, href: 'https://www.camisasdorush.com.br/colecoes/neil-peart/?utm_source=portalrushzine&utm_medium=website&utm_campaign=zine_edicao1' },
              { num: 3, href: 'https://www.camisasdorush.com.br/colecoes/alex-lifeson/?utm_source=portalrushzine&utm_medium=website&utm_campaign=zine_edicao1' },
              { num: 4, href: 'https://www.camisasdorush.com.br/colecoes/albuns/?utm_source=portalrushzine&utm_medium=website&utm_campaign=zine_edicao1' },
              { num: 5, href: 'https://www.camisasdorush.com.br/colecoes/minimalista/?utm_source=portalrushzine&utm_medium=website&utm_campaign=zine_edicao1' },
            ].map(({ num, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" key={num} className="footer-banner-link"
                onMouseEnter={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; }}
              >
                <img src={`${import.meta.env.BASE_URL}banner-${num}.webp`} alt={`Coleção ${num}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
              </a>
            ))}
          </div>

          <a 
            href="https://www.camisasdorush.com.br/?utm_source=portalrushzine&utm_medium=website&utm_campaign=zine_edicao1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="camisas-main-banner-btn"
          >
            <span>🇧🇷 camisasdorush.com.br (disponível no Brasil)</span>
          </a>

          <div className="camisas-international-note">
            <span className="intl-note-text">I Wanna / Lo Quiero</span>
            <span className="intl-flags">🇨🇦 🇺🇸 🇬🇧 / 🇪🇸</span>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DOBRA 8: ANIKA NILLES (TRILHO SENSORIAL)                          */}
      {/* ================================================================= */}
      <section id="dobra-8" className="dobra-section anika-sensorial-section" ref={anikaRef} style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0b0b10', paddingTop: '4rem', paddingBottom: '5rem' }}>
        <SectionSideLabel number="8" title={t.navAnikaNilles} />
        
        <div className="anika-sensorial-container" style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          


          {/* Player com Controle do Áudio */}
          <div className="anika-dw-banner split-layout" style={{ position: 'relative', zIndex: 2 }}>
            <div className="anika-banner-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2>{t.anikaHeroTitle}</h2>
              <p>{t.anikaHeroP1}</p>
              
              {/* Botão de Ativação / Desativação de Som */}
              <button 
                onClick={() => {
                  if (anikaVideoRef.current) {
                    anikaVideoRef.current.muted = !isAnikaMuted;
                    setIsAnikaMuted(!isAnikaMuted);
                  }
                }}
                className={`vinyl-disc-btn ${!isAnikaMuted ? 'vinyl-spinning' : ''}`}
                title={isAnikaMuted ? t.anikaAudioBtnPlay : t.anikaAudioBtnMute}
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '1.5rem',
                  padding: 0,
                  outline: 'none',
                  width: '70px',
                  height: '70px',
                }}
              >
                <svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer disc - black */}
                  <circle cx="50" cy="50" r="48" fill="#111" stroke="#333" strokeWidth="2" />
                  {/* Vinyl grooves */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#222" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#222" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#222" strokeWidth="0.5" />
                  {/* Center label - red */}
                  <circle cx="50" cy="50" r="18" fill="#d32f2f" />
                  <circle cx="50" cy="50" r="3" fill="#111" />
                  {/* Musical note - white */}
                  <text x="50" y="57" textAnchor="middle" fill="#fff" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900">♪</text>
                  {/* Muted diagonal line */}
                  {isAnikaMuted && (
                    <line x1="37" y1="63" x2="63" y2="37" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                  )}
                </svg>
              </button>

              <a href="https://portalrushbrasil.com.br/anika-nilles/sobre-anika-nilles-baterista-do-rush/?utm_source=rick_beato_lp&utm_medium=website&utm_campaign=anika_nilles" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1.2rem', color: '#ffdf00', textDecoration: 'underline', fontSize: '0.95rem' }}>
                {t.anikaHeroBtn}
              </a>
            </div>
            
            <div className="anika-banner-image-container" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: '380px' }}>
              <video 
                ref={anikaVideoRef}
                src={`${import.meta.env.BASE_URL}08-anila-nilles/anika is unreal.mp4`}
                autoPlay 
                loop 
                muted={isAnikaMuted}
                playsInline 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '20px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DOBRA 9: CONTATO (NEWSLETTER, WHATSAPP, REDES SOCIALS)            */}
      {/* ================================================================= */}
      <section id="dobra-9" className="dobra-section contato-section" style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '5rem', backgroundColor: '#09090e' }}>
        <SectionSideLabel number="9" title={t.navContato} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', fontFamily: "'BeyondTheLightedStage', sans-serif" }}>
              {t.contactTitle}
            </h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '720px', margin: '10px auto 0 auto', lineHeight: '1.6' }}>
              {t.contactSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            {/* Card 1: Newsletter */}
            <div style={{ background: 'linear-gradient(135deg, rgba(25,25,35,0.9), rgba(15,15,22,0.95))', border: '1px solid rgba(255,139,84,0.3)', borderRadius: '24px', padding: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ff8b54', marginBottom: '15px' }}>
                  <img src={`${import.meta.env.BASE_URL}iconeimail_semfundo.png`} alt="Mail Icon" style={{ width: '128px', height: '128px', objectFit: 'contain', margin: '-40px -10px -40px -20px' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontFamily: "'BeyondTheLightedStage', sans-serif" }}>{t.newsletterTitle}</h3>
                </div>
                <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
                  {language === 'pt' ? 'Receba novidades exclusivas sobre o Rush, lançamentos de zines e curiosidades direto na sua caixa de entrada.' : language === 'en' ? 'Receive exclusive Rush news, zine releases, and trivia directly in your inbox.' : 'Reciba noticias exclusivas sobre Rush, lanzamientos de zines y curiosidades directamente en tu correo.'}
                </p>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) {
                  setNewsletterStatus('success');
                  setNewsletterEmail('');
                  setTimeout(() => setNewsletterStatus(''), 4000);
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t.newsletterPlaceholder} 
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                />
                <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#FA5E1F', border: 'none', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send size={18} /> {t.newsletterBtn}
                </button>
                {newsletterStatus === 'success' && (
                  <div style={{ color: '#4caf50', fontSize: '0.9rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <CheckCircle size={16} /> {language === 'pt' ? 'Inscrição realizada com sucesso!' : language === 'en' ? 'Subscribed successfully!' : '¡Suscripción realizada con éxito!'}
                  </div>
                )}
              </form>
            </div>

            {/* Card 2: WhatsApp Direct */}
            <div style={{ background: 'linear-gradient(135deg, rgba(25,25,35,0.9), rgba(15,15,22,0.95))', border: '1px solid rgba(37,211,102,0.4)', borderRadius: '24px', padding: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#25D366', marginBottom: '15px' }}>
                  <img src={`${import.meta.env.BASE_URL}imgi_32_whatsapp-icon.png`} alt="WhatsApp Icon" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontFamily: "'BeyondTheLightedStage', sans-serif" }}>WhatsApp Oficial</h3>
                </div>
                <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>
                  {language === 'pt' ? 'Converse diretamente com nossa equipe no WhatsApp oficial do Portal Rush Brasil.' : language === 'en' ? 'Chat directly with our team on the official Portal Rush Brasil WhatsApp.' : 'Chatea directamente con nuestro equipo en el WhatsApp oficial de Portal Rush Brasil.'}
                </p>
                <div style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', letterSpacing: '1px' }}>
                  +55 3197210-2112
                </div>
              </div>
              
              <a 
                href="https://api.whatsapp.com/send?phone=5531972102112&text=Ol%C3%A1%2C%20pessoal%20do%20Portal%20Rush%20Brasil.%20%F0%9F%A6%89%F0%9F%8E%B8%F0%9F%A5%81%F0%9F%8E%B8Cheguei%20aqui%20atrav%C3%A9s%20do%20site%20do%20Portal.%20RUSH%20ON!"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#4BD200', color: '#fff', fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <img src={`${import.meta.env.BASE_URL}whatsapp-icon.png`} alt="WhatsApp" style={{ width: '22px', height: '22px' }} />
                {t.whatsappBtn}
              </a>
            </div>

            {/* Card 3: Social Media Links */}
            <div style={{ background: 'linear-gradient(135deg, rgba(25,25,35,0.9), rgba(15,15,22,0.95))', border: '1px solid rgba(0,132,255,0.3)', borderRadius: '24px', padding: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0084ff', marginBottom: '15px' }}>
                  <img src={`${import.meta.env.BASE_URL}iconezine_semfundo.png`} alt="Zine Icon" style={{ width: '128px', height: '128px', objectFit: 'contain', margin: '-40px -10px -40px -20px' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontFamily: "'BeyondTheLightedStage', sans-serif" }}>{t.socialTitle}</h3>
                </div>
                <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
                  {language === 'pt' ? 'Siga nossas redes para ver vídeos diários, podcasts e atualizações da comunidade.' : language === 'en' ? 'Follow our social channels for daily videos, podcasts, and community updates.' : 'Síguenos en redes para ver vídeos diarios, podcasts y actualizaciones de la comunidad.'}
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="https://portalrushbrasil.com.br/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>
                  🌐 Portal Rush Brasil
                </a>
                <a href="https://www.youtube.com/@PortalRushBrasil" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'rgba(255,0,0,0.15)', borderRadius: '10px', color: '#ff4d4d', textDecoration: 'none', fontSize: '0.9rem' }}>
                  ▶ YouTube @PortalRushBrasil
                </a>
                <a href="https://www.instagram.com/portalrushbrasil?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'rgba(225,48,108,0.15)', borderRadius: '10px', color: '#ff7eb3', textDecoration: 'none', fontSize: '0.9rem' }}>
                  📷 Instagram @portalrushbrasil
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DOBRA 10: POLÍTICAS DO SITE (CCPA, GDPR, LGPD)                   */}
      {/* ================================================================= */}
      <section id="dobra-10" className="dobra-section politicas-section" style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '4rem', backgroundColor: '#050508', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <SectionSideLabel number="10" title={t.navPoliticas} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#ffdf00', marginBottom: '15px' }}>
            <ShieldCheck size={32} />
            <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: 0, fontFamily: "'BeyondTheLightedStage', sans-serif" }}>
              {t.privacyTitle}
            </h2>
          </div>
          <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '800px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
            {t.privacyDesc}
          </p>

          {/* Badges Legais */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,156,59,0.5)', padding: '15px 25px', borderRadius: '16px', color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🇧🇷</span> <strong>LGPD</strong> — Brasil
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,121,193,0.5)', padding: '15px 25px', borderRadius: '16px', color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🇪🇺</span> <strong>GDPR</strong> — Europa
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,139,84,0.5)', padding: '15px 25px', borderRadius: '16px', color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🇺🇸</span> <strong>CCPA</strong> — Califórnia / EUA
            </div>
          </div>

          <div style={{ color: '#777', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
            {t.rightsText}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6 DOBRAS ORIGINAIS PRESERVADAS NO CÓDIGO-FONTE (DISPLAY: NONE)     */}
      {/* ================================================================= */}
      <div id="capa-2-old" style={{ display: 'none' }}>
        <div className="hero-zine-cover">
          <img src={`${import.meta.env.BASE_URL}02 - Capa/RUSH ZINE - COVER.png`} alt="Capa Antiga" />
        </div>
      </div>

      <div id="sumario-3-old" style={{ display: 'none' }}>
        <EditorialSection t={t} language={language} mode="index" />
      </div>

      <div id="conteudos-6-old" style={{ display: 'none' }}>
        <CardCarousel />
      </div>

      <div id="sobre-mim-13-old" style={{ display: 'none' }}>
        <AboutMeSection t={t} />
      </div>

      <div id="livro-14-old" style={{ display: 'none' }}>
        <a href="https://www.belasletras.com.br/loja/busca.php?loja=1194178&palavra_busca=My+Effin+Life" target="_blank" rel="noopener noreferrer">
          <img src={`${import.meta.env.BASE_URL}livrosemfundo.png`} alt="Livro Antigo" />
        </a>
      </div>

      <div id="hero-old-video" style={{ display: 'none' }}>
        <video src={`${import.meta.env.BASE_URL}Banner_Animado_Leve.mp4`} muted loop />
      </div>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>Portal Rush Brasil</h3>
              <p>{t.footerBrandDesc}</p>
            </div>
            <div className="footer-links">
              <h4>{t.footerExplore}</h4>
              <ul>
                <li><a href="#dobra-3">{t.navEntrevistaBeato}</a></li>
                <li><a href="#dobra-8">{t.navAnikaNilles}</a></li>
                <li><a href="#dobra-5">{t.navBigMoney}</a></li>
                <li><a href="#dobra-7">{t.navCamisas}</a></li>
                <li><a href="#dobra-9">{t.navContato}</a></li>
                <li><a href="#dobra-10">{t.navPoliticas}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footerCopyright}</span>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOAT ===== */}
      <a
        href="https://api.whatsapp.com/send?phone=5531972102112&text=Ol%C3%A1%2C%20pessoal%20do%20Portal%20Rush%20Brasil.%20%F0%9F%A6%89%F0%9F%8E%B8%F0%9F%A5%81%F0%9F%8E%B8Cheguei%20aqui%20atrav%C3%A9s%20do%20site%20do%20Portal.%20RUSH%20ON!"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <img src={`${import.meta.env.BASE_URL}whatsapp-icon.png`} alt="WhatsApp" loading="lazy" />
      </a>
    </>
  );
};

export default App;
