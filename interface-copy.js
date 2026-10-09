// Apply configured interface wording to text nodes without replacing elements or event handlers.
(() => {
  const original = new WeakMap();
  function translate(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement?.closest("script,style,pre,code,.console,input,textarea,option"))
        continue;
      const text = node.nodeValue,
        key = text.trim();
      if (original.get(node) === text) continue;
      const value = INTERFACE_TEXT[key];
      if (typeof value === "string" && value !== key) {
        node.nodeValue = text.replace(key, value);
        original.set(node, node.nodeValue);
      }
    }
  }
  translate(document.body);
  const observer = new MutationObserver((records) => {
    const roots = new Set();
    for (const r of records) {
      if (r.type === "characterData") roots.add(r.target.parentElement);
      else for (const n of r.addedNodes) roots.add(n.nodeType === 3 ? n.parentElement : n);
    }
    for (const root of roots) if (root?.isConnected) translate(root);
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true });
})();
