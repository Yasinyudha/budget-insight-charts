
// Category data with icons (using Lucide icon names)
export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "1", name: "Food & Dining", color: "#EF4444", icon: "utensils" },
  { id: "2", name: "Transportation", color: "#F59E0B", icon: "car" },
  { id: "3", name: "Housing", color: "#10B981", icon: "home" },
  { id: "4", name: "Entertainment", color: "#6366F1", icon: "tv" },
  { id: "5", name: "Shopping", color: "#EC4899", icon: "shopping-bag" },
  { id: "6", name: "Health", color: "#14B8A6", icon: "activity" },
  { id: "7", name: "Travel", color: "#8B5CF6", icon: "plane" },
  { id: "8", name: "Education", color: "#3B82F6", icon: "book" },
  { id: "9", name: "Other", color: "#9CA3AF", icon: "more-horizontal" }
];

// Expense data structure
export interface Expense {
  id: string;
  amount: number;
  date: string;
  categoryId: string;
  description: string;
}

// Generate more realistic sample data spanning a few months
const generateSampleExpenses = (): Expense[] => {
  const now = new Date();
  const expenses: Expense[] = [];
  
  // Add expenses for the current month and previous 3 months
  for (let monthOffset = 0; monthOffset < 4; monthOffset++) {
    const month = new Date(now);
    month.setMonth(now.getMonth() - monthOffset);
    
    // Add 8-12 expenses per month
    const expensesCount = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < expensesCount; i++) {
      const date = new Date(month);
      date.setDate(1 + Math.floor(Math.random() * 28)); // Random day of month
      
      const categoryId = String(1 + Math.floor(Math.random() * 9)); // Random category
      let amount = 0;
      
      // Make expenses somewhat realistic based on category
      switch (categoryId) {
        case "1": // Food
          amount = 15 + Math.random() * 85;
          break;
        case "2": // Transportation
          amount = 20 + Math.random() * 60;
          break;
        case "3": // Housing
          amount = 800 + Math.random() * 700;
          break;
        case "4": // Entertainment
          amount = 15 + Math.random() * 85;
          break;
        case "5": // Shopping
          amount = 25 + Math.random() * 175;
          break;
        case "6": // Health
          amount = 30 + Math.random() * 170;
          break;
        case "7": // Travel
          amount = 100 + Math.random() * 900;
          break;
        case "8": // Education
          amount = 50 + Math.random() * 250;
          break;
        default: // Other
          amount = 10 + Math.random() * 90;
      }
      
      // Round to 2 decimal places
      amount = Math.round(amount * 100) / 100;
      
      const descriptions = {
        "1": ["Grocery shopping", "Restaurant", "Coffee shop", "Fast food", "Takeout dinner"],
        "2": ["Gas refill", "Uber ride", "Parking fee", "Car maintenance", "Public transport"],
        "3": ["Monthly rent", "Utilities", "Internet bill", "Home insurance", "Home repairs"],
        "4": ["Movie tickets", "Streaming service", "Concert tickets", "Game subscription", "Museum visit"],
        "5": ["Clothing", "Electronics", "Home goods", "Online shopping", "Gift purchase"],
        "6": ["Doctor visit", "Pharmacy", "Health insurance", "Gym membership", "Vitamins"],
        "7": ["Flight tickets", "Hotel stay", "Vacation package", "Car rental", "Weekend trip"],
        "8": ["Online course", "Books", "School supplies", "Tuition", "Professional certification"],
        "9": ["Subscription", "Donation", "Office supplies", "Miscellaneous", "Bank fee"]
      };
      
      const descOptions = descriptions[categoryId as keyof typeof descriptions] || descriptions["9"];
      const description = descOptions[Math.floor(Math.random() * descOptions.length)];
      
      expenses.push({
        id: `e${expenses.length + 1}`,
        amount,
        date: date.toISOString().split("T")[0],
        categoryId,
        description
      });
    }
  }
  
  return expenses;
};

// Sample expenses for initial display
export const sampleExpenses: Expense[] = generateSampleExpenses();
