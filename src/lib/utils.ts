import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const cpfArray = cpf.split('').map(el => +el);
  const rest = (count: number) => (cpfArray.slice(0, count - 12)
    .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;

  return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
};
