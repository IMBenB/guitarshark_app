const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());



const url = "mongodb+srv://IMBB:ZT4smQXxK6zRu3pW@cluster0-zxnkf.mongodb.net/sharks"

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
    console.log('ben')
    let name = 'ben';
    let latitude = req.body['latitude']
    let longitude = req.body['longitude']
    console.log(req.body['longitude'])
    mongoose.connect(url, { useNewUrlParser: true });
    mongoose.set('useUnifiedTopology', true);


    const samplesModel = mongoose.model('guitar samples', userSampleSchema);

    const sampleDetails = new samplesModel({ name: `${name}`, latitude: `${latitude}`, longitude: `${longitude}` });


    sampleDetails.save().then(doc => {
        console.log(doc);
    })
    samplesModel.find({ samplesModel })
        .then(doc => {
            console.log(doc);
            res.send(doc);
        })
    
    .catch(err => {
        console.log(err)
    });

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
let port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('we on', port)
})
//nodemon