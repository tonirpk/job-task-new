import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://Taskjob:salwan12345@cluster0.8ebs1.mongodb.net/task-items?retryWrites=true&w=majority"
  );

  const { id, date, title, quantity, distance } = req.body;

  if (req.method === "POST") {
    const newItem = {
      id,
      date,
      title,
      quantity,
      distance,
    };

    const db = client.db();

    const result = await db.collection("items").insertOne(newItem);

    console.log(result);

    res.status(201).json({ message: "Item added!", itemData: newItem });
  }

  if (req.method === "GET") {
    const db = client.db();

    const itemsList = await db
      .collection("items")
      .find()
      .sort({ id: -1 })
      .toArray();

    res.status(200).json({ items: itemsList });
  }

  client.close();
};

export default handler;
