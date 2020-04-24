const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();




app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

//

// let saveToDB = new Promise((resolve, reject) => {
//     sampleDetails.save().then(doc => {
//         console.log(doc);
//         resolve(true)
//     }).catch(err => {
//         console.log(err);
//         reject(err)
//     })
// })

// let findSharks = new Promise((resolve, reject) => {
//     samplesModel.find({ samplesModel })
//         .then(doc => {
//             console.log(doc);
//             resolve(doc)
//         }).catch(err => {
//             console.log(err)
//             reject(err)
//         });
// })

// async function saveAndGetSharks(){
//     console.time('save')
//     await saveToDB;
//     console.timeEnd('save')

//     let sharks = await findSharks;
//     console.log(sharks)
//     res.send(sharks)
// }


//


const url = "mongodb+srv://IMBB:brinbergben@cluster0-zxnkf.mongodb.net/sharks"

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we are here');
});

const Schema = mongoose.Schema;
const userSampleSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    date: String,
    time: String
});



app.post('/addData', (req, res) => {
    console.log('ben')
    let name = req.body['user'];
    let latitude = req.body['latitude']
    let longitude = req.body['longitude']
    let date = req.body['date']
    let time = req.body['time']
    mongoose.connect(url, { useNewUrlParser: true });
    mongoose.set('useUnifiedTopology', true);


    const samplesModel = mongoose.model('guitar samples', userSampleSchema);

    const sampleDetails = new samplesModel({ name: `${name}`, latitude: `${latitude}`, longitude: `${longitude}`, date:`${date}`,time:`${time}` });


    sampleDetails.save().then(doc => {
        console.log('saved doc 1');

        samplesModel.find({})
            .then(doc => {

                res.send(doc)
            }).catch(err => {
                console.log(err)
                reject(err)
            });
    }).catch(err => {
        console.log(err);
        reject(err)
    })




});





app.post('/getData', (req, res) => {

    try {

        mongoose.connect(url, { useNewUrlParser: true });
        mongoose.set('useUnifiedTopology', true);

        const samplesModel = mongoose.model('guitar samples', userSampleSchema);


        samplesModel.find({})
            .then(doc => {
                // console.log(doc);
                let docObj = { doc, isOK: true };
                res.send(docObj);
            })

    } catch (err) {
        res.send({ isOK: false, error: err })
        console.log(err)
    }


})





app.post('/deleteData', (req, res) => {

    try {

        mongoose.connect(url, { useNewUrlParser: true });
        mongoose.set('useUnifiedTopology', true);

        const samplesModel = mongoose.model('guitar samples', userSampleSchema);


        samplesModel.deleteMany({})
            .then(doc => {
                // console.log(doc);
                let docObj = { doc, isOK: true };
                res.send(docObj);
            })

    } catch (err) {
        res.send({ isOK: false, error: err })
        console.log(err)
    }


})




let port = process.env.PORT || 5000;




app.listen(port, function () {
    console.log('we on', port)
})
//nodemon