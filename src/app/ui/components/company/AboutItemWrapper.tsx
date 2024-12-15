"use client";
import React from "react";
import DocumentIco from "../../../_assets/document.svg";
import QuestionIcon from "../../../_assets/question.svg";
import AboutItem from "./AboutItem";

const AboutItemWrapper = () => {
  return (
    <div className="flex flex-col gap-9 items-center justify-center xl:flex-row xl:w-full xl:justify-evenly">
      <AboutItem
        icon={
          <DocumentIco
            stroke="white"
            className="group-hover:stroke-orange-brdr transition-all duration-300"
          />
        }
        title="Реквизиты"
        type=""
      />
      <AboutItem
        icon={
          <QuestionIcon
            stroke="white"
            className="group-hover:stroke-orange-brdr transition-all duration-300"
          />
        }
        title="Задать вопрос"
        type="callback"
      />
    </div>
  );
};

export default AboutItemWrapper;
