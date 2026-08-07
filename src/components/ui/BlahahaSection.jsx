import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './BlahahaSection.css';

// 3D Poster Card Component with Pop-out Effect on scroll
const Blahaha3DPoster = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate transforms based on scroll progress
  const baseScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const baseRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const baseRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);

  const overlayScale = useTransform(scrollYProgress, [0.15, 0.45, 0.8], [0.95, 1.15, 1.02]);
  const overlayTranslateZ = useTransform(scrollYProgress, [0.15, 0.45, 0.8], [0, 90, 30]);
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.8], [0, 1, 1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <div className="poster-3d-wrapper" ref={containerRef} style={{ perspective: '1200px' }}>
      <motion.div 
        className="poster-3d-card"
        style={{
          scale: baseScale,
          rotateX: baseRotateX,
          rotateY: baseRotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Base Layer: Poster without text/elements */}
        <img loading="lazy" src={`${import.meta.env.BASE_URL}Blahaha/debbie-poster-no-elements.jpeg`} 
          alt="Geddy Does Dallas Base Poster" 
          className="poster-layer base-layer"
        />

        {/* Overlay Layer: Full poster with elements popping out */}
        <motion.img 
          src={`${import.meta.env.BASE_URL}Blahaha/Debbiedoesdallas.jpg`} 
          alt="Geddy Does Dallas Full Poster" 
          className="poster-layer overlay-layer"
          style={{
            scale: overlayScale,
            z: overlayTranslateZ,
            opacity: overlayOpacity,
            y: overlayY,
            transformStyle: 'preserve-3d',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </motion.div>
    </div>
  );
};

export const BlahahaSection = ({ t, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const content = {
    pt: {
      title: 'BLAH-BLAH-HA!!!',
      subtitle: 'AH Não!!! Explicamos as piadas de Alex (e de Geddy Lee) em Dallas',
      explanationTitle: 'Explicando as Piadas',
      explanationBody: 'Alex prepara o terreno para uma piada pornográfica local, dizendo que estava tomando banho, e logo em seguida faz um trocadilho com o nome de um filme pornô dos anos 70 gravado em Dallas chamado “Debbie Does Dallas”. Ao invés de “Debbie”, Alex provoca com a rima “Geddy”. O baixista do Rush entra na brincadeira com a piada de salsicha pelo seu personagem Gershon que na verdade é seu nome de batismo.',
      dialogue: [
        { speaker: 'Ged', text: 'Essa música é tão divertida!', side: 'left' },
        { speaker: 'Alex', text: 'Ah, é mesmo?! Não sei se é tão divertida.', side: 'right' },
        { speaker: 'Ged', text: 'Você já conhece meu amigo?', side: 'left' },
        { speaker: 'Alex', text: 'Essa música é estranha.', side: 'right' },
        { speaker: 'Ged', text: 'Diga oi para as pessoas.', side: 'left' },
        { speaker: 'Alex', text: 'Ah! “Oi para as pessoas! É tão bom estar neste palco. É mesmo. Com certeza é bem melhor do que ficar à toa num hotel… eu não sabia bem o que fazer. Eu me vestia, me despia, aí depois me vestia, me despia até tomar um banho enquanto eu estava vestido. Eu estava todo ferrado!.. e escovei os dentes, eu acho… na semana passada! … e assisti aquele filme Geddy Does Dallas”\n\n[Público de Dallas vem a baixo].\n\nNão sei se você já viu esse filme?!', side: 'right' },
        { speaker: 'Ged', text: 'Ah esse garotinho é tão sapequinha… uma salsicha sapequinha!', side: 'left' }
      ]
    },
    en: {
      title: 'BLAH-BLAH-HA!!!',
      subtitle: 'Oh No, we explain Alex\'s (and Geddy Lee\'s) jokes in Dallas',
      explanationTitle: 'Explaining the Jokes',
      explanationBody: 'Alex sets the stage for a local adult film joke, mentioning that he was showering, and immediately after makes a pun on the name of a famous 70s adult film based in Dallas called "Debbie Does Dallas". Instead of "Debbie", Alex provokes with the rhyming name "Geddy". The Rush bassist joins the fun with a sausage joke related to his character Gershon, which is actually his birth name.',
      dialogue: [
        { speaker: 'Ged', text: 'This song is so much fun!', side: 'left' },
        { speaker: 'Alex', text: 'Oh, really?! I don\'t know if it\'s that much fun.', side: 'right' },
        { speaker: 'Ged', text: 'Have you met my friend?', side: 'left' },
        { speaker: 'Alex', text: 'This song is weird.', side: 'right' },
        { speaker: 'Ged', text: 'Say hi to the people.', side: 'left' },
        { speaker: 'Alex', text: 'Oh! "Hi to the people! It\'s so nice to be on this stage. It really is. It\'s definitely way better than just hanging out in a hotel... I didn\'t quite know what to do. I got dressed, undressed, then got dressed again, undressed until I took a shower while I was dressed. I was all messed up!.. and brushed my teeth, I think... last week! ... and watched that movie Geddy Does Dallas"\n\n[Dallas crowd goes wild].\n\nI don\'t know if you\'ve seen that movie?!', side: 'right' },
        { speaker: 'Ged', text: 'Oh this little boy is so naughty... a naughty sausage!', side: 'left' }
      ]
    },
    es: {
      title: 'BLAH-BLAH-HA!!!',
      subtitle: '¡Ah no, explicamos los chistes de Alex (y de Geddy Lee) en Dallas',
      explanationTitle: 'Explicando los Chistes',
      explanationBody: 'Alex prepara el terreno para un chiste local de cine para adultos, diciendo que se estaba bañando, y enseguida hace un juego de palabras con el nombre de una famosa película de los 70 rodada en Dallas llamada "Debbie Does Dallas". En lugar de "Debbie", Alex provoca con la rima "Geddy". El bajista de Rush se une al juego con un chiste de salchicha relacionado con su personaje Gershon, que en realidad es su nombre de pila.',
      dialogue: [
        { speaker: 'Ged', text: '¡Esta canción es tan divertida!', side: 'left' },
        { speaker: 'Alex', text: '¡¿Ah, de verdad?! No sé si es tan divertida.', side: 'right' },
        { speaker: 'Ged', text: '¿Ya conocen a mi amigo?', side: 'left' },
        { speaker: 'Alex', text: 'Esta canción es extraña.', side: 'right' },
        { speaker: 'Ged', text: 'Dile hola a la gente.', side: 'left' },
        { speaker: 'Alex', text: '¡Ah! “¡Hola a la gente! Es tan bueno estar en este escenario. De verdad. Seguro que es mucho mejor que estar perdiendo el tiempo en un hotel… no sabía bien qué hacer. Me vestía, me desvestía, luego me vestía, me desvestía hasta que me di una ducha mientras estaba vestido. ¡Estaba todo jodido!.. y me cepillé los dientes, creo… ¡la semana pasada! … y vi esa película Geddy Does Dallas”\n\n[El público de Dallas se vuelve loco].\n\n¡¿No sé si ya viste esa película?!', side: 'right' },
        { speaker: 'Ged', text: 'Ah, este niñito es tan travieso… ¡una salchicha traviesa!', side: 'left' }
      ]
    }
  };

  const text = content[language] || content['pt'];
  const dialogue = text.dialogue || [];

  return (
    <section className="blahaha-section" style={{ paddingTop: '0.5rem', marginTop: '0' }}>
      <div 
        className="blahaha-container"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundImage: `
            linear-gradient(rgba(18, 18, 18, 0.85), rgba(18, 18, 18, 0.96)), 
            url(${import.meta.env.BASE_URL}Blahaha/Debbiedoesdallas.jpg),
            url(${import.meta.env.BASE_URL}Blahaha/Debbiedoesdallas.jpg)
          `,
          backgroundSize: 'cover, contain, cover',
          backgroundPosition: 'center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat'
        }}
      >
        {/* Header - Subtitle only (Title is handled by SectionSideLabel 12) */}
        <div className="blahaha-header" style={{ marginBottom: '1.5rem', marginTop: '0' }}>
          <p className="blahaha-subtitle">{text.subtitle}</p>
        </div>

        {/* Intro Text - Full Width at Top */}
        <div className="blahaha-intro-text" style={{ marginBottom: '2.5rem' }}>
          <p className="intro-p1">
            <span className="magazine-drop-cap">
              {language === 'en' ? 'S' : 'E'}
            </span>
            <span className="intro-lead-in">
              {language === 'pt' 
                ? 'm algum lugar que a gente não sabe precisar, ' 
                : language === 'en' 
                ? 'omewhere we can\'t point out precisely, ' 
                : 'n algún lugar que no sabemos precisar, '}
            </span>
            {language === 'pt'
              ? (!isMobile || isIntroExpanded ? 'vimos um comentário cirúrgico de um fã: “se o Alex não fosse músico, certamente seria comediante”. De alguma forma esse fã conseguiu pegar o bisturi e cortar a realidade com precisão cirúrgica.' : 'vimos um comentário cirúrgico de um fã: “se o Alex não fosse músico...')
              : language === 'en'
              ? (!isMobile || isIntroExpanded ? 'we saw a surgical comment from a fan: "if Alex weren\'t a musician, he would certainly be a comedian". Somehow this fan managed to take the scalpel and cut reality with surgical precision.' : 'we saw a surgical comment from a fan: "if Alex weren\'t a musician...')
              : (!isMobile || isIntroExpanded ? 'vimos un comentario quirúrgico de un fan: “si Alex no fuera músico, sin duda sería comediante”. De alguna manera este fan logró tomar el bisturí y cortar la realidad con precisión quirúrgica.' : 'vimos un comentario quirúrgico de un fan: “si Alex no fuera músico...')
            }
            {isMobile && !isIntroExpanded && (
              <span 
                onClick={() => setIsIntroExpanded(true)}
                style={{ cursor: 'pointer', color: '#ffdf00', fontWeight: 'bold', marginLeft: '2px', fontSize: '1.2rem', lineHeight: '1' }}
                title="Ler mais"
              >
                ...
              </span>
            )}
          </p>
          
          {(!isMobile || isIntroExpanded) && (
            <>
              <p className="intro-p2">
                {language === 'pt'
                  ? 'Alex é o melhor nisso, um especialista em fazer os outros rirem, e como não poderia ser diferente, mais uma vez isso ocorreu.'
                  : language === 'en'
                  ? 'Alex is the best at this, a specialist in making others laugh, and as it couldn\'t be different, it happened once again.'
                  : 'Alex es el mejor en esto, un especialista en hacer reír a los demás, y como no podía ser de otra manera, volvió a suceder.'
                }
              </p>
              
              <p className="intro-p3">
                {language === 'pt'
                  ? 'No último show em Dallas (Texas) do dia 26 de junho, na turnê Fifty Something , após terminarem de tocar a espetacular la Vila Strangiatto o baixista e guitarrista do Rush começam a conversar. Obviamente Alex começa a falar um monte de bobagens:'
                  : language === 'en'
                  ? 'At the last show in Dallas (Texas) on June 26th, on the Fifty Something tour, after they finished playing the spectacular La Villa Strangiato, Rush\'s bassist and guitarist start talking. Obviously Alex starts talking a lot of nonsense:'
                  : 'En el último show en Dallas (Texas) del 26 de junio, na gira Fifty Something, luego de terminar de tocar la espectacular La Villa Strangiato, el bajista y el guitarrista de Rush comienzan a conversar. Obviamente Alex empieza a decir muchas tonterías:'
                }
              </p>
              {isMobile && (
                <span 
                  onClick={() => setIsIntroExpanded(false)}
                  style={{ cursor: 'pointer', color: '#ffdf00', fontWeight: 'bold', display: 'block', marginTop: '10px', fontSize: '0.9rem' }}
                >
                  {language === 'en' ? 'Show less' : language === 'es' ? 'Mostrar menos' : 'Mostrar menos'}
                </span>
              )}
            </>
          )}
        </div>

        {/* Two-Column Grid */}
        <div className="blahaha-grid" style={{ alignItems: 'start' }}>
          
          {/* Left Column: Embed & Explanation */}
          <div className="blahaha-left-column">
            <div className="instagram-embed-wrapper">
              <iframe 
                src="https://www.instagram.com/p/DaJXpvhh7OW/embed" 
                width="100%" 
                height="480" 
                frameBorder="0" 
                scrolling="no" 
                allowtransparency="true" 
                allow="encrypted-media"
                title="Alex Lifeson Instagram Joke"
                className="instagram-iframe"
              ></iframe>
            </div>
            
            {/* Explanation card moved here to balance the dialogue height */}
            <div className="blahaha-explanation-card">
              <span className="explanation-title">{text.explanationTitle}</span>
              <p className="explanation-body">
                {(!isMobile || isExpanded) ? (
                  <>
                    {text.explanationBody}
                    {isMobile && (
                      <span 
                        onClick={() => setIsExpanded(false)}
                        style={{ cursor: 'pointer', color: '#ffdf00', fontWeight: 'bold', display: 'block', marginTop: '10px', fontSize: '0.9rem' }}
                      >
                        {language === 'en' ? 'Show less' : language === 'es' ? 'Mostrar menos' : 'Mostrar menos'}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {text.explanationBody.substring(0, 140)}
                    <span 
                      onClick={() => setIsExpanded(true)}
                      style={{ cursor: 'pointer', color: '#ffdf00', fontWeight: 'bold', marginLeft: '2px', fontSize: '1.2rem', lineHeight: '1' }}
                      title="Ler mais"
                    >
                      ...
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right Column: Dialogue Logs */}
          <div className="blahaha-right-column">
            {/* Dialogue chat bubbles */}
            <div className="dialogue-chat-container" style={{ marginTop: 0 }}>
              {dialogue.map((item, idx) => {
                const isGed = item.speaker === 'Ged';
                const isLast = idx === dialogue.length - 1;
                
                // Add bubble-sausage class to the last sausage entry
                let bubbleClass = `dialogue-bubble ${isGed ? 'bubble-ged' : 'bubble-alex'}`;
                if (isLast) {
                  bubbleClass = 'dialogue-bubble bubble-sausage';
                }
                
                return (
                  <div 
                    key={idx} 
                    className={bubbleClass}
                  >
                    <span className="bubble-speaker-tag">{item.speaker}</span>
                    <p className="bubble-message-text">
                      {/* Detect stage direction inside brackets */}
                      {item.text.split(/(\[.*?\])/).map((part, pIdx) => {
                        if (part.startsWith('[') && part.endsWith(']')) {
                          return <span key={pIdx} className="stage-direction">{part}</span>;
                        }
                        return part;
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
