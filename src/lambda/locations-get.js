// Load the server
import db from './server'

// Load the Location Model
import Location from './models/location'

exports.handler = async (event, context, callback) => {
    // What does this do?
    // context.callbackWaitsForEmptyEventLoop = false

    try {
        const locations = await Location.find({ active: true })
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ 'locations': locations })
        })
    } catch (err) {
        console.log('locations-get', err) // output to netlify function log
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ msg: err.message })
        })
    }
}