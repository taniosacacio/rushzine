import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const foldsList = [
  {
    id: 'capa-2',
    number: '2',
    page: '02',
    titleKey: 'navCapa',
    desc: {
      pt: 'A capa da primeira edição com destaque interativo para a histórica conversa de Geddy Lee e Rick Beato.',
      en: 'The cover of the first edition with interactive highlight for the historic conversation between Geddy Lee and Rick Beato.',
      es: 'A capa da primeira edição com destaque interativo para a histórica conversa de Geddy Lee e Rick Beato.'
    },
    img: 'zine-capa-mobile-clean.png'
  },
  {
    id: 'sumario-3',
    number: '3',
    page: '03',
    titleKey: 'navSumario',
    desc: {
      pt: 'O índice completo das dobras, conteúdos e jogos interativos da nossa Zine.',
      en: 'The complete index of folds, contents, and interactive games of our Zine.',
      es: 'O índice completo das dobras, conteúdos e jogos interativos da nossa Zine.'
    },
    img: 'Bottons/Botton-Geddylee-Zine.png'
  },
  {
    id: 'editorial-4',
    number: '4',
    page: '04',
    titleKey: 'navEditorial',
    fitMode: 'contain',
    desc: {
      pt: 'Nosso manifesto e metas de financiamento para manter o Portal Rush Brasil produzindo edições periódicas.',
      en: 'Our manifesto and funding goals to keep Portal Rush Brasil producing periodic editions.',
      es: 'Nuestro manifesto e metas de financiación para mantener el Portal Rush Brasil produciendo ediciones periódicas.'
    },
    img: 'tanios_guita_air_acacio.png'
  },
  {
    id: 'entrevista-5',
    number: '5',
    page: '05',
    titleKey: 'navAEntrevista',
    fitMode: 'contain',
    desc: {
      pt: 'Análise detalhada de 7 tópicos da conversa entre Rick Beato, Geddy Lee e Alex Lifeson.',
      en: 'Detailed analysis of 7 topics from the conversation between Rick Beato, Geddy Lee, and Alex Lifeson.',
      es: 'Análisis detalhado de 7 temas de la conversación entre Rick Beato, Geddy Lee y Alex Lifeson.'
    },
    img: 'INFOGRAFICO MENU ZINE/3 Rick Beato Entrevista Geddy Lee.png'
  },
  {
    id: 'conteudos-6',
    number: '6',
    page: '06',
    titleKey: 'navConteudos',
    desc: {
      pt: 'Uma viagem no tempo revivendo uma década e meia de conteúdos exclusivos e curadoria dedicada à banda.',
      en: 'A time travel reviving a decade and a half of exclusive content and dedicated curating for the band.',
      es: 'Un viagem no tempo revivendo uma década e meia de conteúdos exclusivos e curadoria dedicada à banda.'
    },
    img: 'stories-geddy-lee.jpg'
  },
  {
    id: 'easter-egg-7',
    number: '7',
    page: '07',
    titleKey: 'navEasterEgg',
    isLocked: true,
    desc: {
      pt: 'Acerte o nome real de Geddy Lee e descubra um vídeo secreto.',
      en: 'Acerte o nome real de Geddy Lee e descubra um vídeo secreto.',
      es: 'Acerte o nome real de Geddy Lee e descubra um vídeo secreto.'
    },
    img: 'Easter_Egg_Descoberto.png'
  },
  {
    id: 'big-money-8',
    number: '8',
    page: '08',
    titleKey: 'navBigMoney',
    desc: {
      pt: 'A economia por trás da Zine, o suporte dos fãs e como nosso trabalho é viabilizado.',
      en: 'The economics behind the Zine, fan support, and how our work is made possible.',
      es: 'La economía detrás de la Zine, el apoyo de los fans y cómo se viabiliza nuestro trabajo.'
    },
    img: 'The Big Money/money rush contribuicao.svg'
  },
  {
    id: 'apoio-9',
    number: '9',
    page: '09',
    titleKey: 'navApoie',
    desc: {
      pt: 'Saiba como fazer parte da história do Portal Rush Brasil e contribuir diretamente via PIX ou PayPal.',
      en: 'Learn how to be part of the Portal Rush Brasil history and contribute directly via PIX or PayPal.',
      es: 'Sepa cómo formar parte de la historia del Portal Rush Brasil y contribuir directamente a través de PIX o PayPal.'
    },
    img: 'imgi_17_buy-me-a-coffee.png'
  },
  {
    id: 'novo-capitulo-10',
    number: '10',
    page: '10',
    titleKey: 'navONovoCapitulo',
    desc: {
      pt: 'A baterista alemã assume o desafio monumental de tocar com Geddy e Alex e impressiona pela técnica.',
      en: 'The German drummer takes on the monumental challenge of playing with Geddy and Alex, impressing with her technique.',
      es: 'La baterista alemana asume el desafío monumental de tocar con Geddy e Alex e impresiona por su técnica.'
    },
    img: 'AnikafotoPrincipal.jpeg'
  },
  {
    id: 'camisas-11',
    number: '11',
    page: '11',
    titleKey: 'navCamisas',
    fitMode: 'contain',
    desc: {
      pt: 'Coleções oficiais de camisas do Rush no Brasil com temas de álbuns, integrantes e minimalistas.',
      en: 'Official Rush shirt collections in Brazil featuring albums, band members, and minimalist designs.',
      es: 'Colecciones oficiales de camisetas de Rush en Brasil con temas de álbumes, integrantes y minimalistas.'
    },
    img: 'banner-1.webp'
  },
  {
    id: 'blahaha-12',
    number: '12',
    page: '12',
    titleKey: 'navBlahaha',
    desc: {
      pt: 'O humor e as histórias engraçadas da banda, incluindo o icônico discurso de Alex no Hall of Fame.',
      en: "The band's humor and funny stories, including Alex's iconic Hall of Fame speech.",
      es: 'El humor y las historias divertidas de la banda, incluyendo el icónico discurso de Alex en el Hall of Fame.'
    },
    img: 'Blahaha/Alex Lifeson Laughing Dallas.png'
  },
  {
    id: 'sobre-mim-13',
    number: '13',
    page: '13',
    titleKey: 'navSobreMim',
    desc: {
      pt: 'Conheça a história de 16 anos de conteúdos sobre o Rush, agora nessa Zine.',
      en: 'Discover the 16-year history of Rush content, now in this Zine.',
      es: 'Conoce la historia de 16 años de contenidos sobre Rush, ahora en esta Zine.'
    },
    img: 'sobre mim - tanios acacio - portal rush referencia.png'
  },
  {
    id: 'mail-marketing-14',
    number: '14',
    page: '14',
    titleFallback: 'Mail Marketing',
    desc: {
      pt: 'Receba nossas edições e novidades diretamente no seu e-mail. Faça parte da comunidade.',
      en: 'Receive our editions and news directly in your e-mail. Be part of the community.',
      es: 'Recibe nuestras ediciones y novedades directamente en tu correo. Sé parte de la comunidad.'
    },
    img: 'ZINELOGO/logozine.png'
  },
  {
    id: 'livro-15',
    number: '15',
    page: '15',
    titleKey: 'navLivro',
    fitMode: 'contain',
    desc: {
      pt: 'A biografia oficial de Geddy Lee, seus detalhes e o cupom exclusivo da Editora Belas Letras.',
      en: "Geddy Lee's official biography, its details, and the exclusive coupon from Editora Belas Letras.",
      es: 'La biografia oficial de Geddy Lee, seus detalhes e o cupom exclusivo da Editora Belas Letras.'
    },
    img: 'livrosemfundo.png'
  },
  {
    id: 'fontes-16',
    number: '16',
    page: '16',
    titleKey: 'navFontes',
    desc: {
      pt: 'Créditos e referências das imagens utilizadas nesta edição da nossa Zine.',
      en: 'Credits and references for the images used in this edition of our Zine.',
      es: 'Créditos e referências das imagens utilizadas nesta edição da nossa Zine.'
    },
    img: 'ZINELOGO/logozine.png'
  }
];
import Confetti from 'react-confetti';
import { ArrowRight } from 'lucide-react';
import './EditorialSection.css';

