const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3pbm41d.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://<username>:<password>@cluster0.3pbm41d.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const blogCollection = client.db('blogDB').collection('blog');
    const blogAddCollection = client.db('blogAddDB').collection('blogAdd');
    const wishlistCollection = client.db('wishlistDB').collection('wishlist');




    // blog api
app.get('/blog', async (req, res)=>{
  const cursor= blogCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})

app.get('/blog/:id', async (req,res)=>{
  const id =req.params.id;
  const quary = {_id : new ObjectId(id)};
  const result = await blogCollection.findOne(quary);
  res.send(result);
})

// add blog api

app.get('/blogadd', async (req, res)=>{
  const cursor= blogAddCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})


app.post('/blogadd', async(req,res)=>{
  const newBlog=req.body;
  console.log(newBlog);
  const result=await blogAddCollection.insertOne(newBlog);
  res.send(result);
})


// update blog api

app.get('/blogadd/:id', async (req,res)=>{
  const id =req.params.id;
  const quary = {_id : new ObjectId(id)};
  const result = await blogAddCollection.findOne(quary);
  res.send(result);
})



// app.put('/coffee/:id', async (req,res)=>{
//   const id =req.params.id;
//   const filter = {_id : new ObjectId(id)};
//   const options= {upsert: true};
//   const updatedCoffee=req.body;
//   const coffee ={
//     $set: {
//       name: updatedCoffee.name, 
//       quantity: updatedCoffee.quantity, 
//       supplier: updatedCoffee.supplier, 
//       test: updatedCoffee.test, 
//       category: updatedCoffee.category, 
//       details: updatedCoffee. details, 
//       photo:updatedCoffee.photo,
//     }
//   }
//  const result =await coffeeCollection.updateOne(filter,coffee,options);
//  res.send(result);
// })

// wishlist api

app.get('/wishlist', async (req, res)=>{
  const cursor= wishlistCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})



app.post("/wishlist", async (req, res) => {
  const blogs = req.body;
  const result = await wishlistCollection.insertOne(blogs);
  console.log(result);
  res.send(result);
});




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('Blog is running');
})


app.listen(port,()=>{
    console.log(`Blog server is running on port${port}`)
})