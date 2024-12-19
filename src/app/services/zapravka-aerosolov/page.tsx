import Breadcrumbs from "@/app/ui/components/Breadcrumb";
import ZapravkaWrapper from "@/app/ui/components/services/ZapravkaWrapper";

const page = async () => {
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
            label: "Заправка аэрозолей",
            href: `/services/zapravka-aerosolov`,
            active: true,
          },
        ]}
      />
      <section>
        <ZapravkaWrapper />
      </section>
    </>
  );
};

export default page;
