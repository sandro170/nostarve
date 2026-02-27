const { spawn } = require('child_process');
const path = require('path');

const startProcess = (command, args, cwd, name) => {
  const process = spawn(command, args, { cwd, shell: true });

  process.stdout.on('data', (data) => console.log(`${name}: ${data.toString()}`));
  process.stderr.on('data', (data) => console.error(`${name} Error: ${data.toString()}`));
  process.on('close', (code) => console.log(`${name} process exited with code ${code}`));
};

startProcess('node', ['app.js'], path.join(__dirname, 'backend'), 'Backend');
startProcess('node', ['compiled/server.js'], path.join(__dirname, 'frontend'), 'Frontend');