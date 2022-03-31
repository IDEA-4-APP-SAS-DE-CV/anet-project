import { ObjectId } from "mongodb";
import clientPromise from "../../util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("requisitions-2");
  if (req.method === "GET") {
    const { name } = req.query;
    if (name) {
      let users = await db
        .collection("users")
        .find({ name: new RegExp(".*" + name + ".*", "i") })
        .toArray();

      if (!users.length) {
        users = await db
          .collection("users")
          .find({ lastname: new RegExp(".*" + name + ".*", "i") })
          .toArray();
      }

      if (!users.length) {
        users = await db
          .collection("users")
          .find({ mail: new RegExp(".*" + name + ".*", "i") })
          .toArray();
      }

      const depuredMap = users?.map((usr) => {
        return {
          name: usr?.name,
          lastname: usr?.lastname,
          enterprise: usr?.enterprise,
          mail: usr?.mail,
          nickname: usr?.nickname,
          phone: usr?.phone,
          photo: usr?.photo,
          _id: usr?._id,
        };
      });

      res.json({ status: 200, data: depuredMap });
    } else {
      try {
        const users = await db.collection("users").find({}).toArray();
        res.json({ status: 200, data: users });
      } catch (error) {
        return res.status(400).json({ success: false, error: "ERROR EN GET" });
      }
    }
  } else {
    return res.status(500).json({ success: false, error: "Falla de servidor" });
  }
}
