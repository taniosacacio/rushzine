import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PayPalCard = ({
  image,
  title = "Support via PayPal",
  description = "Contribute to the portal quickly and securely from anywhere in the world using PayPal.",
  buttonText = "Donate with PayPal 💳",
  paypalLink,
  qrImage,
  width = 388,
  height = 420,
  borderColor = "#0079C1",
  borderBgColor = "rgba(0, 121, 193, 0.2)",
  borderWidth = 2,
  cardBgColor = "var(--bmc-card-bg, #1e1e1e)",
  textColor = "var(--bmc-text, #ffffff)",
  accentColor = "#0079C1",
}) => {
  const [hovered, setHovered] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const borderRef = useRef(null);

  const handleMouseMove = (e) => {
    const border = borderRef.current;
    if (!border) return;
    const rect = border.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    border.style.setProperty("--rotation", `${angle}rad`);
  };

  const borderGradient = `conic-gradient(from var(--rotation,0deg), ${borderColor} 0deg, ${borderColor} 60deg, ${borderBgColor} 120deg, ${borderBgColor} 360deg)`;

  return (
    <>
    <div
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (borderRef.current)
          borderRef.current.style.setProperty("--rotation", "0deg");
      }}
      style={{
        width: "100%",
        maxWidth: width,
        height,
        border: `${borderWidth}px solid transparent`,
        borderRadius: "1.5rem",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), ${borderGradient}`,
        padding: 12,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 30px -10px ${accentColor}40` : "none",
        position: "relative",
        fontFamily: "var(--font-family, sans-serif)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 180, // Slightly reduced to fit both buttons beautifully within 420px height
          borderRadius: "1rem",
          overflow: "hidden",
          background: "#121212",
          marginBottom: 12,
        }}
      >
        <img
          src={image}
          alt="Support via PayPal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>
      
      <div style={{ textAlign: "center", padding: "0 8px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: "bold", color: textColor, margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          <p style={{ fontSize: 13, color: textColor, opacity: 0.8, margin: 0, lineHeight: 1.4 }}>
            {description}
          </p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: 12, width: "100%" }}>
          <a 
            href={paypalLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              width: "100%",
              padding: "10px 20px",
              backgroundColor: accentColor,
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "0.75rem",
              transition: "filter 0.2s ease",
              filter: hovered ? "brightness(1.1)" : "brightness(1)",
              boxSizing: "border-box",
              fontSize: "0.95rem"
            }}
          >
            {buttonText}
          </a>

          {qrImage && (
            <button 
              onClick={() => setShowQR(true)}
              style={{
                display: "inline-block",
                width: "100%",
                padding: "10px 20px",
                backgroundColor: "transparent",
                border: `1.5px solid ${accentColor}`,
                color: accentColor,
                fontWeight: "bold",
                borderRadius: "0.75rem",
                cursor: "pointer",
                boxSizing: "border-box",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                transition: "background-color 0.2s, color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = accentColor;
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = accentColor;
              }}
            >
              Ver QR Code PayPal 📱
            </button>
          )}
        </div>
      </div>
    </div>

    <AnimatePresence>
      {showQR && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowQR(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box"
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#1e1e1e",
              padding: "24px",
              borderRadius: "1.5rem",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              border: `2px solid ${accentColor}`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              position: "relative"
            }}
          >
            <button 
              onClick={() => setShowQR(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "transparent",
                border: "none",
                color: "#ff5a36",
                fontSize: "1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
                lineHeight: 1
              }}
            >
              ✕
            </button>
            <h3 style={{ color: "#fff", margin: "0 0 16px 0", fontSize: "1.3rem", fontWeight: "bold" }}>
              PayPal QR Code
            </h3>
            <div style={{ background: "white", padding: "12px", borderRadius: "1rem", display: "inline-block", marginBottom: "16px" }}>
              <img 
                src={qrImage} 
                alt="PayPal QR Code" 
                style={{ width: "240px", height: "240px", display: "block", borderRadius: "0.5rem" }} 
              />
            </div>
            <p style={{ color: "#aaa", fontSize: "0.9rem", margin: 0, lineHeight: "1.4" }}>
              Aponte a câmera do seu celular para fazer sua doação internacional via PayPal.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
