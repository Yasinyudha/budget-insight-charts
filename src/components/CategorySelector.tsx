
import { useState, useRef, useEffect } from "react";
import { categories } from "../data/sampleData";
import { ChevronDown } from "lucide-react";

interface CategorySelectorProps {
  selectedCategoryId: string;
  onChange: (categoryId: string) => void;
}

const CategorySelector = ({ selectedCategoryId, onChange }: CategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId) || categories[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: selectedCategory.color }}
          ></span>
          <span>{selectedCategory.name}</span>
        </div>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {categories.map(category => (
            <div
              key={category.id}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(category.id);
                setIsOpen(false);
              }}
            >
              <span
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              ></span>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
