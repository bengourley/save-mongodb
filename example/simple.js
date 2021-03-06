var Db = require('mongodb').Db // npm install mongodb
  , Server = require('mongodb').Server
  , save = require('save') // npm install save
  , saveMongodb = require('..')

  // Create a db object to a local mongodb database called SimpleExample.
  , db = new Db('test', new Server('127.0.0.1', 27017, {}) , { fsync: true, w: 1 })

// Open your mongodb database.
db.open(function (error, connection) {

  // Get a collection. This will create the collection if it doesn't exist.
  connection.collection('contact', function (error, collection) {

    // Create a save object and pass in a mongodb engine.
    var contactStore = save('Contact', { engine: saveMongodb(collection) })

    // Then we can create a new object.
    contactStore.create({ name: 'Paul', email: 'paul@serby.net' }, function (error, contact) {

      // The created 'contact' is returned and has been given an _id
      console.log(contact)

      // Don't forget to close your database connection!
      connection.close()
    })

  })
})
