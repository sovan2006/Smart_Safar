import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-light-100 dark:bg-dark-800 border border-light-300 dark:border-dark-700 rounded-xl p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
