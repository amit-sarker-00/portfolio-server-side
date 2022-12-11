const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qpavz6c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const projectCollection = client.db("projects").collection("project");

  try {
    app.get("/projects", async (req, res) => {
      const query = {};
      const projects = await projectCollection.find(query).toArray();
      res.send(projects);
    });

    app.get("/project/:name", async (req, res) => {
      const name = req.params.name;
      const query = { name: name };
      const project = await projectCollection.findOne(query);
      res.send(project);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Portfolio is running");
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
