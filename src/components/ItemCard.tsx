import React from 'react';
import { Card } from './Card';
interface ItemCardProps {
  children: React.ReactNode;
  className?: string;
}
export const ItemCard: React.FC<ItemCardProps> = ({
  children,
  className = ''
}) => {
  return <Card className={`px-6 ${className}`}>{children}</Card>;
};