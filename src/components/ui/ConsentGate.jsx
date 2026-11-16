import { useState } from 'react';

const KEY = 'rushzine-consent-v1';

const copy = {
  pt: {
    title: 'Antes de entrar',
    body: 'A RushZine é um projeto de fãs, independente e não oficial, sem vínculo com a banda Rush, seus integrantes ou representantes. Usamos cookies e armazenamento local só para o funcionamento do site e das preferências (como o idioma). Não vendemos seus dados. Os conteúdos citam suas fontes e são retirados a pedido do titular dos direitos.',
    accept: 'Li e aceito — abrir a Zine',
    more: 'Ver políticas do site',
  },
  en: {
    title: 'Before you enter',
    body: 'RushZine is an independent, unofficial fan project, not affiliated with the band Rush, its members or representatives. We use cookies and local storage only to run the site and keep your preferences (such as language). We never sell your data. Content credits its sources and is removed at the rights holder\'s request.',
    accept: 'I have read and accept — open the Zine',
    more: 'See site policies',
  },
  es: {
    title: 'Antes de entrar',
    body: 'RushZine es un proyecto de fans independiente y no oficial, sin vínculo con la banda Rush, sus integrantes o representantes. Usamos cookies y almacenamiento local solo para el funcionamiento del sitio y tus preferencias (como el idioma). Nunca vendemos tus datos. El contenido cita sus fuentes y se retira a pedido del titular de los derechos.',
    accept: 'Leí y acepto — abrir la Zine',
    more: 'Ver políticas del sitio',
  },
};

const readAccepted = () => {
  try { return localStorage.getItem(KEY) === 'yes'; } catch { return false; }
};

export const LanguageSwitch = ({ language, setLanguage }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
    {[['pt', 'br', 'PT'], ['en', 'us', 'EN'], ['es', 'es', 'ES']].map(([code, flag, label]) => (
      <button key={code} type="button" onClick={() => setLanguage?.(code)} aria-pressed={language === code} style={{
        display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
        background: language === code ? 'rgba(255,139,84,0.18)' : 'transparent', color: '#fff', fontSize: '0.85rem',
        border: `1px solid ${language === code ? '#ff8b54' : 'rgba(255,255,255,0.2)'}`,
      }}>
        <img src={`https://flagcdn.com/${flag}.svg`} width="18" alt="" style={{ borderRadius: '2px' }} /> {label}
      </button>
    ))}
  </div>
);

export const ConsentGate = ({ language = 'pt', setLanguage }) => {
  const [accepted, setAccepted] = useState(readAccepted);
  if (accepted) return null;
  const c = copy[language] || copy.pt;

  const accept = () => {
    try { localStorage.setItem(KEY, 'yes'); } catch { /* sem storage: aceita só nesta visita */ }
    setAccepted(true);
  };

  const showPolicies = () => {
    accept();
    setTimeout(() => document.getElementById('dobra-10')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="consent-title" style={{
      position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }}>
      <div style={{
        maxWidth: '520px', width: '100%', background: '#0b0b10', border: '1px solid rgba(255,139,84,0.45)',
        borderRadius: '16px', padding: '28px 24px', color: '#ddd', textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}>
        <img src={`${import.meta.env.BASE_URL}ZINELOGO/Zine-Logo-Modelo-no-elements-removebg-preview.png`} alt="" style={{ height: '64px', marginBottom: '12px' }} />
        <LanguageSwitch language={language} setLanguage={setLanguage} />
        <h2 id="consent-title" style={{ color: '#fff', fontSize: '1.4rem', margin: '0 0 12px' }}>{c.title}</h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 22px' }}>{c.body}</p>
        <button onClick={accept} autoFocus style={{
          width: '100%', padding: '14px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
          background: '#ff8b54', color: '#111', fontWeight: 700, fontSize: '1rem',
        }}>{c.accept}</button>
        <button onClick={showPolicies} style={{
          marginTop: '12px', background: 'none', border: 'none', color: '#aaa', textDecoration: 'underline',
          cursor: 'pointer', fontSize: '0.85rem',
        }}>{c.more}</button>
      </div>
    </div>
  );
};
