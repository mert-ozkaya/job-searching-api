const fs = require('fs')

module.exports = function(req,res) {
  //req.data.executable_path
  //req.data.source_path

  fs.unlink(req.data.source_path, (err) => {
    if (err) throw err;
    console.log('successfully deleted ./c-source-code/');
  })

  fs.unlink(req.data.executable_path, (err) => {
    if (err) throw err;
    console.log('successfully deleted ./c-source-code/');
  })

  res.send("Bittiiii silindiii ")

}
