const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());



const url = "mongodb+srv://IMBB:ZT4smQXxK6zRu3pW@cluster0-zxnkf.mongodb.net/test?retryWrites=true&w=majority"

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we are here');
});

const Schema = mongoose.Schema;
const userSampleSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number
});

app.post('/addData', (req, res) => {
    
    let name = 'ben';
    let latitude = 32;
    let longitude = 34;
    mongoose.connect(url, { useNewUrlParser: true });
    mongoose.set('useUnifiedTopology', true);

   
    const sampleModel = mongoose.model('sample', userSampleSchema);

    const sampleDetails = new sampleModel({ name: `${name}`, latitude: `${latitude}`, longitude: `${longitude}` });


    sampleDetails.save().then(doc => {
        console.log(doc);
    }).catch(err => {
        console.log(err)
    });
    //
});

// app.post('/findData', (req, res) => {
//     console.log(req.body['data'])
//     let nameToFind = req.body['data'];
//     mongoose.connect(url, { useNewUrlParser: true });
//     mongoose.set('useUnifiedTopology', true);

//     const phoneBookModel = mongoose.model('phoneBook', phoneBookSchema);

//     phoneBookModel.find({ name: `${nameToFind}` })
//         .then(doc => {
//             console.log(doc);
//             res.send(doc);
//         })
//         .catch(err => {
//             console.log(err)
//         })



// })
let port = process.env.PORT || 52;

app.listen(port, function () {
    console.log('we on', port)
})