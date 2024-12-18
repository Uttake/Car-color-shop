"use client";
import { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";

const YaMetrica = () => {
  const [isVisible, setIsVisible] = useState(false);

  const initYandexMetrica = () => {
    if (typeof window === "undefined" || window.ym) return;

    (function (
      m: any,
      e: Document,
      t: string,
      r: string,
      i: string,
      k?: HTMLScriptElement,
      a?: HTMLElement
    ) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = new Date().getTime();
      k = e.createElement(t) as HTMLScriptElement;
      a = e.getElementsByTagName(t)[0] as HTMLElement;
      k.async = true;
      k.src = r;
      a?.parentNode?.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    window.ym(99101809, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });

    console.log("Yandex Metrica initialized");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CookieConsent
      location="bottom"
      buttonText="Принять"
      declineButtonText="Отклонить"
      enableDeclineButton
      onAccept={() => {
        console.log("Cookies accepted");
        initYandexMetrica();
      }}
      onDecline={() => {
        console.log("Cookies declined");
      }}
      cookieName="userConsent"
      style={{
        background: "#2B373B",
        color: "#fff",
        visibility: isVisible ? "visible" : "hidden",
        transition: "visibility 0s, opacity 0.5s linear",
        opacity: isVisible ? 1 : 0,
      }}
      buttonStyle={{
        color: "#4e503b",
        fontSize: "13px",
        background: "#fff",
        borderRadius: "5px",
      }}
      declineButtonStyle={{
        fontSize: "13px",
        background: "#f5f5f5",
        color: "#4e503b",
        borderRadius: "5px",
      }}
    >
      <p>
        Мы используем cookies для улучшения вашего опыта. Нажмите
        &quot;Принять&quot;, чтобы дать согласие на использование cookies.
      </p>
    </CookieConsent>
  );
};

export default YaMetrica;
