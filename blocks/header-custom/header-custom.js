export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const brand = document.createElement('div');
  brand.className = 'header-brand';

  const menu = document.createElement('div');
  menu.className = 'header-menu';

  rows.forEach((row, index) => {
    const cell = row.firstElementChild;
    if (!cell) return;

    if (index === 0) {
      const existingLink = cell.querySelector('a');

      if (existingLink) {
        existingLink.className = 'header-brand-link';
        brand.append(existingLink);
      } else {
        const brandLink = document.createElement('a');
        brandLink.href = '/discover-india';
        brandLink.className = 'header-brand-link';
        brandLink.textContent = cell.textContent.trim();

        brand.append(brandLink);
      }

      return;
    }

    const existingLink = cell.querySelector('a');

    if (existingLink) {
      existingLink.className = 'header-menu-link';
      menu.append(existingLink);
    } else {
      const item = document.createElement('span');
      item.className = 'header-menu-link';
      item.textContent = cell.textContent.trim();

      menu.append(item);
    }
  });

  nav.append(brand, menu);

  block.replaceChildren(nav);
}