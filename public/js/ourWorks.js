coverWorks('waves');

document.getElementById('quark-tab').addEventListener(
  'click',
  () => {
    coverWorks('quark');
  },
  { once: true }
);

document.getElementById('spree-tab').addEventListener(
  'click',
  () => {
    coverWorks('spree');
  },
  { once: true }
);

document.getElementById('specials-tab').addEventListener(
  'click',
  () => {
    coverWorks('other');
  },
  { once: true }
);
