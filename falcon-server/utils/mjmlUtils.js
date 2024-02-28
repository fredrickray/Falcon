const fs = require('fs');
const mjml = require('mjml');

function renderMJMLTemplate(filePath, props) {
  let mjmlTemplate = fs.readFileSync(filePath, 'utf-8');

  // Replace placeholders with actual values
  Object.keys(props).forEach((prop) => {
    const regex = new RegExp(`{{${prop}}}`, 'g');
    mjmlTemplate = mjmlTemplate.replace(regex, props[prop]);
  });

  return mjml(mjmlTemplate).html;
}

module.exports = renderMJMLTemplate;