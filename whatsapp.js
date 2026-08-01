(function () {
  "use strict";

  const numeroWhatsApp = "33601462612";

  const messageWhatsApp =
    "Bonjour, je vous contacte depuis le site J2B Couverture pour obtenir un devis gratuit.\n\n" +
    "📍 Ville du chantier :\n" +
    "🏠 Travaux souhaités :\n" +
    "📸 Je peux vous transmettre des photos de la toiture afin que vous puissiez étudier ma demande.\n\n" +
    "Merci.";

  const lienWhatsApp =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    encodeURIComponent(messageWhatsApp);

  /* Création du style */
  const style = document.createElement("style");

  style.textContent = `
    .j2b-whatsapp-float {
      position: fixed;
      right: 18px;
      bottom: 76px;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 13px 18px;
      border-radius: 999px;
      background: #25d366;
      color: #ffffff !important;
      text-decoration: none;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 15px;
      font-weight: 900;
      box-shadow: 0 14px 35px rgba(37, 211, 102, .38);
      transition: transform .2s ease, background .2s ease;
    }

    .j2b-whatsapp-float:hover {
      background: #1ebe5d;
      transform: translateY(-2px);
    }

    .j2b-whatsapp-icon {
      font-size: 21px;
      line-height: 1;
    }

    @media (max-width: 640px) {
      .j2b-whatsapp-float {
        left: 12px;
        right: auto;
        bottom: 14px;
        width: calc(50% - 18px);
        min-height: 48px;
        padding: 10px 8px;
        border-radius: 14px;
        font-size: 14px;
        text-align: center;
      }

      body {
        padding-bottom: 70px;
      }
    }
  `;

  document.head.appendChild(style);

  /* Évite de créer le bouton deux fois */
  if (document.querySelector(".j2b-whatsapp-float")) {
    return;
  }

  const bouton = document.createElement("a");

  bouton.className = "j2b-whatsapp-float";
  bouton.href = lienWhatsApp;
  bouton.target = "_blank";
  bouton.rel = "noopener";
  bouton.setAttribute("aria-label", "Demander un devis sur WhatsApp");

  bouton.innerHTML =
    '<span class="j2b-whatsapp-icon">💬</span>' +
    "<span>Devis WhatsApp</span>";

  bouton.addEventListener("click", function () {
    if (typeof window.gtag === "function") {
      window.gtag("event", "click_whatsapp", {
        event_category: "Contact",
        event_label: document.title || "Page inconnue",
        value: 1
      });
    }

    const sujetNtfy = "j2b-visites-X83LmP91Qa";

    fetch("https://ntfy.sh/" + sujetNtfy, {
      method: "POST",
      headers: {
        Title: "Clic sur WhatsApp",
        Priority: "high",
        Tags: "speech_balloon,telephone"
      },
      body:
        "Page : " +
        document.title +
        "\nAdresse : " +
        window.location.href +
        "\nHeure : " +
        new Date().toLocaleString("fr-FR"),
      keepalive: true
    }).catch(function () {
      /* Le clic WhatsApp reste fonctionnel même si NTFY échoue */
    });
  });

  document.body.appendChild(bouton);
})();
