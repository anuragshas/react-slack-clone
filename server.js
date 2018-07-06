const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const dotEnv = require('dotenv').config();

const app = express();

if (dotEnv.error) {
  console.log("FATAL ERROR .env file not found");
  process.exit(1);
}

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:2c28e8eb-bba2-4821-b734-f4d262c64726',
  key: process.env.APP_KEY,
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const { grant_type } = req.body;
  const authData = chatkit.authenticate({ grant_type, userId: req.query.user_id });
  res.status(authData.status)
    .send(authData.body);
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
