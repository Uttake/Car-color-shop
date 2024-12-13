import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div>
      <div className=" text-slate-200 flex flex-col items-left border-b border-orange-brdr py-2">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
