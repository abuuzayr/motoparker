const Location = require('../models/Location')

// Declare routes

module.exports = function (app) {
    app.post('/location/:id', postLocation)
    app.get('/location/:id', getLocation)
    app.get('/locations', getAllLocations)
}

// Methods

const postLocation = async (req, res) => {
    const location = req.params.id ? 
        await Location.findByIdAndUpdate(req.params.id, req.body) : 
        new Location(req.body)
    location.save()
        .then(location => {
            res.status(200).json({ 'message': `Location successfully ${req.params.id ? 'updated' : 'added'}` });
        })
        .catch(err => {
            res.status(400).send("Error when saving to database");
        });
}

const getLocation = async (req, res) => {
    const location = await Location.findById(req.params.id)
    res.status(200).json({ 'location': location })
}

const getAllLocations = async (req, res) => {
    const locations = await Location.find({ active: true })
    res.status(200).json({ 'locations': locations })
}