// Unique, distinct entry animations inspired by Anime.js variety for the Z-Logo on slide hover
const logoVariants = {
  'capa-2': {
    initial: { opacity: 0, scale: 0.3, rotate: -240 },
    animate: { opacity: 0.35, scale: 1.0, rotate: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  'sumario-3': {
    initial: { opacity: 0, scale: 0.1, rotateY: 180 },
    animate: { opacity: 0.35, scale: 1.0, rotateY: 0 },
    transition: { duration: 0.7, ease: 'easeOut' }
  },
  'editorial-4': {
    initial: { opacity: 0, scale: 0.1 },
    animate: { opacity: 0.35, scale: 1.0 },
    transition: { type: 'spring', stiffness: 350, damping: 14 }
  },
  'entrevista-5': {
    initial: { opacity: 0, x: -120, scale: 0.8 },
    animate: { opacity: 0.35, x: 0, scale: 1.0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  'conteudos-6': {
    initial: { opacity: 0, x: 120, scale: 0.8 },
    animate: { opacity: 0.35, x: 0, scale: 1.0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  'easter-egg-7': {
    initial: { opacity: 0, scale: 1.5, rotate: 45 },
    animate: { opacity: 0.35, scale: 1.0, rotate: 0 },
    transition: { duration: 0.08, ease: 'linear' }
  },
  'big-money-8': {
    initial: { opacity: 0, scale: 1.0 },
    animate: { 
      opacity: 0.35, 
      scale: 1.0,
      x: [0, -12, 12, -12, 12, -6, 6, 0],
      y: [0, 4, -4, 4, -4, 2, -2, 0]
    },
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  'apoio-9': {
    initial: { opacity: 0, scale: 0.4, skewX: -25 },
    animate: { opacity: 0.35, scale: 1.0, skewX: 0 },
    transition: { type: 'spring', stiffness: 220, damping: 11 }
  },
  'novo-capitulo-10': {
    initial: { opacity: 0, scale: 0.7 },
    animate: { 
      opacity: 0.35,
      scale: [0.7, 1.2, 0.95, 1.08, 1.0],
      rotate: [0, -10, 10, -7, 7, -4, 4, 0]
    },
    transition: { duration: 0.55, ease: 'easeOut' }
  },
  'blahaha-11': {
    initial: { opacity: 0, rotateX: 90, scale: 0.7 },
    animate: { opacity: 0.35, rotateX: 0, scale: 1.0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  'sobre-mim-12': {
    initial: { opacity: 0, y: 120, scale: 0.8 },
    animate: { opacity: 0.35, y: 0, scale: 1.0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  'livro-13': {
    initial: { opacity: 0, rotate: -40, scale: 0.6 },
    animate: { opacity: 0.35, rotate: 0, scale: 1.0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const EditorialSection = ({ t, language, mode = 'index' }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredFold, setHoveredFold] = useState(foldsList[0]);
  const [hoveredFoldId, setHoveredFoldId] = useState(null);
  const [glassStyle, setGlassStyle] = useState(5);

  // Editorial Portuguese strings
  const content = {
    pt: {
      tagline: 'Era uma Zine que a gente tanto queria.',
      p1: 'Já tem um bom tempo que buscávamos uma amálgama de conteúdo sobre o Rush que pudesse ser: profundo, pautado na bibliografia da banda, misturado com entretenimento, gamificação, design e histórias de fãs que nenhuma IA com muitos terabytes vai conseguir contar.',
      p1_mobile: 'Buscávamos um conteúdo sobre o Rush que unisse profundidade, entretenimento e histórias reais de fãs que nenhuma IA consegue contar.',
      p2: 'Encontramos! Era uma ZINE, uma revista digital que a gente tanto queria. Assim dá tempo (em teste) da gente elaborar, avaliar com a devida profundidade, pesquisar, ir atrás das nossas fontes. ERA Uma ZINE com cara do PORTAL, PÔXA!',
      p2_mobile: 'Encontramos! Uma ZINE digital com a cara do PORTAL. Um formato que nos dá tempo para elaborar, pesquisar e avaliar tudo com a profundidade que a banda merece.',
      p3: 'Bem, o feedback e o rico e grande dinheiro dos nossos fãs (e futuros fãs) que vão pautar esse trabalho do Portal Rush Brasil. Veja nossas condições:',
      goals: [
        { value: 'Até $400', label: '1 edição mensal' },
        { value: '$600', label: '2 edições mensais' },
        { value: '$800', label: '3 edições mensais' }
      ]
    },
    en: {
      tagline: 'The Zine we wanted so much.',
      p1: 'For a long time, we were looking for a mix of Rush content that could be: deep, based on the band\'s bibliography, mixed with entertainment, gamification, design, and fan stories that no AI with many terabytes will ever be able to tell.',
      p1_mobile: 'We were looking for Rush content that unites depth, entertainment, and real fan stories that no AI can tell.',
      p2: 'We found it! It was a ZINE, a digital magazine we wanted so much. This gives us time (in testing) to elaborate, evaluate with the proper depth, research, and go after our sources. It was a ZINE with the Portal\'s face, boy!',
      p2_mobile: 'We found it! A digital ZINE with PORTAL\'s face. A format that gives us time to research and evaluate everything with the depth the band deserves.',
      p3: 'Well, the feedback and the rich and big money of our fans (and future fans) will guide this work of Portal Rush Brasil. See our goals:',
      goals: [
        { value: 'Up to $400', label: '1 monthly edition' },
        { value: '$600', label: '2 monthly editions' },
        { value: '$800', label: '3 monthly editions' }
      ]
    },
    es: {
      tagline: 'La Zine que tanto queríamos.',
      p1: 'Durante mucho tiempo, buscábamos una mezcla de contenido sobre Rush que pudiera ser: profundo, basado en la bibliografía de la banda, mezclado con entretenimiento, gamificación, diseño e historias de fans que ninguna IA con muitos terabytes podrá contar jamás.',
      p1_mobile: 'Buscábamos contenido sobre Rush que uniera profundidad, entretenimiento e historias reales de fans que ninguna IA puede contar.',
      p2: '¡La encontramos! Era uma ZINE, uma revista digital que tanto queríamos. Así nos da tiempo (en prueba) de elaborar, evaluar con la debida profundidad, investigar, ir tras nuestras fuentes. ¡Era una ZINE con la cara de PORTAL, che!',
      p2_mobile: '¡Lo encontramos! Una ZINE digital con la cara de PORTAL. Un formato que nos da tiempo para investigar y evaluar todo con la profundidad que la banda merece.',
      p3: 'Bueno, los comentarios y el rico y gran dinero de nossos fans (y futuros fans) guiarán este trabajo de Portal Rush Brasil. Mira nuestras metas:',
      goals: [
        { value: 'Hasta $400', label: '1 edición mensal' },
        { value: '$600', label: '2 ediciones mensuales' },
        { value: '$800', label: '3 ediciones mensuales' }
      ]
    }
  };

  const highlightEditorialText = (textStr) => {
    if (typeof textStr !== 'string') return textStr;
    
    const regex = /(Portal Rush Brasil|RUSH|Rush|Zine|ZINE|Portal|PORTAL)/g;
    const parts = textStr.split(regex);
    
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (part === 'Portal Rush Brasil') {
        return <span key={i} className="highlight-text-portal" style={{ whiteSpace: 'nowrap' }}>{part}</span>;
      }
      if (lower === 'rush') {
        return <span key={i} className="highlight-text-rush">{part}</span>;
      }
      if (lower === 'zine') {
        return <span key={i} className="highlight-text-zine">{part}</span>;
      }
      if (lower === 'portal') {
        return <span key={i} className="highlight-text-portal">{part}</span>;
      }
      return part;
    });
  };

  const handleGoalClick = (idx) => {
    const anchorId = 'apoio-9';
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 80;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    
    if (idx === 2) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  const handleMenuClick = (anchorId) => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 80;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const text = content[language] || content['pt'];

  // Menu items mapped with custom offsets along a Z-path
  const menuItems = [
    {
      id: 3,
      file: '3 Rick Beato Entrevista Geddy Lee.png',
      anchor: 'entrevista',
      title: 'Rick Beato & Geddy Lee',
      page: 'PÁG. 03',
      className: 'sticker-pos-1'
    },
    {
      id: 4,
      file: '4 - Geddy Lee Easter Egg.svg',
      anchor: 'easter-egg',
      title: 'Geddy Lee Easter Egg',
      page: 'PÁG. 04',
      className: 'sticker-pos-2'
    },
    {
      id: 5,
      file: '5- Anika Nilles - A Trajetoria.svg',
      anchor: 'anika',
      title: 'Anika Nilles - Trajetória',
      page: 'PÁG. 05',
      className: 'sticker-pos-3'
    },
    {
      id: 6,
      file: '5.svg',
      anchor: 'anika',
      title: 'Anika Nilles p2',
      page: 'PÁG. 06',
      className: 'sticker-pos-4'
    },
    {
      id: 9,
      file: '9 Alex Lifeson Joke.svg',
      anchor: 'blahaha',
      title: 'Alex Lifeson Humor',
      page: 'PÁG. 09',
      className: 'sticker-pos-5'
    }
  ];

  const handleRowClick = (anchorId) => {
    const element = document.getElementById(anchorId);
    if (element) {
      // 1. Tenta scrollIntoView nativo imediatamente
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // 2. Fallback de precisão com atraso para mitigar animações/shifts de layout
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 80; // Compensação da barra fixa
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      }, 150);
    } else {
      console.warn("Elemento não encontrado para ID de âncora:", anchorId);
    }
  };

  const getFoldButtonConfig = (foldNum) => {
    if (foldNum === '3') {
      return null; // Sem botão — usuário já está nessa dobra
    }
    if (foldNum === '6') {
      return {
        text: 'Ver a Trilha',
        className: 'editorial-index-row-orange-btn'
      };
    }
    if (foldNum === '7') {
      return {
        text: 'Say My Name',
        className: 'editorial-index-row-orange-btn'
      };
    }
    if (foldNum === '8') {
      return {
        text: 'Goes Around the World',
        className: 'editorial-index-row-green-btn'
      };
    }
    if (foldNum === '9') {
      return {
        text: 'make a million dreams',
        className: 'editorial-index-row-green-btn'
      };
    }
    if (foldNum === '10') {
      return {
        text: 'Contribua com a Matéria',
        className: 'editorial-index-row-orange-btn'
      };
    }
    return {
      text: language === 'pt' ? 'Ler matéria' : language === 'en' ? 'Read article' : 'Leer artículo',
      className: 'editorial-index-row-orange-btn'
    };
  };

  // Dobras 2-8 na esquerda, 9+ na direita (equilíbrio com 15 dobras totais)
  const leftFolds = foldsList.filter(f => parseInt(f.number) <= 8);
  const rightFolds = foldsList.filter(f => parseInt(f.number) > 8);

  return (
    <section className="editorial-section-container">
      {/* Confetti Rain Overlay */}
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
          <Confetti numberOfPieces={300} recycle={false} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {mode === 'poster' ? (
          <motion.div
            key="poster"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="editorial-poster-frame"
          >
            {/* Paper texture overlay */}
            <div className="poster-paper-texture"></div>
            {/* Subtle creases & folds overlay */}
            <div className="poster-creases"></div>

            {/* Brand Name Upper Right */}
            <div className="poster-brand-header">
              <img src={`${import.meta.env.BASE_URL}logo_portalrush.png`} alt="Portal Rush Brasil Logo" className="poster-logo-img" />
              <span>{highlightEditorialText("RUSH ZINE")}</span>
            </div>

            {/* Geometric shapes / Swiss layout */}
            <div className="swiss-geometric-bg">
              <div className="trapezoid-shape-1"></div>
              <div className="trapezoid-shape-2"></div>
            </div>

            {/* Scattered Background Stickers Collage */}
            <div className="poster-stickers-collage-bg">
              <img src={`${import.meta.env.BASE_URL}rushstickers/background stickers alpha-total.png`} className="bg-collage-full-img" alt="" />
              <img src={`${import.meta.env.BASE_URL}rushstickers/80-3-signals-dalmata-alpha.png`} className="bg-dalmata-large-bg" alt="" />
            </div>

            {/* Brand Logo Watermark Background (Animated with Framer Motion on view) */}
            <motion.div 
              className="poster-logo-watermark"
              initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
              whileInView={{ opacity: 0.32, scale: 1, rotate: -12 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: 'spring', duration: 1.2, bounce: 0.15 }}
            >
              <img src={`${import.meta.env.BASE_URL}Logo_PortalRushBrasil_Branca_SEM_NOME.png`} alt="Watermark Logo" />
            </motion.div>

            {/* Poster Content Grid */}
            <div className="poster-content-layout">
              <div className="poster-title-col">
                <h2 className="swiss-main-title">
                  <span className="letter-span letter-e v5-brutal">E</span>
                  <span className="letter-span letter-d v5-brutal is-outline" style={{ marginLeft: '12px' }}>D</span>
                  <span className="letter-span letter-i v5-brutal" style={{ marginLeft: '18px' }}>I</span>
                  <br style={{ content: '""', display: 'block', margin: '24px 0' }} />
                  <span className="letter-span letter-t v5-brutal is-outline is-yellow" style={{ marginTop: '12px' }}>T</span>
                  <span className="letter-span letter-o v5-brutal" style={{ marginLeft: '14px' }}>O</span>
                  <br style={{ content: '""', display: 'block', margin: '24px 0' }} />
                  <span className="letter-span letter-r v5-brutal is-outline">R</span>
                  <span className="letter-span letter-i2 v5-brutal" style={{ marginLeft: '12px' }}>I</span>
                  <span className="letter-span letter-a v5-brutal is-outline is-yellow" style={{ marginLeft: '16px' }}>A</span>
                  <span className="letter-span letter-l v5-brutal" style={{ marginLeft: '8px' }}>L</span>
                </h2>
                
                {/* Tânios Guitar Image */}
                <div className="editorial-poster-image-container">
                  <img 
                    src={`${import.meta.env.BASE_URL}tanios_guita_air_acacio.png`} 
                    alt="Tânios Acácio tocando air guitar" 
                    className="editorial-poster-image"
                  />
                  <p className="editorial-image-caption">
                    <span className="desktop-text">{highlightEditorialText(language === 'en' ? "Tânios Acácio - Creator of Portal Rush Brasil playing his first air guitar at a Rush cover show." : language === 'es' ? "Tânios Acácio - Creador de Portal Rush Brasil tocando su primer air guitar en un show tributo a Rush." : "Tânios Acácio - Criador do Portal Rush Brasil tocando seu primeiro air guitar no show cover do Rush.")}</span>
                    <span className="mobile-text">{highlightEditorialText(language === 'en' ? "Tânios Acácio on his 1st Rush air guitar." : language === 'es' ? "Tânios Acácio en su 1º air guitar de Rush." : "Tânios Acácio no seu 1º air guitar de Rush.")}</span>
                  </p>
                </div>

                <div className="swiss-edition-badge">
                  <span>{language === 'pt' ? 'ED. #01 / JULHO 2026' : language === 'en' ? 'ED. #01 / JULY 2026' : 'ED. #01 / JULIO 2026'}</span>
                </div>
              </div>

              {/* Right Column: Editorial Text */}
              <div className="poster-text-col">
                <div className="editorial-body-wrapper">
                  <h3 className="editorial-tagline">
                    "{highlightEditorialText(text.tagline)}"
                  </h3>
                  
                  <div className="editorial-divider"></div>
                  
                  <div className="editorial-paragraphs">
                    <p className="editorial-highlight-para">
                      <span className="desktop-text">{highlightEditorialText(text.p1)}</span>
                      <span className="mobile-text">{highlightEditorialText(text.p1_mobile || text.p1)}</span>
                    </p>
                    <p className="editorial-body-para">
                      <span className="desktop-text">{highlightEditorialText(text.p2)}</span>
                      <span className="mobile-text">{highlightEditorialText(text.p2_mobile || text.p2)}</span>
                    </p>
                  </div>
                </div>
                {/* Scrolling Stickers Tape Watermark */}
                <div className="poster-stickers-tape">
                  <div className="stickers-tape-track">
                    <img src={`${import.meta.env.BASE_URL}PORTAL_RUSH_STICKERS.jpeg`} alt="Stickers 1" className="stickers-img" />
                    <img src={`${import.meta.env.BASE_URL}PORTAL_RUSH_STICKERS.jpeg`} alt="Stickers 2" className="stickers-img" />
                  </div>
                </div>

                {/* Animated Infographic SVGs Section - Z-Track Layout */}
                <div className="infographic-section-wrapper" style={{ position: 'relative' }}>
                  
                  {/* Vertical Continuity Arrow (Minimalist & Fading) */}
                  <div style={{ position: 'absolute', top: '-60px', bottom: '-40px', right: '5%', width: '100px', zIndex: -1, pointerEvents: 'none' }}>
                    <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="arrowGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#ff5a36" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                      
                      <path 
                        d="M 20 0 C 80 30, 80 70, 20 100" 
                        stroke="url(#arrowGradient)" 
                        strokeWidth="2"
                        strokeDasharray="4 6"
                        vectorEffect="non-scaling-stroke"
                        fill="none" 
                      />
                    </svg>
                    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '-20px', left: '0px' }}>
                      <path d="M 5 0 L 20 20 L 35 0" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="infographic-row-title" style={{ position: 'relative', zIndex: 1 }}>
                    <span>{language === 'pt' ? 'MENU INTERATIVO DA ZINE' : language === 'en' ? 'INTERACTIVE ZINE MENU' : 'MENÚ INTERACTIVO DE LA ZINE'}</span>
                  </div>
                  
                  <div className="z-track-wrapper">
                    {/* The SVG Z-Track Line */}
                    <svg className="z-track-svg" viewBox="0 0 1000 650" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* White offset shadow line */}
                      <path 
                        d="M 80 93 L 920 93 L 80 573 L 920 573" 
                        stroke="#fffdf6" 
                        strokeWidth="14" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="z-track-shadow-line"
                      />
                      {/* Main orange track line */}
                      <path 
                        d="M 80 90 L 920 90 L 80 570 L 920 570" 
                        stroke="#ff5a36" 
                        strokeWidth="14" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeDasharray="24 18"
                        className="z-track-line"
                      />
                    </svg>

                    {/* Stickers Container positioned along the Z */}
                    <div className="z-stickers-container">
                      {menuItems.map((item, idx) => (
                        <div 
                          key={item.id + '-' + idx} 
                          className={`sticker-menu-item ${item.className}`}
                          onClick={() => handleMenuClick(item.anchor)}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {/* Digital Magazine Style Tooltip Card */}
                          {hoveredItem === item.id && (
                            <div className="sticker-tooltip-card">
                              <span className="tooltip-page">{item.page.replace('PÁG.', language === 'en' ? 'PAGE' : language === 'es' ? 'PÁG.' : 'PÁG.')}</span>
                              <span className="tooltip-title">{item.title}</span>
                              <span className="tooltip-action">{language === 'en' ? 'CLICK TO READ' : language === 'es' ? 'CLIC PARA LEER' : 'CLIQUE PARA LER'}</span>
                            </div>
                          )}

                          <img 
                            src={`${import.meta.env.BASE_URL}INFOGRAFICO MENU ZINE/${item.file}`} 
                            alt={item.title} 
                            className="sticker-menu-img"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="index"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="editorial-index-frame"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,90,54,0.05),transparent_50%)] pointer-events-none"></div>
            
            {/* Giant Background Watermark for Sumário Tab (Full Word Logo) */}
            {mode === 'index' && (
              <motion.img 
                initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
                animate={{ opacity: 0.15, scale: 1, rotate: -8 }}
                src={`${import.meta.env.BASE_URL}ZINELOGO/logozine.png`} 
                alt="Logo Zine Marca d'água Fundo" 
                className="editorial-index-logo-bg"
              />
            )}
            
            {/* Main Title for Sumário */}
            <h2 className="sumario-main-title">
              {t.navSumario}
            </h2>
            
            <div className="editorial-index-grid relative z-10">
              {/* Column 1 - Left Submenu */}
              <div className="editorial-index-left-col relative">
                <div className="editorial-index-hero-thumbnail glass-style-5">
                  <img 
                    src={`${import.meta.env.BASE_URL}Bottons/Botton-Geddylee-Zine.png`} 
                    alt="Hero Geddy Lee Thumbnail" 
                    className="index-hero-thumb-img" 
                  />
                </div>
                
                <div className="editorial-index-rows-container">
                  {leftFolds.map((fold) => (
                    <div
                      key={fold.id}
                      className="editorial-index-row group"
                      onMouseEnter={() => {
                        setHoveredFold(fold);
                        setHoveredFoldId(fold.id);
                      }}
                      onMouseLeave={() => {
                        setHoveredFoldId(null);
                      }}
                      onClick={() => handleRowClick(fold.id)}
                    >
                      <div className="editorial-index-row-header">
                        <h3 className={`editorial-index-row-title-text ${fold.number === '8' || fold.number === '9' ? 'text-money-green' : ''}`}>
                          {fold.number} {t[fold.titleKey] || fold.titleFallback}
                        </h3>
                      </div>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={hoveredFoldId === fold.id ? { height: 'auto', opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="editorial-index-row-desc" style={{ marginTop: 0 }}>
                          {fold.desc[language] || fold.desc['pt']}
                        </p>
                        {getFoldButtonConfig(fold.number) && (
                          <div className="editorial-index-row-btn-wrapper">
                            <button className={getFoldButtonConfig(fold.number).className} onClick={(e) => { e.stopPropagation(); handleRowClick(fold.id); }}>
                              <span>{getFoldButtonConfig(fold.number).text}</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Column 2 - Large Center Sticky Image */}
              <div className="editorial-index-image-col">
                <div 
                  className="editorial-index-sticky-image-container"
                  onClick={() => handleRowClick(hoveredFold.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredFold.id}
                      src={`${import.meta.env.BASE_URL}${hoveredFold.img}`}
                      alt={`${hoveredFold.number} ${t[hoveredFold.titleKey]}`}
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 0.6, scale: hoveredFold.isLocked ? 1.0 : 1.04 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={`editorial-index-preview-img ${hoveredFold.fitMode === 'contain' ? 'fit-contain' : 'fit-cover'} ${hoveredFold.isLocked ? 'is-blur' : ''}`}
                    />
                  </AnimatePresence>
                  
                  {/* Blend Filter Overlay (Turns green dynamically for money-related folds) */}
                  <div className={`editorial-index-image-overlay ${hoveredFold.number === '8' || hoveredFold.number === '9' ? 'is-green' : ''}`}></div>

                  {/* Dynamic Logo Overlay with distinct animations based on hovered fold */}
                  {mode === 'index' && (
                    <motion.img 
                      key={hoveredFold.id}
                      variants={logoVariants}
                      initial={logoVariants[hoveredFold.id] ? "initial" : { opacity: 0, scale: 0.8 }}
                      animate={logoVariants[hoveredFold.id] ? "animate" : { opacity: 0.35, scale: 1.0 }}
                      src={`${import.meta.env.BASE_URL}ZINELOGO/Zine-Logo-Modelo-no-elements-removebg-preview.png`} 
                      alt="Logo Zine Marca d'água Slide" 
                      className="editorial-index-logo-slide-overlay editorial-index-logo-slide-side"
                    />
                  )}

                  {/* Lock Overlay for surprise content (Easter Egg) */}
                  {hoveredFold.isLocked && (
                    <div className="editorial-index-lock-overlay">
                      {/* Stylized Easter Egg SVG */}
                      <svg className="lock-icon egg-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C7.5 2 4 7.5 4 13.5C4 18.5 7.5 22 12 22C16.5 22 20 18.5 20 13.5C20 7.5 16.5 2 12 2Z" fill="currentColor" fillOpacity="0.1" />
                        <path d="M6 12L9.5 14.5L12 12L14.5 14.5L18 12" />
                        <path d="M5.2 16L9.2 18.5L12 16L14.8 18.5L18.8 16" />
                        <path d="M8.5 8L12 10.5L15.5 8" />
                      </svg>
                      <span className="lock-text">
                        {language === 'pt' ? 'CONTEÚDO BLOQUEADO' : language === 'en' ? 'LOCKED CONTENT' : 'CONTENIDO BLOQUEADO'}
                      </span>
                    </div>
                  )}
                  
                  {/* Pulse indicator */}
                  <div className="editorial-index-uplink">
                    <div className="editorial-index-uplink-dot"></div>
                    <span>
                      {language === 'pt' ? 'Zine Conectada' : language === 'en' ? 'Zine Uplink' : 'Zine Conectada'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 3 - Right Submenu (Without spacer title & tag) */}
              <div className="editorial-index-right-col">
                <div className="editorial-index-rows-container">
                  {rightFolds.map((fold) => (
                    <div
                      key={fold.id}
                      className="editorial-index-row group"
                      onMouseEnter={() => {
                        setHoveredFold(fold);
                        setHoveredFoldId(fold.id);
                      }}
                      onMouseLeave={() => {
                        setHoveredFoldId(null);
                      }}
                      onClick={() => handleRowClick(fold.id)}
                    >
                      <div className="editorial-index-row-header">
                        <h3 className={`editorial-index-row-title-text ${fold.number === '8' || fold.number === '9' ? 'text-money-green' : ''}`}>
                          {fold.number} {t[fold.titleKey] || fold.titleFallback}
                        </h3>
                      </div>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={hoveredFoldId === fold.id ? { height: 'auto', opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="editorial-index-row-desc" style={{ marginTop: 0 }}>
                          {fold.desc[language] || fold.desc['pt']}
                        </p>
                        {getFoldButtonConfig(fold.number) && (
                          <div className="editorial-index-row-btn-wrapper">
                            <button className={getFoldButtonConfig(fold.number).className} onClick={(e) => { e.stopPropagation(); handleRowClick(fold.id); }}>
                              <span>{getFoldButtonConfig(fold.number).text}</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
