export const formatToPercentage = (value: string): string => {
  let sanitizedValue = value.replace(/[^0-9.]/g, '');

  const firstDotIndex = sanitizedValue.indexOf('.');
  if (firstDotIndex !== -1) {
    sanitizedValue =
      sanitizedValue.slice(0, firstDotIndex + 1) +
      sanitizedValue.slice(firstDotIndex + 1).replace(/\./g, '');
  }

  const numericValue = parseFloat(sanitizedValue);

  if (numericValue > 100) {
    return '100';
  } else if (numericValue < 0) {
    return '0';
  }

  return sanitizedValue;
};

const FORMATTER = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, useGrouping: true });
export const convertToNumber = (value: string) => Number(value.replace(/\D/g, ""));
export const convertToDecimalNumber = (value: string) => convertToNumber(value) / 100;
export const formatToCurrency = (value: number) => FORMATTER.format(value);

export const formatQuantity = (value: string): string => {
  let formattedValue = value.replace(/[^0-9.]/g, '');
  if ((formattedValue.match(/\./g) || []).length > 1) {
    formattedValue = formattedValue.slice(0, -1);
  }
  if (formattedValue.split('.')[1]?.length > 2) {
    formattedValue = formattedValue.slice(0, -1);
  }
  if (formattedValue.length > 8) {
    formattedValue = formattedValue.slice(0, 8);
  }
  return formattedValue;
};

export const formatBrlValue = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
