import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BigMoneySection.css';

export const BigMoneySection = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const content = {
    pt: {
      p1_short: 'Sem enrolação, nós precisamos do seu “Big Money”. Nosso trabalho é 100% Independente: Cada doação (ou o valor de um cafezinho) vai direto para os custos de servidor, licenças de software 3D e para manter este projeto vivo, fruto da nossa paixão pelo Rush.',
      p1: 'Sem enrolação, nós precisamos do seu “Big Money”. Nosso trabalho é 100% Independente: Cada doação (ou o valor de um cafezinho) vai direto para os custos de servidor, licenças de software 3D e para manter este projeto vivo, fruto da nossa paixão pelo Rush. Nossa promessa é continuar produzindo conteúdo independente, profundo e de alta qualidade para a comunidade.',
      p2: 'A Barra de Apoiadores: Todo fã que doar a partir de 3 dólares e fizer contato conosco via e-mail terá seu nome e link do perfil exibidos na nossa Barra de Apoiadores oficial. (Tenha paciência enquanto finalizamos a programação da barra visual no site — muita coisa está acontecendo agora, mas é nosso compromisso colocar seu perfil no ar em até 3 dias corridos).',
      p3: 'Compartilhe: Não pode doar agora? Sem problema. Compartilhar a rushzine.com com outros fãs do Rush é fundamental.',
      p4: 'Sem Paywalls: Esta Zine é totalmente gratuita. Você está financiando um projeto da comunidade, não comprando uma assinatura. Todas as contribuições são voluntárias.',
      campaignPeriodTitle: 'CONTATO:',
      campaignStart: 'yyz@rushzine.com',
      campaignEnd: '+55 31-97210-2112'
    },
    en: {
      p1_short: 'No bullshit, we need your "Big Money". Our work is 100% independent: Every donation (or the cost of a coffee) goes straight to server costs, 3D software licenses, and keeping this passion project alive.',
      p1: 'No bullshit, we need your "Big Money". Our work is 100% independent: Every donation (or the cost of a coffee) goes straight to server costs, 3D software licenses, and keeping this passion project alive. Our promise is to keep producing deep, high-quality, independent content for the community.',
      p2: 'The Backers Bar: Every fan who donates $3 or more and reaches out via email will have their name and profile link displayed on our official Backers Bar. (Bear with us while we finish coding the visual bar on the site — a lot is happening right now, but we are committed to getting your profile up within 3 calendar days).',
      p3: 'Spread the Word: Can\'t donate right now? No problem. Sharing rushzine.com with other Rush fans is essential.',
      p4: 'No Paywalls: This Zine is completely free. You are funding a community project, not buying a subscription. All contributions are voluntary.',
      campaignPeriodTitle: 'CONTACT:',
      campaignStart: 'yyz@rushzine.com',
      campaignEnd: '+55 31-97210-2112'
    },
    es: {
      p1_short: 'Sin tonterías, necesitamos tu "Big Money". Nuestro trabajo es 100% independiente: Cada donación (o el costo de un café) va directamente a los costos del servidor, licencias de software 3D y para mantener vivo este proyecto apasionante.',
      p1: 'Sin tonterías, necesitamos tu "Big Money". Nuestro trabajo es 100% independiente: Cada donación (o el costo de un café) va directamente a los costos del servidor, licencias de software 3D y para mantener vivo este proyecto apasionante. Nuestra promesa es seguir produciendo contenido independiente, profundo y de alta calidad para la comunidad.',
      p2: 'La Barra de Patrocinadores: Cada fan que done $3 o más y nos contacte por correo electrónico tendrá su nombre y enlace de perfil en nuestra Barra de Patrocinadores oficial. (Tenga paciencia mientras terminamos de programar la barra visual en el sitio — están sucediendo muchas cosas en este momento, pero estamos comprometidos a subir su perfil dentro de los 3 días calendario).',
      p3: 'Pasa la Voz: ¿No puedes donar ahora mismo? No hay problema. Compartir rushzine.com con otros fans de Rush es fundamental.',
      p4: 'Sin Paywalls: Esta Zine es completamente gratuita. Estás financiando un proyecto comunitario, no comprando una suscripción. Todas las contribuciones son voluntarias.',
      campaignPeriodTitle: 'CONTACTO:',
      campaignStart: 'yyz@rushzine.com',
      campaignEnd: '+55 31-97210-2112'
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

  return (
    <section className="big-money-section-container">
      <div 
        className="big-money-card-layout"
        style={{ '--bg-image': `url("${import.meta.env.BASE_URL}The Big Money/money-rush-contribuicao.svg")` }}
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
        
        <div className="big-money-modern-grid">
          <div className="big-money-text-content">
            <p className="rush-font-p1">
              {isMobile && !isExpanded 
                ? highlightEditorialText(text.p1_short) 
                : highlightEditorialText(text.p1)
              }
              {isMobile && !isExpanded && (
                <span 
                  onClick={() => setIsExpanded(true)}
                  style={{ cursor: 'pointer', color: '#133215', fontWeight: 'bold', marginLeft: '5px', fontSize: '1.2rem', lineHeight: '1', whiteSpace: 'nowrap' }}
                  title="Ler mais"
                >
                  ... Ler mais
                </span>
              )}
            </p>
            {(!isMobile || isExpanded) && (
              <>
                <p className="rush-font-p2">{highlightEditorialText(text.p2)}</p>
                <p className="rush-font-p2">{highlightEditorialText(text.p3)}</p>
                <p className="big-money-paragraph highlight-paragraph" style={{ marginTop: '0.5rem' }}>{highlightEditorialText(text.p4)}</p>
                {isMobile && (
                  <span 
                    onClick={() => setIsExpanded(false)}
                    style={{ cursor: 'pointer', color: '#133215', fontWeight: 'bold', display: 'block', marginTop: '10px', fontSize: '1rem', textDecoration: 'underline' }}
                  >
                    {language === 'en' ? 'Show less' : language === 'es' ? 'Mostrar menos' : 'Mostrar menos'}
                  </span>
                )}
              </>
            )}
          </div>
          <div 
            className="big-money-campaign-box"
            style={{ '--contact-bg-image': `url("${import.meta.env.BASE_URL}The Big Money/money-rush-contribuicao.svg")` }}
          >
            <h4 className="campaign-box-title">{highlightEditorialText(text.campaignPeriodTitle)}</h4>
            <div className="campaign-dates">
              <span className="campaign-date-item" style={{ fontSize: '1.15rem' }}>{text.campaignStart}</span>
              <span className="campaign-date-item" style={{ fontSize: '1.15rem' }}>{text.campaignEnd}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
