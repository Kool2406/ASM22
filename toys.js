const express = require('express');
var router = express.Router();
var publicDir = require("path").join(__dirname,'/public');
router.use(express.static(publicDir));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://kool2406:0961688824Kool@cluster0-y4ose.mongodb.net/test "

///  default 
router.get('/',async (req,res)=>{   
    let client = await MongoClient.connect(url);
    let dbo = client.db("Kool");
    let result = await dbo.collection("Toys").find({}).toArray();
    res.render('showtoys',{toys:result});
});

//// delete
router.get('/delete',async (req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    let client= await MongoClient.connect(url);
    let dbo = client.db("Kool");
    await dbo.collection("Toys").deleteOne(condition);
    let results = await dbo.collection("Toys").find({}).toArray();
    res.render('showtoys',{toys:results});
});

router.get('/',async(req,res)=>{
    res.render('showtoys',{toys:result});
});

/// add
router.post('/doInsert',async(req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("Kool");
    let name = req.body.txtNameToys;
    let price = req.body.txtPriceToys;
    let description = req.body.txtDescriptionToys;
    let newProduct = {NameToys : name, PriceToys : price, DescriptionToys:description};
    await dbo.collection("Toys").insertOne(newProduct);
    console.log(newProduct);
    let results = await dbo.collection("Toys").find({}).toArray();
    res.render('showtoys',{toys:results});
});
router.get('/update',async(req,res)=>
{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID; 
    let cliet = await MongoClient.connect(url);
    let dbo = cliet.db('Kool');
    let result = await dbo.collection("Toys").findOne({'_id' : ObjectID(id)});
    res.render('update',{toys:result});
})
router.post('/doUpdate', async(req,res)=>{
    let id = req.body.id;
    let name = req.body.txtNameToys;
    let price = req.body.txtPriceToys;
    let description = req.body.txtDescriptionBook;
    let newValues ={$set : {NameToys: name,PriceToys:price,DescriptionToys:description}};
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    console.log(id);
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("Kool");
    await dbo.collection("Toys").updateOne(condition,newValues);
    //
    let results = await dbo.collection("Toys").find({}).toArray();
    res.render('showtoys',{toys:results});
});

module.exports = router;