const Express = require("express")
const BodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://newuser304:nini1216@cluster0-lafar.azure.mongodb.net/test?retryWrites=true"
const DATABASE_NAME = "dummy000"

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

var result = "";

app.listen(10888, () => {
        MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true },
                (error, client) => {
                        if(error) {
                                throw error;
                        }
                        database = client.db(DATABASE_NAME);
                        collection = database.collection("books");
                        console.log("Connected to `" + DATABASE_NAME + "`!");
                });
});

app.get("/allbooks", (request, response) => { 
        console.log("someone request to get all books from database")
        var records = collection.find()
        records.forEach(function(record) {
                if(record!=null) {
                        console.log(record)
                        result = result + JSON.stringify(record)
    }
}, function(err) {
    if(err) {
            response.status(500).send(err)
    }
    console.log(result)
    response.send(result)
})
})

