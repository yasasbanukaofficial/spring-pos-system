import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-black rounded-none p-6 shadow-none border border-white/20 ${className}`}
  >
    {children}
  </div>
);

export default Card;
