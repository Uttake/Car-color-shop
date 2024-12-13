"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface BasketContextType {
  cardOpen: boolean;
  setCardOpen: Dispatch<SetStateAction<boolean>>;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <BasketContext.Provider value={{ cardOpen, setCardOpen }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
