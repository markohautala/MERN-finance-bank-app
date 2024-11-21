export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalRevenue: number;
  totatExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
}

// Using typescript interfaces to define the shape of the data that we will be receiving from the api,
// this will help us to know what data we are working with and what we can expect in the response.