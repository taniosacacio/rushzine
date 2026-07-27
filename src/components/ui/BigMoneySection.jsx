import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { ArrowRight } from 'lucide-react';
import './BigMoneySection.css';

export const BigMoneySection = ({ language }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Content dictionary
  const content = {
    pt: {
      title: 'VAI ROLAR OU VAI FLOPAR?',
      p1: 'Temos um propósito muito claro com essa ZINE: entregar conteúdo de alta qualidade para os fãs, unindo conhecimento profundo e entretenimento. É o que já fazemos há mais de 15 anos, mas agora no formato que entrega a melhor experiência.',
      p2: 'Tem de tudo: bibliografia, novidades, curiosidades, jogos, easter eggs, comércio e o coração da parada: a HISTÓRIA DOS FÃS DE RUSH.',
      p3: 'CONTRIBUA com o seu "THE BIG MONEY" e faça a RUSH ZINE ROLAR de vez.',
      campaignPeriodTitle: 'PERÍODO DA CAMPANHA:',
      campaignStart: 'Início: 09 de julho',
      campaignEnd: 'Término: 09 de agosto',
      goalsIntro: 'A META DEFINE O RITMO:',
      goals: [
        { name: 'Bom e Modesto', label: '$400 dólares', value: 'Faremos 1 edição' },
        { name: 'Legal, hein?!', label: '$600 dólares', value: 'Faremos 2 edições' },
        { name: 'Estamos Ricos!', label: '$800 dólares', value: 'Faremos 3 edições' }
      ],
      note: '(Nota: Para contribuições maiores ou parcerias, entre em contato direto pelo e-mail: zine@portalrushzine.com)'
    },
    en: {
      title: 'VAI ROLAR OU VAI FLOPAR?',
      p1: 'Temos um propósito muito claro com essa ZINE: entregar conteúdo de alta qualidade para os fãs, unindo conhecimento profundo e entretenimento. É o que já fazemos há mais de 15 anos, mas agora no formato que entrega a melhor experiência.',
      p2: 'Tem de tudo: bibliografia, novidades, curiosidades, jogos, easter eggs, comércio e o coração da parada: a HISTÓRIA DOS FÃS DE RUSH.',
      p3: 'CONTRIBUA com o seu "THE BIG MONEY" e faça a RUSH ZINE ROLAR de vez.',
      campaignPeriodTitle: 'PERÍODO DA CAMPANHA:',
      campaignStart: 'Início: 09 de julho',
      campaignEnd: 'Término: 09 de agosto',
      goalsIntro: 'A META DEFINE O RITMO:',
      goals: [
        { name: 'Bom e Modesto', label: '$400 dólares', value: 'Faremos 1 edição' },
        { name: 'Legal, hein?!', label: '$600 dólares', value: 'Faremos 2 edições' },
        { name: 'Estamos Ricos!', label: '$800 dólares', value: 'Faremos 3 edições' }
      ],
      note: '(Nota: Para contribuições maiores ou parcerias, entre em contato direto pelo e-mail: zine@portalrushzine.com)'
    },
    es: {
      title: 'VAI ROLAR OU VAI FLOPAR?',
      p1: 'Temos um propósito muito claro com essa ZINE: entregar conteúdo de alta qualidade para os fãs, unindo conhecimento profundo e entretenimento. É o que já fazemos há mais de 15 anos, mas agora no formato que entrega a melhor experiência.',
      p2: 'Tem de tudo: bibliografia, novidades, curiosidades, jogos, easter eggs, comércio e o coração da parada: a HISTÓRIA DOS FÃS DE RUSH.',
      p3: 'CONTRIBUA com o seu "THE BIG MONEY" e faça a RUSH ZINE ROLAR de vez.',
      campaignPeriodTitle: 'PERÍODO DA CAMPANHA:',
      campaignStart: 'Início: 09 de julho',
      campaignEnd: 'Término: 09 de agosto',
      goalsIntro: 'A META DEFINE O RITMO:',
      goals: [
        { name: 'Bom e Modesto', label: '$400 dólares', value: 'Faremos 1 edición' },
        { name: 'Legal, hein?!', label: '$600 dólares', value: 'Faremos 2 ediciones' },
        { name: 'Estamos Ricos!', label: '$800 dólares', value: 'Faremos 3 ediciones' }
      ],
      note: '(Nota: Para contribuições maiores ou parcerias, entre em contato direto pelo e-mail: zine@portalrushzine.com)'
    }
  };

  const text = content[language] || content['pt'];

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
    document.getElementById('apoio-8')?.scrollIntoView({ behavior: 'smooth' });
    if (idx === 2) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  return (
    <section className="big-money-section-container">
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
          <Confetti numberOfPieces={300} recycle={false} />
        </div>
      )}

      <div 
        className="big-money-card-layout"
        style={{ '--bg-image': `url("${import.meta.env.BASE_URL}fundomoney.png")` }}
      >
        {/* The Big Money Title */}
        <motion.h4 
          className="editorial-big-money-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          style={{ display: "inline-block", textAlign: "center", width: "100%", marginBottom: "1rem" }}
        >
          {"THE BIG MONEY".split("").map((char, index) => (
            <motion.span
              key={index}
              style={{ display: "inline-block" }}
              variants={{
                hidden: { color: "#ff5a36", y: 0 },
                visible: {
                  color: ["#92B775", "#133215", "#133215"], // Strong retro colors
                  y: [0, -4, 0], // subtle bounce
                  transition: {
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: "easeInOut",
                    times: [0, 0.4, 1]
                  }
                }
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h4>

        <h3 className="big-money-subtitle solid-subtitle">{highlightEditorialText(text.title)}</h3>
        
        <div className="big-money-modern-grid">
          <div className="big-money-text-content">
            {(!isMobile || isExpanded) ? (
              <>
                <p className="rush-font-p1">{highlightEditorialText(text.p1)}</p>
                <p className="rush-font-p2">{highlightEditorialText(text.p2)}</p>
                <p className="big-money-paragraph highlight-paragraph">{highlightEditorialText(text.p3)}</p>
                {isMobile && (
                  <span 
                    onClick={() => setIsExpanded(false)}
                    style={{ cursor: 'pointer', color: '#133215', fontWeight: 'bold', display: 'block', marginTop: '10px', fontSize: '0.9rem', textDecoration: 'underline' }}
                  >
                    {language === 'en' ? 'Show less' : language === 'es' ? 'Mostrar menos' : 'Mostrar menos'}
                  </span>
                )}
              </>
            ) : (
              <p className="rush-font-p1">
                {highlightEditorialText(text.p1.substring(0, 140))}
                <span 
                  onClick={() => setIsExpanded(true)}
                  style={{ cursor: 'pointer', color: '#133215', fontWeight: 'bold', marginLeft: '2px', fontSize: '1.2rem', lineHeight: '1' }}
                  title="Ler mais"
                >
                  ...
                </span>
              </p>
            )}
          </div>
          <div className="big-money-campaign-box">
            <h4 className="campaign-box-title">{highlightEditorialText(text.campaignPeriodTitle)}</h4>
            <div className="campaign-dates">
              <span className="campaign-date-item">{text.campaignStart}</span>
              <span className="campaign-date-item">{text.campaignEnd}</span>
            </div>
          </div>
        </div>

        <p className="editorial-conditions-intro" style={{marginTop: '2.5rem'}}>
          {highlightEditorialText(text.goalsIntro)}
        </p>

        {/* Visual Goal/Conditions Grid (Gradated color) */}
        <div className="editorial-goals-grid">
          {text.goals.map((g, idx) => (
            <motion.div 
              key={idx} 
              className={`big-money-goal-card bg-money-card-${idx}`}
              whileHover={{ 
                scale: 1.02,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => handleGoalClick(idx)}
            >
              <div className="goal-card-main-info">
                <span className="goal-name-title">{g.name}</span>
                <span className="goal-label">{highlightEditorialText(g.label)}</span>
              </div>
              
              <div className="goal-card-right-info">
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  style={{ display: 'flex', alignItems: 'center', opacity: 0.9 }}
                >
                  <ArrowRight size={22} color="#133215" />
                </motion.div>

                <span className="goal-value">{g.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <p className="big-money-note">{highlightEditorialText(text.note)}</p>
      </div>
    </section>
  );
};
