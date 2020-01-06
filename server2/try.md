let saveToDB = new Promise((resolve, reject) => {
        sampleDetails.save().then(doc => {
            console.log(doc);
            resolve(true)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    })

    let findSharks = new Promise((resolve, reject) => {
        samplesModel.find({ samplesModel })
            .then(doc => {
                console.log(doc);
                resolve(doc)
            }).catch(err => {
                console.log(err)
                reject(err)
            });
    })

    async function saveAndGetSharks(){
        console.time('save')
        await saveToDB;
        console.timeEnd('save')

        let sharks = await findSharks;
        console.log(sharks)
        res.send(sharks)
    }