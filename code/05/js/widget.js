
import { render } from './render.js';

const URL = 'http://localhost:8080/code/05/data/contacts.json';

const q = (selector) => document.querySelector(selector);

window.addEventListener('DOMContentLoaded', () => {

  const list = q('.widget ol');
  const input = q('.widget input');

  fetch(URL)
    .then((response) => response.json() )
    .then((data) => {

      // Primo render dei dati
      render(data, list);

      input.addEventListener('keyup', () => {
        // Leggo il testo della input e lo converto in minuscolo
        const txt = input.value.toLowerCase();

        // Creo un nuovo array con i risultati filtrati in base al testo
        // .filter() -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        const results = data.filter((contact) => {
          // Trasformiamo temporaneamente il nome del contatto in minuscolo
          const name = contact.name.toLowerCase();
          // Se il testo nella input è contenuto nel nome del contatto
          // il contatto corrent viene passato all'array filtrato
          // .search() -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
          return name.search(txt) > -1;
        });

        // Renderizziamo l'array filtrato in pagina
        render(results, list);
      });
    });

});