export type Salary = {
  netSalary: NetSalary;
  grossSalary: GrossSalary;
};

export type NetSalary = {
  netSalaryInRonPerYear: number;
  netSalaryInRonPerMonth: number;
  netSalaryInCurrencyPerYear: number;
  netSalaryInCurrencyPerMonth: number;
};

export type GrossSalary = {
  grossSalaryInRonPerYear: number;
  grossSalaryInRonPerMonth: number;
  grossSalaryInCurrencyPerYear: number;
  grossSalaryInCurrencyPerMonth: number;
};
