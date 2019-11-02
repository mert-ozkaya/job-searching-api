const MongoClient = require('mongodb').MongoClient
const package = require('./package')
const settings = require('./settings');

const PORT = process.env.port || settings.port;

  console.log('name:', package.name);
  console.log('version:', package.version);
  console.log('port:', PORT);



  MongoClient.connect(settings.db.url, settings.db.options, function(err, client) {
    if(err){
      console.log('Could not connect to database!', err);
      process.exit(1);
    }

    console.log('Connected to database.');
    const db = client.db(settings.db.name);

    // create express app and start
    const app = require('./app')
    app.set('DB', db); // set the db connection
    app.listen(PORT, function() {
      console.log('App has started.');
    });
  });
