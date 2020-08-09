const waves = document.querySelector('#waves').id;
const quark = document.querySelector('#quark').id;
const spree = document.querySelector('#spree').id;
const other = document.querySelector('#other').id;

// Initial message
const tr = document.createElement('tr');
const td = document.createElement('td');
td.setAttribute('colspan', 5);
td.classList.add('text-center');
td.innerText = 'Please select a Fest to edit';
tr.appendChild(td);
document.querySelector('#fests').appendChild(tr);

festRequest(waves);
festRequest(quark);
festRequest(spree);
festRequest(other);