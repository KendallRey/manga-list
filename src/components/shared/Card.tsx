import React from "react";

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-md 
                  p-4 sm:p-6 md:p-8 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
