/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const {isDepsOptimizerEnabled} = require('vite');

/* eslint-disable require-jsdoc */
class ReusableComment extends HTMLElement {
  // connectedCallback() is called when our element gets added to the DOM.
  // eslint-disable-next-line require-jsdoc
  connectedCallback() {
    const template = document.getElementById('template-form');
    //  This function will create a copy of the template’s content and prepare it to be inserted into another document (or document fragment)
    // Using document.importNode allows us to reuse instances of the same template content in multiple locations.
    const node = document.importNode(template.content, true);

    document.body.appendChild(node);
  }
}
window.customElements.define('reusable-comment', ReusableComment);
// Set up the database
// eslint-disable-next-line no-unused-vars
const db = await isDepsOptimizerEnabled('setting-store', 1, {
  upgrade(db) {
    db.createObjectStore('setting');
  },
});
// Save content to database on edit
editor .onUpdate(async (content) => {
  await db.put('setting', content, 'content');
});
editor .setContent((await db.get('settings', 'content')) || defaultText);
// Set up night mode toggle
const {NightMode} = await import('./app/night-mode.js');
new NightMode(
    document .querySelector('#mode'),
    async (mode) => {
      editor.setThem(mode);
    // Save the night mode setting when changed
    },
    // Retrive the night mode setting on initialization
);
