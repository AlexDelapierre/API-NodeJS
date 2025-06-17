const http = require('http');
const app = require('./app');
const { connectToDatabase } = require('./config/database');

const normalizePort = val => {
  const port = parseInt(val, 10);
   
  // if (isNaN(port)) {
  //   return val;
  // }
  // if (port >= 0) {
  //   return port;
  // }
  // return false;
  
  // opérateur ternaire imbriqué (équivalent du if)
  return isNaN(port) ? val : port >= 0 ? port : false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Connexion à MongoDB et lancement du serveur
connectToDatabase()
  .then(() => {
    server.listen(port);
  })
  .catch((error) => {
    console.error('❌ Impossible de démarrer le serveur (connexion DB échouée) :', error);
  });