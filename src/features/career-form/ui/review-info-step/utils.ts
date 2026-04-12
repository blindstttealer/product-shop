export const formatLabel = (labelOrKey: string) => {
  if (!labelOrKey) return '';
  return String(labelOrKey)
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase());
};

export const formatValue = (field: any, rawVal: any) => {
  if (rawVal == null || rawVal === '') return '-';
  const t = field?.type;

  if (t === 'date') {
    const d = rawVal instanceof Date ? rawVal : new Date(rawVal);
    return isNaN(d.getTime()) ? String(rawVal) : d.toLocaleDateString();
  }

  if (t === 'time') {
    return String(rawVal);
  }

  if ((t === 'select' || t === 'radio') && Array.isArray(field.options)) {
    const found = field.options.find((o: any) => o.value === rawVal || o.value === String(rawVal));
    return found ? found.label : String(rawVal);
  }

  if (t === 'checkbox' && Array.isArray(field.options) && Array.isArray(rawVal)) {
    return (
      rawVal
        .map((v: any) => {
          const found = field.options.find((o: any) => o.value === v);
          return found ? found.label : String(v);
        })
        .join(', ') || '-'
    );
  }

  if (t === 'switch') return rawVal ? 'Да' : 'Нет';

  if (t === 'slider') return String(rawVal);

  if (t === 'file') {
    if (Array.isArray(rawVal) && rawVal.length > 0) {
      return rawVal.map((f: any) => f.name || 'Файл').join(', ');
    }
    return 'Файл загружен';
  }

  return String(rawVal);
};
