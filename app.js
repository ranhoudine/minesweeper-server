const express = require('express');
const cors = require('cors');
const fs = require('fs');
const port = 3001 || process.env.PORT
const app = express()
app.use(cors())



const highscoresString = fs.readFileSync('./src/highscores.txt').toString();
const highscores = JSON.parse(highscoresString);

const compareEntries = (a, b) => {
    return a.time - b.time;
}

app.get('/', (req, res) => {
    res.send("Hello from the server!")
})

app.get('/highscores', (req, res) => {
    res.send(highscores.sort(compareEntries))
})
app.post('/add-highscore', (req, res) => {
    const name = req.query.name;
    const time = req.query.time;
    if (!time || !name) {
        return res.send({error: "name or time weren't provided"});
    }
    highscores.push({name, time})
    const highscoresString = JSON.stringify(highscores);
    fs.writeFileSync('./src/highscores.txt', highscoresString);
    res.send();


})
app.listen(port, () => {
    console.log("server is  listening on port " + port)
})