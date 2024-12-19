"use client";
import React from "react";
import dynamic from "next/dynamic";

const GoogleReCaptcha = dynamic(
  () =>
    import("react-google-recaptcha-v3").then((mod) => ({
      default: mod.GoogleReCaptchaProvider,
    })),
  { ssr: false }
);
const GoogleCaptchaWrapper = ({ children }: { children: React.ReactNode }) => {
  const recaptchaKey: string | undefined =
    process?.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  return (
    <GoogleReCaptcha reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
      {children}
    </GoogleReCaptcha>
  );
};

export default GoogleCaptchaWrapper;
