import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCAPTCHAProps {
  onChange: (value: string | null) => void;
}

const ReCAPTCHAComponent: React.FC<ReCAPTCHAProps> = ({ onChange }) => {
  const handleChange = (value: string | null) => {
    onChange(value);
  };
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LcQ03gqAAAAAFNTsk7X-6QHUzeh5lkNFr0KXEQb"
        onChange={handleChange}
      />
    </div>
  );
};

export default ReCAPTCHAComponent;
