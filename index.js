const package = require('./package')

const PORT = process.env.port || 3000;

  console.log('name:', package.name);
  console.log('version:', package.version);
  console.log('port:', PORT);



    // create express app and start
    const app = require('./app')

    app.listen(PORT, function() {
      console.log('App has started.');
    });
