const AUTHOR_ICON = '/icons/volvo-truck.svg';

export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  /* =========================================================
     First row = authoring labels
     ========================================================= */

  const contentRows = rows.slice(1);

  /* =========================================================
     Cards wrapper
     ========================================================= */

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'insight-cards-grid';

  let ctaLink = null;

  /* =========================================================
     Process rows
     ========================================================= */

  contentRows.forEach((row) => {
    const columns = [...row.children];

    /*
     * CTA ROW
     *
     * The CTA row contains only the "Read more insights" link.
     * Detect it before processing normal cards.
     */
    if (columns.length === 1) {
      const link = row.querySelector('a');

      if (link) {
        ctaLink = link;
        return;
      }
    }

    /* =======================================================
       Card columns
       ======================================================= */

    const [
      imageCol,
      titleCol,
      descriptionCol,
      authorCol,
      dateCol,
      readTimeCol,
      tagsCol,
    ] = columns;

    if (!imageCol || !titleCol) return;

    const card = document.createElement('article');
    card.className = 'insight-card';

    /* =======================================================
       Image
       ======================================================= */

    const picture = imageCol.querySelector('picture');

    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'insight-card-image';

      imageWrapper.append(picture);

      card.append(imageWrapper);
    }

    /* =======================================================
       Content
       ======================================================= */

    const content = document.createElement('div');
    content.className = 'insight-card-content';

    /* =======================================================
       Title
       ======================================================= */

    const title = titleCol.querySelector(
      'h1, h2, h3, h4, h5, h6',
    );

    if (title) {
      title.className = 'insight-card-title';
      content.append(title);
    }

    /* =======================================================
       Description
       ======================================================= */

    const descriptionText = descriptionCol?.textContent.trim();

    if (descriptionText) {
      const description = document.createElement('p');

      description.className = 'insight-card-description';
      description.textContent = descriptionText;

      content.append(description);
    }

    /* =======================================================
       Meta
       Author + Date + Read Time
       ======================================================= */

    const authorText = authorCol?.textContent.trim() || '';
    const dateText = dateCol?.textContent.trim() || '';
    const readTimeText = readTimeCol?.textContent.trim() || '';

    if (authorText || dateText || readTimeText) {
      const meta = document.createElement('div');
      meta.className = 'insight-card-meta';

      /* Author icon */

      const authorIcon = document.createElement('img');

      authorIcon.className = 'insight-card-author-icon';
      authorIcon.src = AUTHOR_ICON;
      authorIcon.alt = '';

      /* Meta text */

      const metaText = document.createElement('div');
      metaText.className = 'insight-card-meta-text';

      /* Author */

      if (authorText) {
        const author = document.createElement('p');

        author.className = 'insight-card-author';
        author.textContent = authorText;

        metaText.append(author);
      }

      /* Date + Read time */

      if (dateText || readTimeText) {
        const dateLine = document.createElement('p');
        dateLine.className = 'insight-card-date';

        if (dateText) {
          const date = document.createElement('span');
          date.textContent = dateText;

          dateLine.append(date);
        }

        if (dateText && readTimeText) {
          const separator = document.createElement('span');

          separator.className = 'insight-card-separator';
          separator.textContent = '•';

          dateLine.append(separator);
        }

        if (readTimeText) {
          const readTime = document.createElement('span');
          readTime.textContent = readTimeText;

          dateLine.append(readTime);
        }

        metaText.append(dateLine);
      }

      meta.append(
        authorIcon,
        metaText,
      );

      content.append(meta);
    }

    /* =======================================================
       Tags
       ======================================================= */

    const tagsValue = tagsCol?.textContent.trim();

    if (tagsValue) {
      const tagsWrapper = document.createElement('div');
      tagsWrapper.className = 'insight-card-tags';

      const tags = tagsValue
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      tags.forEach((tag) => {
        const tagElement = document.createElement('span');

        tagElement.className = 'insight-card-tag';
        tagElement.textContent = tag;

        tagsWrapper.append(tagElement);
      });

      content.append(tagsWrapper);
    }

    /* =======================================================
       Build card
       ======================================================= */

    card.append(content);

    cardsWrapper.append(card);
  });

  /* =========================================================
     Clear original authoring DOM
     ========================================================= */

  block.textContent = '';

  block.append(cardsWrapper);

  /* =========================================================
     Read More Insights CTA
     ========================================================= */

  if (ctaLink) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'insight-cards-cta';

    ctaLink.classList.add('insight-cards-cta-link');

    /*
     * Keep the authored URL and text.
     * Add arrow only visually.
     */

    const arrow = document.createElement('span');

    arrow.className = 'insight-cards-cta-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '›';

    ctaLink.append(arrow);

    ctaWrapper.append(ctaLink);

    block.append(ctaWrapper);
  }
}