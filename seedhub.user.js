// ==UserScript==
// @name         seedhub
// @namespace    https://github.com/ovnrain/seedhub
// @version      1.0.0
// @description  seedhub 磁力链接表格美化
// @author       ovnrain
// @license	     MIT
// @match        https://www.seedhub.cc/movies/*
// @icon         https://sh1.pcie.pppoe.top/static/img/favicon.png
// @homepageURL  https://github.com/ovnrain/seedhub
// @supportURL   https://github.com/ovnrain/seedhub/issues
// @updateURL    https://raw.githubusercontent.com/ovnrain/seedhub/main/seedhub.user.js
// @downloadURL  https://raw.githubusercontent.com/ovnrain/seedhub/main/seedhub.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  function addGlobalStyle(rules) {
    const head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;

    const style = document.createElement('style');
    head.appendChild(style);

    const sheet = style.sheet;
    rules.forEach((rule) => {
      sheet.insertRule(rule, sheet.cssRules.length);
    });
  }

  addGlobalStyle([
    '.page .content { padding-left: 32px; padding-right: 32px; }',
    '.page .content .nav-links { padding: 8px 0 !important; }',
  ]);

  const seeds = document.querySelectorAll('.seeds li');

  const data = [];

  seeds.forEach((seed) => {
    const linkNode = seed.querySelector('a');

    const title = linkNode.getAttribute('title');
    const href = linkNode.getAttribute('href');

    const sizeNode = seed.querySelector('.size');
    const size = sizeNode.textContent;

    const featureNodes = seed.querySelectorAll('.seed-feature');
    const features = Array.from(featureNodes).map((node) => node.textContent);

    const timeNode = seed.querySelector('.create-time');
    const date = timeNode.previousElementSibling.textContent;

    data.push({ title, href, size, features, date });
  });

  function createElement(tagName, options = {}) {
    const node = document.createElement(tagName);
    const { attrs, className, style, text } = options;

    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          return;
        }

        node.setAttribute(key, String(value));
      });
    }

    if (className) {
      if (Array.isArray(className)) {
        node.classList.add(...className);
      } else {
        node.classList.add(className);
      }
    }

    if (style) {
      Object.assign(node.style, style);
    }

    if (text !== undefined && text !== null) {
      node.textContent = String(text);
    }

    return node;
  }

  const colgroup = document.createElement('colgroup');
  colgroup.appendChild(document.createElement('col'));
  colgroup.appendChild(createElement('col', { style: { width: '90px' } }));
  colgroup.appendChild(createElement('col', { style: { width: '100px' } }));
  colgroup.appendChild(createElement('col', { style: { width: '80px' } }));

  const thead = document.createElement('thead');
  {
    const tr = document.createElement('tr');
    tr.appendChild(
      createElement('th', {
        style: { padding: '8px', textAlign: 'left' },
        text: '标题',
      }),
    );
    tr.appendChild(createElement('th', { style: { padding: '8px' }, text: '大小' }));
    tr.appendChild(createElement('th', { style: { padding: '8px' }, text: '质量' }));
    tr.appendChild(createElement('th', { style: { padding: '8px' }, text: '日期' }));
    thead.appendChild(tr);
  }

  const tbody = document.createElement('tbody');
  {
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      const tr = document.createElement('tr');

      const titleTd = createElement('td', { style: { padding: '8px' } });
      const link = createElement('a', {
        attrs: { target: '_blank', href: item.href, title: item.title },
        text: item.title,
      });
      titleTd.appendChild(link);

      const sizeTd = createElement('td', {
        style: { padding: '8px', textAlign: 'left' },
        text: item.size,
      });
      const featureTd = createElement('td', {
        style: { padding: '8px' },
      });
      const featureWrapper = createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '4px' },
      });

      item.features.forEach((feature) => {
        const code = createElement('code', {
          className: 'seed-feature',
          style: {
            display: 'inline-flex',
            height: '24px',
            padding: '0 8px',
            alignItems: 'center',
            fontSize: '12px',
          },
          text: feature,
        });
        featureWrapper.appendChild(code);
      });
      featureTd.appendChild(featureWrapper);

      const dateTd = createElement('td', { style: { padding: '8px' }, text: item.date });

      tr.appendChild(titleTd);
      tr.appendChild(sizeTd);
      tr.appendChild(featureTd);
      tr.appendChild(dateTd);

      fragment.appendChild(tr);
    });
    tbody.appendChild(fragment);
  }

  const table = document.createElement('table');
  table.style.display = 'table';
  table.style.width = '100%';

  table.appendChild(colgroup);
  table.appendChild(thead);
  table.appendChild(tbody);

  const seedListNode = document.querySelector('.seed-list');
  seedListNode.textContent = '';
  seedListNode.appendChild(table);
})();
