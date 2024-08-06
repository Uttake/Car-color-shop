import React from "react";

import FormAdmin from "../ui/components/FormAdmin";

export default function Panel() {
  return (
    <div className="min-h-[calc(100vh-120px)] ">
      <div className="text-slate-200 max-w-96 bg-alphablack p-5 rounded-xl m-auto">
        <h2 className=" text-xl">Админ панель</h2>
        <FormAdmin />
      </div>
    </div>
  );
}
