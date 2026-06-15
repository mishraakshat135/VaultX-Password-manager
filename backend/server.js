
const CryptoJS = require("crypto-js");
const express = require('express');
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require('./middleware/auth')

dotenv.config()

// Connection URL
// const url = 'mongodb://localhost:27017';
const client = new MongoClient(process.env.MONGO_URI);

// Database Name
const dbName = 'VaultX';
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json())
app.use(cors())



app.get('/', auth, async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({userId: req.user.userId}).toArray();
    const decryptedPasswords = findResult.map(item => ({
        ...item,
        password: CryptoJS.AES.decrypt(
            item.password,
            process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
    }))


    res.json(decryptedPasswords);
});


app.post('/',auth, async (req, res) => {
    try {
        console.log("Logged in user :", req.user)
        
        const data = {...req.body, userId: req.user.userId}
    

        const encryptedPassword = CryptoJS.AES.encrypt(
            data.password,
            process.env.SECRET_KEY
        ).toString()
        console.log("after encryption")
        data.password = encryptedPassword
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.insertOne(data)
       

        res.send({ success: true, result: findResult });
    }
    catch (error) {

        res.status(500).send({
            success: false,
            error: error.message
        });
    }
});

app.delete('/', auth, async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const result = await collection.deleteOne({
        id: req.body.id, 
        userId: req.user.userId
    });

    res.send({
        success: true,
        result
    });
});

async function startServer() {
    try {
        await client.connect();
        console.log("MongoDB Connected");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

startServer();

app.post('/signup', async (req, res) => {

    try {
        const { email, password } = req.body;
        const db = client.db(dbName);
        const users = db.collection('users');

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Account already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await users.insertOne({
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        res.json({
            success: true,
            message: "Account created"
        })


    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

app.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        const db = client.db(dbName);
        const users = db.collection('users');
        const user = await users.findOne({email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        
        }
        const match = await bcrypt.compare(
            password,
            user.password
        );
        if(!match){
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            });


        }

        const token= jwt.sign({
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    
    );

    res.json({
        success: true,
        token
    });
    }

    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})