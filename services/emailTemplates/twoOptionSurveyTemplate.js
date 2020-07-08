const { request } = require("express");

const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>Geri dönüşünüze ihtiyacımız var!</h3>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Evet</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">Hayır</a>
                </div>
            </div>
        </body>
    </html>
  `;
};
