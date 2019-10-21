//const { exec } = require('child_process');

const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

function aa() {
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
}
function finished() {
  ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
}

function hello() {
  exec('echo .\\asd\\a.txt', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

}

aa()
finished()
