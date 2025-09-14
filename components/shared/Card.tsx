
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-brand-dark-secondary border border-brand-border rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
