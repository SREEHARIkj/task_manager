import { Server as SocketServer } from 'socket.io';

const configureSocketIO = (server: Express.Application) => {
  const io = new SocketServer(server, {
    cors: {
      origin: '*', // TODO: Restrict to actual frontend URL once it's set up
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Define other socket events and handlers here
  });
};

export default configureSocketIO;
