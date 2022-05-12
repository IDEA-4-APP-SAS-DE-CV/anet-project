import { ObjectId } from "mongodb";
import clientPromise from "../../util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("anet-db");
  if (req.method === "POST") {
    try {
      const newPost = await db.collection("contracts").insertOne(req.body);
      res.json(newPost);
    } catch (error) {
      return res.status(400).json({ success: false, error: "ERROR EN POST" });
    }
  } else if (req.method === "PUT") {
    const newUpdate = req.body;

    const arrStat = newUpdate.approvals.map((approval) => {
      if (approval.approved !== true) {
        return false;
      } else {
        return true;
      }
    });

    const isAllTrue = (currentValue) => currentValue === true;
    newUpdate.status = (arrStat.every(isAllTrue) && "approved") || "pending";
    const newSet = {
      status: newUpdate.status,
      approvals: newUpdate.approvals,
      comments: newUpdate.comments,
    };
    const filter = { _id: ObjectId(newUpdate._id) };
    const newContract = { $set: newSet };
    const contracts = db
      .collection("contracts")
      .updateOne(filter, newContract, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });

    res.json({ status: 200, data: contracts });
  } else if (req.method === "PATCH") {
    const updateComments = req.body;
    const { comments, idContract } = updateComments;
    const filter = { _id: ObjectId(idContract) };
    const newComments = { $set: { comments: comments } };

    const contracts = db
      .collection("contracts")
      .updateOne(filter, newComments, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });

    res.json({ status: 200, data: contracts });

    // console.log({ comments });
    // try {
    //   db.collection("contracts").updateOne(
    //     { _id: ObjectId(idContract) },
    //     { $set: { comments: comments } },
    //     function (err, res) {
    //       console.log({ res });
    //       if (err) throw err;
    //       res.json({ status: 200, data: "Updated" });
    //     }
    //   );
    // } catch (error) {
    //   return res.status(400).json({ success: false, error: "ERROR EN PATCH" });
    // }
  } else if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const contract = await db
        .collection("contracts")
        .find({ _id: ObjectId(id) })
        .toArray();

      res.json({ status: 200, data: contract });
    } else {
      try {
        const contracts = await db.collection("contracts").find({}).toArray();
        res.json({ status: 200, data: contracts });
      } catch (error) {
        return res.status(400).json({ success: false, error: "ERROR EN GET" });
      }
    }
  } else {
    return res.status(500).json({ success: false, error: "Falla de servidor" });
  }
}
