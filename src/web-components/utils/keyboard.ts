export function isOpenKey(key: KeyboardEvent['key']): boolean {
  return ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key);
}

export function isTyping(event: KeyboardEvent) {
  const { key, altKey, ctrlKey, metaKey } = event;
  return (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  );
}
