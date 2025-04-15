
import React from 'react';
import { Category } from '../data/sampleData';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]}`}
      style={{ 
        backgroundColor: `${category.color}20`,
        color: category.color,
      }}
    >
      <span className="mr-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></span>
      {category.name}
    </span>
  );
};

export default CategoryBadge;
