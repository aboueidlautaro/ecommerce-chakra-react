import React from "react";
import CookieConsent from "react-cookie-consent";

function Cookie() {
  return (
    <CookieConsent
      enableDeclineButton
      onDecline={() => {
        null;
      }}
      declineButtonText="Ignorar"
      declineButtonStyle={{
        background: "#fff",
        color: "#000",
        fontWeight: "500",
        borderRadius: "5px",
      }}
      location="bottom"
      buttonText="Aceptar"
      expires={150}
      cookieName="cookies"
      style={{
        fontFamily: "Roboto",
        background: "#2B373B",
        color: "#fff",
        fontSize: "14px",
        textAlign: "left",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      buttonStyle={{
        background: "#F4BB03",
        fontWeight: "700",
        borderRadius: "5px",
      }}
    >
      Esta página utiliza cookies para mejorar la experiencia del usuario. Si
      continúa navegando está dando su consentimiento para la aceptación de las
      mencionadas cookies y la aceptación de nuestra política de cookies.
    </CookieConsent>
  );
}

export default Cookie;
