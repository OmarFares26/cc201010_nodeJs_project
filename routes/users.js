const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/', (req,res) => {

    res.send('Hallo world  from users!');
});


//let userDetails = {};

router.route('/:id/picture')
    .get((req,res) => {
        let uID = req.params.id;
        const filename = uID + '.jpg';
        const options = {
            root: path.join(__dirname, '../uploads')
        }
        res.sendfile(filename, options);
    })
    .post((req,res) => {
        try{
            if (!req.files){
                res.send({
                    status: false,
                    message: 'no file has been uploaded'
                })
            } else {
                let picture = req.files.picture;

                let filename = './uploads/' + req.params.id + '.jpg';
                picture.mv(filename);
                console.log('saved the picture to: ' + filename)

                res.send(
                    {
                        status: true,
                        message: 'File has been uploaded',
                        data: {
                            name: picture.name,
                            size: picture.size
                        }
                    }
                )

            }
        } catch (err) {
            res.sendStatus(500).send(err)
        }
    })




router.get('/:id' , (req,res)=> {
    console.log(req.params)
    res.send('Got request for user id ' + req.params.id)
})


module.exports = router;