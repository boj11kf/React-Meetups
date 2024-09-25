import { MongoClient, ServerApiVersion } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  console.log("Handler in");
  if (req.method === "POST") {
    const data = req.body;

    const uri =
      "mongodb+srv://boj11kf:<password>@cluster0.kq3zb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        serverSelectionTimeoutMS: 50000, // 50 másodperces timeout
        socketTimeoutMS: 45000, // 45 másodperces socket timeout
      },
      ssl: true,
    });
    run(client).catch(console.dir);
  }
}

async function run(client) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log("Connect starting...");
    await client.connect();
    await listDatabases(client);
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch(error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/* async function run(client, data, res) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const meetupCollection = client.db().collection('meetups');

    const result = await meetupCollection.insertOne(data);

    console.log(result);
    

  } catch(error)  {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    res.status(201).json({messsage: "Meetup inserted!"});
    await client.close();
  }
} */

export default handler;
