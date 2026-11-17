/**
 * Renderer et pakke-item som trygg HTML: escape først, så gjør
 * markdown-lenker [tekst](url) om til ekte <a>-elementer.
 */
export function linkifyItem(item: string): string {
  const escaped = item.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" rel="external">$1</a>');
}
