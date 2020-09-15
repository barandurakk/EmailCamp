const { request } = require("express");

const keys = require("../../config/keys");
const { redirectDomain } = require("../../config/keys");

module.exports = (survey) => {
  return `
  
  <html>
<head>
    <style>
        .buttons {
 display: flex;
 flex-direction: column;
 
     padding: 0px 0px 20px 0px;
     margin: 0px 25px 0px 25px;
   }
    
     .button {
     color: #ffffff;
     background:  #213e5b;
     border-radius: 8px;
     transition: .2s ease-in-out;
     padding: 15px 30px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    margin: 1em;
     }
     .button:hover {
   border-radius: 30px;
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.20), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
     }

    </style>
</head>
  <body>
  <div
    width="100%"
    background="#m_8565475216061629807_m_2549748284714280962_DCDCDC;"
    bgcolor="#DCDCDC;"
    style="
     
      line-height: 20px;
      color: #999999;
      background-color: #213E5B;
    "
  >
    <span
      bgcolor="#DCDCDC;"
      background="#m_8565475216061629807_m_2549748284714280962_DCDCDC;"
      style="background-color: #dcdcdc;"
    >
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td align="center" style="padding-bottom: 10px;">
              <div align="left" style="padding: 15px 15px 15px 15px;">
                <h1> <a style=" text-decoration: none; color:#ffffff" href="${
                  keys.redirectDomain
                }">EmailCamp</a> </h1></div>
            </td>
          </tr>
        </tbody>
      </table>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td align="center" style="padding-bottom: 10px;">
              <div align="center" style="padding: 0 15px 10px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="600">
                  <tbody>
                    <tr>
                      <td bgcolor="#ffffff">
                        <table border="0" cellpadding="0" cellspacing="0" width="600">
                          <tbody>
                            <tr>
                              <td>
                                <table
                                  style="width: 600px;"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="600"
                                  
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <table width="100%" align="center">
                                          <tbody>
                                            <tr>
                                              <td
                                                align="center"
                                                valign="center"
                                                style="padding: 30px 15px 15px 15px;"
                                              >
                                                
                                              <span style="font-weight:600; font-size:22pt; color:#213e5b">Geri dönüşünüze ihtiyacımız var!</span> 

                                              </td>
                                              
                                            </tr>
                                            <tr>
                                                <td
                                                  align="center"
                                                  valign="center"
                                                  style="padding: 30px 15px 15px 15px;"
                                                >
                                                  
                                                <p style="font-size:18pt;">${survey.body}</p> 
  
                                                </td>
                                                
                                              </tr>
                                          </tbody>
                                        </table>
                                        <table width="100%" align="center">
                                          <tbody>
                                            <tr>
                                              <td style="padding-top: 30px;">
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  align="center"
                                                >
                                                  <tbody>
                                                    
                                                      
                                                        
                                                          
                                                        
                                                      
                                                    
                                                    <div class="buttons">
                                                        ${survey.choices.map((choice) => {
                                                          return `
                                                          <tr>
                                                            <td align="center">
                                                              
                                                              <a style=" text-decoration: none; color:#ffffff" href="${keys.redirectDomain}/api/surveys/${survey.id}/${choice._id}" class="button" target="_blank" rel="noopener">
                                                              ${choice.answer}
                                                              </a>
                                                            </td>
                                                            </tr>
                                                          `;
                                                        })}
                                                            
                                                            
                                                        </div>
                                                    <tr>
                                                      <td
                                                        align="center"
                                                        style="
                                                          padding: 0 30px 30px 15px;
                                                          color: #000000;
                                                          font-size: 16px;
                                                          line-height: 22px;
                                                          font-family: 'Montserrat', Helvetica,
                                                            Arial, sans-serif;
                                                        "
                                                      >
                                                        <div>
                                                          <em></em>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </span>
  </div>
  <img
    src="https://ci6.googleusercontent.com/proxy/NANWWuag3KSN1NyjPhZowzY9eUmIcDP-vwBxPz_GHMFbRLm7IYjm0PxQWmtaInJCSQsbV0OjZcLqyXDe-fNkXPX9tPSU-upOExOcySOHtWOwt64lcm8Uo2QOvV3Xn2o6BPBe34rkZBaAtfTV2_Y4b4MVofZK0Prh-JxEP0pSnk2L7EdaIw35Q_KjXEE=s0-d-e1-ft#http://info1.franklincovey.com/trk?t=1&amp;mid=NTI0LUFVTy0zMTU6MDoxMDUyNToxODc0NzowOjEzODUxOjk6MjM2NzY6MzM3NzQxOC0xOm51bGw%3D"
    width="1"
    height="1"
    style="display: none !important;"
    alt=""
    class="CToWUd"
  />
  <p>
    <font face="Verdana" size="1"
      >Bu email
      <a href="mailto:${survey.from}" target="_blank">${survey.from}</a>
      tarafından
      <a
        href="${keys.redirectDomain}"
        target="_blank"
        >EmailCamp</a
      >
      aracılığı ile gönderilmiştir.
    </font>
  </p>
</div>
</body>
</html>


  `;
};
