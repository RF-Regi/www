/**
 * Rehype-plugin: obfuskerer alle mailto:-lenker i markdown ved byggtid.
 * Gjelder også innhold skrevet i CMS-en (Sveltia) — redaktører skriver
 * vanlige markdown-lenker, og denne stripper mailto: og reverserer
 * teksten. Visning fikses av CSS (.epost-obf), klikk av scriptet i Base.astro.
 */
const rev = (s) => [...s].reverse().join('');

function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'a') {
    const href = node.properties?.href;
    if (typeof href === 'string' && href.toLowerCase().startsWith('mailto:')) {
      const email = href.slice('mailto:'.length);
      node.properties = {
        class: 'epost-obf',
        'data-epost': rev(email),
        rel: 'nofollow',
      };
      node.children = (node.children || []).map((c) =>
        c.type === 'text' ? { type: 'text', value: rev(c.value) } : c,
      );
      return;
    }
  }
  (node.children || []).forEach(walk);
}

export default function rehypeEmailObfuscate() {
  return (tree) => walk(tree);
}
