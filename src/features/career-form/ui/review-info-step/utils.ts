export const formatLabel = (labelOrKey: string) => {
  if (!labelOrKey) return '';
  return String(labelOrKey)
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/Dob/i, 'Date of Birth')
    .replace(/WorkPermit/i, 'Work Permit');
};

export const formatValue = (field: any, rawVal: any) => {
  if (rawVal == null || rawVal === '') return '-';
  const t = field?.type;
  if (t === 'date') {
    const d = rawVal instanceof Date ? rawVal : new Date(rawVal);
    return isNaN(d.getTime()) ? String(rawVal) : d.toLocaleDateString();
  }
  if (t === 'select' && Array.isArray(field.options)) {
    const found = field.options.find((o: any) => o.value === rawVal || o.value === String(rawVal));
    return found ? found.label : String(rawVal);
  }
  if (t === 'checkbox') return rawVal ? 'Да' : 'Нет';
  return String(rawVal);
};
