"use client";

import { logout } from "@/app/utils/actions";
import { Button } from "@/components/ui/button";
import React from "react";

const Logout = () => {
  return (
    <div>
      <Button onClick={() => logout()} className="bg-red-600">
        Выйти
      </Button>
    </div>
  );
};

export default Logout;
