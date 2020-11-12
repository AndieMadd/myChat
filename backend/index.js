const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/naychatDB');
const allmessages = db.get('allmessages');


app.use(cors());
app.use(express.json());

app.get('/messages', (req, res) =>{
    allmessages
    .find()
    .then(messages => {
        res.json(messages);
    });
});

function isValid(message)
{
    return message.name && message.name.toString().trim() != '' && message.content && message.content.toString().trim() != '';

}


app.post('/messages', (req, res) =>{
    if(isValid(req.body))
    {
        const message = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        allmessages.insert(message)
        .then(createdMessage => {res.json(createdMessage)});
        //res.json(message);
    } else 
    {
        res.status(422);
        res.json({message: "Name and Content Required"});
    }

});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});