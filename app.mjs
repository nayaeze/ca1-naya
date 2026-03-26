import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const PORT = 3000

app.use(express.static(__dirname)); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb+srv://nayaeze:naya123@cluster0.z9drhg3.mongodb.net/?appName=Cluster0')
    .then(() => {console.log("MongoDb Connection Is Secured")})
    .catch((err) => {console.log("MongoDB Conection failed", err)})


const kittySchema = new mongoose.Schema({catName: String})

const Kitten = mongoose.model("Kitties", kittySchema)

app.get('/api', (req,res) => {
    res.json("Server is up")
})

app.post('/api/submit-form', async (req,res) => {
    try{
    const cat = new Kitten({catName: req.body.catName})

    await cat.save()

    res.json(`Kitty ${cat} is being sent to space!`)
    console.log(req.body)
    }
    catch(err){
        res.json(err)
    }
})


app.get('/api/cats', async (req,res) => {
    const Cats = await Kitten.find()
    const Cats4U = []
    Cats.forEach(key =>{
        if (key.catName){
        Cats4U.push(key.catName)
        }
    })

    res.json({body: Cats4U})
})


app.post('/api/cats' ,async (req,res) => {
    console.log(req.body)
    const change = await Kitten.findOneAndUpdate({catName: req.body.cat2rep}, {catName: req.body.catrep}, {returnDocument:true})
    if (change){
        res.json(`Updated: ${req.body.cat2rep} is now ${req.body.catrep}`)
    }
    else {
        res.status(404).json("Kitten Not Found")
    }

})

app.post('/api/cat-function', async (req,res) => {
    const activity = await Kitten.deleteMany({})
    console.log("All Gone!")
    res.json("Release the Kitties!")

})


app.listen(PORT, () => {
    console.log("Server is listening on Port:", PORT)
})