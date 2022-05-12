import clientPromise from "../../util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("anet-db");
  if (req.method === "POST") {
    try {
      const user = await db
        .collection("users")
        .findOne({ nickname: req.body.username, password: req.body.password });
      const {
        _id,
        nickname,
        name,
        mail,
        gender,
        typeUser,
        phone,
        photo,
        enterprise,
      } = user;
      const logedUser = {
        _id,
        nickname,
        name,
        mail,
        gender,
        typeUser,
        phone,
        photo,
        enterprise,
      };
      res.json(logedUser);
    } catch (error) {
      return res.status(400).json({ success: false, error: "ERROR EN POST" });
    }
  } else {
    return res.status(500).json({ success: false, error: "Falla de servidor" });
  }
}
