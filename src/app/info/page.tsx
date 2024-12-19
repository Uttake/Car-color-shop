import React from "react";
import { getInfo } from "../utils/data";
import InfoItem from "../ui/components/infoPage/InfoItem";
import Title from "../ui/components/Title";

const page = async () => {
  const infoData = await getInfo();

  return (
    <section className="py-20">
      <div className="wrapper md:px-2">
        <Title title="Новости и акции" color="#000" />
        <InfoItem data={infoData || []} />
      </div>
    </section>
  );
};

export default page;
