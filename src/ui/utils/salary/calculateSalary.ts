import type { NetSalary, GrossSalary, Salary } from "../types/Salary";

const HEALTH_INSURANCE_RATE = 0.25;
const SOCIAL_SECURITY_RATE = 0.1;
const INCOME_TAX_RATE = 0.1;
const NET_FROM_GROSS_RATE =
  1 -
  HEALTH_INSURANCE_RATE -
  SOCIAL_SECURITY_RATE -
  INCOME_TAX_RATE * (1 - HEALTH_INSURANCE_RATE - SOCIAL_SECURITY_RATE);

function calculateNetSalary(salary: number, rate: number): NetSalary {
  const netRonMonth = salary;
  const netRonYear = salary * 12;

  return {
    netSalaryInRonPerMonth: netRonMonth,
    netSalaryInRonPerYear: netRonYear,
    netSalaryInCurrencyPerMonth: netRonMonth / rate,
    netSalaryInCurrencyPerYear: netRonYear / rate,
  };
}

function calculateGrossSalary(salary: number, rate: number): GrossSalary {
  const grossRonMonth = salary / NET_FROM_GROSS_RATE;
  const grossRonYear = grossRonMonth * 12;

  return {
    grossSalaryInRonPerMonth: grossRonMonth,
    grossSalaryInRonPerYear: grossRonYear,
    grossSalaryInCurrencyPerMonth: grossRonMonth / rate,
    grossSalaryInCurrencyPerYear: grossRonYear / rate,
  };
}

export function calculateSalary(salary: number, rate: number): Salary {
  return {
    netSalary: calculateNetSalary(salary, rate),
    grossSalary: calculateGrossSalary(salary, rate),
  };
}
