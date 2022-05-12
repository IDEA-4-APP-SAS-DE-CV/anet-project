import { ObjectId } from "mongodb";
import clientPromise from "../../util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("anet-db");
  if (req.method === "POST") {
    console.log("POST");
  } else if (req.method === "PUT") {
    console.log("PUT");
  } else if (req.method === "PATCH") {
    console.log("PATCH");
  } else if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const contract = await db
        .collection("tasks")
        .find({ _id: ObjectId(id) })
        .toArray();

      res.json({ status: 200, data: contract });
    } else {
      try {
        const contracts = await db.collection("tasks").find({}).toArray();
        res.json({ status: 200, data: contracts });
      } catch (error) {
        return res.status(400).json({ success: false, error: "ERROR EN GET" });
      }
    }
  } else {
    return res.status(500).json({ success: false, error: "Falla de servidor" });
  }
}
