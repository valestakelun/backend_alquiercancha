import Server from './src/server/config.js'
import router from './src/routes/canchas.routes.js';

const server = new Server();

//agreando rutas
server.app.use('/api', router);

server.listen();