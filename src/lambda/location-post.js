// Load the server
import db from './server'

// Load the Location Model
import Location from './models/location'

exports.handler = async (event, context, callback) => {
    // What does this do?
    context.callbackWaitsForEmptyEventLoop = false

    try {
        const body = JSON.parse(event.body)
        const locations = Array.isArray(body) ? body : [body]
        const existingLocations = locations.filter(location => location.hasOwnProperty('id'))
        const newLocations = locations.filter(location => !location.hasOwnProperty('id'))
        const success = []
        const errored = []

        // Handle existing locations
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

            if (newLocations.length === 0) {
                callback(null, {
                    statusCode: 201,
                    body: JSON.stringify({
                        'success': success.join(', '),
                        'errors': errored.join(', ')
                    })
                })
            }
        }))

        // Bulk create new locations
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
                callback(null, {
                    statusCode: 201,
                    body: JSON.stringify({
                        'success': success.join(', '),
                        'errors': errored.join(', ')
                    })
                })
            }
        )
    } catch (err) {
        console.log('location.create', err) // output to netlify function log
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ msg: err.message })
        })
    }
}