const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();
const os = require('os');

eventEmitter.on('start', number => {
    console.log(`started ${number}`);
    console.log(os.cpus().map(cpu => `${cpu.model} ${cpu.speed}`));
  });
  
  eventEmitter.emit('start', 23);
  