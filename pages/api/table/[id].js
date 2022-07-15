import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://Taskjob:salwan12345@cluster0.8ebs1.mongodb.net/task-items?retryWrites=true&w=majority"
  );

  if (req.method === "DELETE") {
    const db = client.db();
    const item = await db.collection("items").deleteOne({ id: req.query.id });

    res.status(200).json({ message: "deleted" });
  }
};

export default handler;
