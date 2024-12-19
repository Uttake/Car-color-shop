import Breadcrumbs from "@/app/ui/components/Breadcrumb";
import PodborWrapper from "@/app/ui/components/services/PodborWrapper";

const page = () => {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Главная", href: "/" },
          {
            label: "Услуги",
            href: `/services`,
          },
          {
            label: "Подбор краски",
            href: `/services/podbor-kraski`,
            active: true,
          },
        ]}
      />
      <section>
        <PodborWrapper />
      </section>
    </>
  );
};

export default page;
