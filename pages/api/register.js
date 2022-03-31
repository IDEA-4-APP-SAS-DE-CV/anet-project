import { ObjectId } from "mongodb";
import clientPromise from "../../util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("requisitions-2");
  if (req.method === "POST") {
    try {
      const insert = await db.collection("users").insertOne(req.body);
      console.log({ insert });
      const user = await db
        .collection("users")
        .findOne({ _id: ObjectId(insert.insertedId) });

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
