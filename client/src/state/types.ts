// Interface to define the structure of expenses by category
export interface ExpensesByCategory {
  salaries: number;  // Salaries expense
  supplies: number;  // Supplies expense
  services: number;  // Services expense
}

// Interface to define the structure of monthly data
export interface Month {
  id: string;  // Unique identifier for the month
  month: string;  // Name of the month
  revenue: number;  // Revenue for the month
  expenses: number;  // Total expenses for the month
  nonOperationalExpenses: number;  // Non-operational expenses for the month
  operationalExpenses: number;  // Operational expenses for the month
}

// Interface to define the structure of daily data
export interface Day {
  id: string;  // Unique identifier for the day
  date: string;  // Date of the day
  revenue: number;  // Revenue for the day
  expenses: number;  // Expenses for the day
}

// Interface to define the structure of the KPIs response from the API
export interface GetKpisResponse {
  id: string;  // Unique identifier for the KPIs
  _id: string;  // Internal identifier
  __v: number;  // Version number
  totalProfit: number;  // Total profit
  totalRevenue: number;  // Total revenue
  totalExpenses: number;  // Total expenses
  expensesByCategory: ExpensesByCategory;  // Expenses broken down by category
  monthlyData: Array<Month>;  // Monthly data
  dailyData: Array<Day>;  // Daily data
  createdAt: string;  // Creation timestamp
  updatedAt: string;  // Last updated timestamp
}

// Interface to define the structure of the products response from the API
export interface GetProductsResponse {
  id: string;  // Unique identifier for the product
  _id: string;  // Internal identifier
  __v: number;  // Version number
  price: number;  // Price of the product
  expense: number;  // Expense for the product
  transactions: Array<string>;  // List of transaction IDs associated with the product
  createdAt: string;  // Creation timestamp
  updatedAt: string;  // Last updated timestamp
}

// Interface to define the structure of the transactions response from the API
export interface GetTransactionsResponse {
  id: string;  // Unique identifier for the transaction
  _id: string;  // Internal identifier
  __v: number;  // Version number
  buyer: string;  // Buyer of the product
  amount: number;  // Amount of the transaction
  productIds: Array<string>;  // List of product IDs involved in the transaction
  createdAt: string;  // Creation timestamp
  updatedAt: string;  // Last updated timestamp
}

// The interfaces define the expected structure of the data received from the API
// This helps ensure type safety by knowing exactly what data we are working with.
