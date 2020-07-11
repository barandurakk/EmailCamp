const { request } = require("express");

const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>Geri dönüşünüze ihtiyacımız var!</h3>
                <p>${survey.body}</p>
                ${survey.choices.map((choice) => {
                  return `
                    <div>
                      <a href="${keys.redirectDomain}/api/surveys/${survey.id}/${choice.answer}">
                        ${choice.answer}
                      </a>
                    </div>
                  `;
                })}
               
                
            </div>
        </body>
    </html>
  `;
};
