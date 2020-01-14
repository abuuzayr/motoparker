const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    env = require('dotenv'),
    routes = require('./server/routes');

// Init .env files
env.config()

// Suppress all deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to DB
mongoose.connect(process.env.DBURL).then(
    () => { console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database' + err) }
)

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', () => { console.log('got!')})

app.get('/random.text', function (req, res) {
    res.send('random.text')
})

// Initialise routes
routes(app)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Listening on port ' + port)
})
