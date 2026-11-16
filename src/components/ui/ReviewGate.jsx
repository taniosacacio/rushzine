import { useState } from 'react';
import { LanguageSwitch } from './ConsentGate';

// Senha de revisão (só na versão de revisão: VITE_REVIEW_GATE=on).
// Guardamos apenas o SHA-256 da senha. Isto NÃO é segurança forte: serve
// para manter a prévia longe de visitantes casuais e de buscadores.
const HASH = 'b56460f47cfcd7cede887b82f81626d7080f87021cc194e2a35648b0859b5646';
const KEY = 'rushzine-review-ok';
export const reviewGateOn = import.meta.env.VITE_REVIEW_GATE === 'on';

const copy = {
  pt: { title: 'Prévia restrita para revisão', label: 'Senha', enter: 'Entrar', wrong: 'Senha incorreta.' },
  en: { title: 'Restricted preview for review', label: 'Password', enter: 'Enter', wrong: 'Incorrect password.' },
  es: { title: 'Vista previa restringida para revisión', label: 'Contraseña', enter: 'Entrar', wrong: 'Contraseña incorrecta.' },
};

const sha256 = async (text) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const readOk = () => { try { return sessionStorage.getItem(KEY) === 'yes'; } catch { return false; } };

export const ReviewGate = ({ language, setLanguage, children }) => {
  const [ok, setOk] = useState(() => !reviewGateOn || readOk());
  const [value, setValue] = useState('');
  const [wrong, setWrong] = useState(false);
  if (ok) return children;
  const c = copy[language] || copy.en;

  const submit = async (e) => {
    e.preventDefault();
    // Aceita "ˆ" (circunflexo do Mac) ou "^" (teclado comum).
    const typed = value.trim().replace(/ˆ/g, '^');
    if ((await sha256(typed)) === HASH) {
      try { sessionStorage.setItem(KEY, 'yes'); } catch { /* só nesta aba */ }
      setOk(true);
    } else {
      setWrong(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050508', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <form onSubmit={submit} style={{ maxWidth: '380px', width: '100%', textAlign: 'center', color: '#ddd' }}>
        <img src={`${import.meta.env.BASE_URL}ZINELOGO/Zine-Logo-Modelo-no-elements-removebg-preview.png`} alt="" style={{ height: '72px', marginBottom: '16px' }} />
        <LanguageSwitch language={language} setLanguage={setLanguage} />
        <h1 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 18px' }}>{c.title}</h1>
        <label htmlFor="review-pass" style={{ display: 'block', textAlign: 'left', fontSize: '0.85rem', marginBottom: '6px' }}>{c.label}</label>
        <input id="review-pass" type="password" autoFocus value={value}
          onChange={(e) => { setValue(e.target.value); setWrong(false); }}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.25)', background: '#111', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
        {wrong && <p role="alert" style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: '8px 0 0' }}>{c.wrong}</p>}
        <button type="submit" style={{ marginTop: '16px', width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#ff8b54', color: '#111', fontWeight: 700, cursor: 'pointer' }}>{c.enter}</button>
      </form>
    </div>
  );
};
