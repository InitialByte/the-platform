import {SwaggerUIBundle} from 'swagger-ui-dist';
import 'swagger-ui-dist/swagger-ui.css';
import './style.css';

window.onload = () => {
  const {__INITIAL_STATE__: modules} = window;
  const renderSwaggerUI = (url) => SwaggerUIBundle({
    url,
    dom_id: '.wrapper__swagger',
    presets: [
      SwaggerUIBundle.presets.apis,
    ],
  });

  const main = document.getElementById('app');
  const wrapper = document.createElement('div');
  const swagger = document.createElement('div');
  const span = document.createElement('h3');
  const spanTextNode = document.createTextNode('Select module to see its API.');
  const currentModule = new URLSearchParams(window.location.search).get('module');

  wrapper.classList.add('wrapper');
  swagger.classList.add('wrapper__swagger');

  span.appendChild(spanTextNode);
  wrapper.appendChild(span);

  modules.forEach(({moduleName, fullName, description}) => {
    const link = document.createElement('a');
    const textNode = document.createTextNode(moduleName);

    link.href = `?module=${moduleName}`;
    link.title = `${fullName}, ${description}`;

    if (currentModule === moduleName) {
      link.classList.add('active');
    }

    link.appendChild(textNode);
    link.addEventListener('click', (event) => {
      if (moduleName !== currentModule) {
        renderSwaggerUI(`/swagger/${moduleName}.yaml`);
      } else {
        event.preventDefault();
      }
    });
    wrapper.appendChild(link);
  });

  wrapper.appendChild(swagger);
  main.appendChild(wrapper);

  if (currentModule) {
    renderSwaggerUI(`/swagger/${currentModule}.yaml`);
  }
};
