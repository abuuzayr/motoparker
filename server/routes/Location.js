const Location = require('../models/Location')

// Declare routes

module.exports = function (app) {
    app.post('/location', postLocation)
    app.get('/location/:id', getLocation)
    app.get('/locations', getAllLocations)
}

// Methods

const postLocation = async (req, res) => {
    const locations = Array.isArray(req.body) ? req.body : [req.body]
    const existingLocations = locations.filter(location => location.hasOwnProperty('id'))
    const newLocations = locations.filter(location => !location.hasOwnProperty('id'))
    const success = []
    const errored = []
    // Handle existing locations
    try {
        await Promise.all(existingLocations.map(async location => {
            const updatedLocation = await Location.findOneAndUpdate(
                { _id: location.id }, 
                location
            )
            await updatedLocation.save(
                (err, location) => {
                    if (err) {
                        errored.push({
                            name: location.name,
                            message: err.message
                        })
                    } else {
                        success.push(location.name)
                    }
                }
            )
        }))
    } catch (e) {
        res.status(400).send("Error when saving to database");
    }
    // Bulk create new locations
    try {
        await Location.create(
            newLocations,
            (err, locations) => {
                if (err) {
                    newLocations.forEach(location => {
                        errored.push(JSON.stringify({
                            name: location.name,
                            message: err.message
                        }))
                    })
                } else {
                    locations.forEach(location => {
                        success.push(location.name)
                    })
                }
                res.status(200).send({ 
                    'success': success.join(', '), 
                    'errors': errored.join(', ') 
                })
            }
        )
    } catch (e) {
        res.status(400).send("Error when saving to database");
    }
}

const getLocation = async (req, res) => {
    const location = await Location.findById(req.params.id)
    res.status(200).json({ 'location': location })
}

const getAllLocations = async (req, res) => {
    const locations = await Location.find({ active: true })
    res.status(200).json({ 'locations': locations })
}
