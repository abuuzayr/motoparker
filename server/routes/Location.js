const Location = require('../models/Location')

// Declare routes

module.exports = function (app) {
    app.post('/location', postLocation)
}

// Methods

const postLocation = (req, res) => {
    const location = new Location(req.body)
    location.save()
        .then(location => {
            res.status(200).json({ 'message': 'Location successfully added ' });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
}