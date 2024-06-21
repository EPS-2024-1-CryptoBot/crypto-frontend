export const formatInputValue = (value: string): string => {
  let sanitizedValue = value.replace(/[^0-9.]/g, '');

  const firstDotIndex = sanitizedValue.indexOf('.');
  if (firstDotIndex !== -1) {
    sanitizedValue = sanitizedValue.slice(0, firstDotIndex + 1) + sanitizedValue.slice(firstDotIndex + 1).replace(/\./g, '');
  }

  const numericValue = parseFloat(sanitizedValue);

  if (numericValue > 100) {
    return '100';
  } else if (numericValue < 0) {
    return '0';
  }

  return sanitizedValue;
};
