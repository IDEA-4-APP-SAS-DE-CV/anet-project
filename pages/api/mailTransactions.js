const mailjet = require("node-mailjet").connect(
  "3611bae8feb2d7600e0823610119208d",
  "60fd1c5805283d940d2be9c081862f5c"
);

export default async function handler(req, res) {
  const { email, name, type, title } = req.body;
  if (email) {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: mail,
            Name: name,
          },
          To: [
            {
              Email: "starla.frr@gmail.com",
              Name: "Fernando",
            },
            // {
            //   Email: "jan.merol@gmail.com",
            //   Name: "Fernando",
            // },
          ],
          TemplateID: 3745457,
          TemplateLanguage: true,
          Subject: "Nuevo contrato",
          Variables: { title },
        },
      ],
    });
    request
      .then((result) => {
        console.log(result.body);
      })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } else {
    return res.status(500).json({
      success: false,
      error: "Falla de servidor al enviar el mensaje",
    });
  }
}
