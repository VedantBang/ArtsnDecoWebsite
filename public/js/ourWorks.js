document.getElementById('waves-tab').addEventListener(
  'click',
  () => {
    document.querySelector('.waves-gallery').childElementCount
      ? null
      : coverWorks('waves');
  },
  { once: true }
);

document.getElementById('quark-tab').addEventListener(
  'click',
  () => {
    document.querySelector('.quark-gallery').childElementCount
      ? null
      : coverWorks('quark');
  },
  { once: true }
);

document.getElementById('spree-tab').addEventListener(
  'click',
  () => {
    document.querySelector('.spree-gallery').childElementCount
      ? null
      : coverWorks('spree');
  },
  { once: true }
);

document.getElementById('other-tab').addEventListener(
  'click',
  () => {
    document.querySelector('.other-gallery').childElementCount
      ? null
      : coverWorks('other');
  },
  { once: true }
);
