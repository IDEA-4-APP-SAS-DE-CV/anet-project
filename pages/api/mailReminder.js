const mailjet = require("node-mailjet").connect(
  "3611bae8feb2d7600e0823610119208d",
  "60fd1c5805283d940d2be9c081862f5c"
);
import { useRouter } from "next/router";

export default async function handler(req, res) {
  const { idContract, mail, name, type } = req.body;
  console.log(name, mail);
  if (mail) {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "sistemas@amiif.org.mx",
            Name: "Mailjet Pilot",
          },
          To: [
            {
              Email: mail,
              Name: name,
            },
          ],
          TemplateID: 3810597,
          TemplateLanguage: true,
          Subject: "Recordatorio de aprobación de contrato",
          Variables: { idContract },
        },
      ],
    });
    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });

    // const request = mailjet.post("send", { version: "v3.1" }).request({
    //   Messages: [
    //     {
    //       From: {
    //         Name: "AMIIF",
    //         Mail: "sistemas@amiif.org.mx",
    //       },
    //       To: [
    //         {
    //           Name: name,
    //           Mail: mail,
    //         },
    //       ],
    //       TemplateID: 3810597,
    //       TemplateLanguage: true,
    //       Subject: "Recordatorio de aprobación de contrato",
    //       Variables: { idContract, type },
    //     },
    //   ],
    // });
    // request
    //   .then((result) => {
    //     console.log(result.body);
    //   })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .catch((err) => {
    //     console.log(err.statusCode);
    //   });
  } else {
    return res.status(500).json({
      success: false,
      error: "Falla de servidor al enviar el mensaje",
    });
  }
}
