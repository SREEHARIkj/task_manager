import { Server as SocketServer } from 'socket.io';
import { getRandomColor } from '../utils/randomColor.js';

interface UserAndPointerDetails {
  id: string;
  mousePosition: { x: number | null; y: number | null };
  color: string;
  isDragActive: boolean;
}

const configureSocketIO = (server: Express.Application) => {
  const io = new SocketServer(server, {
    cors: {
      origin: '*', // TODO: Restrict to actual frontend URL once it's set up
    },
  });

  let userAndPointerDetails: UserAndPointerDetails[] = [];
  io.on('connection', (socket) => {
    console.log('A user connected');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    socket.join('room1');

    socket.on('mousePointerLocation', (positionData: UserAndPointerDetails) => {
      const existingUserIndex = userAndPointerDetails.findIndex((data) => data.id === positionData.id);
      if (existingUserIndex !== -1) {
        userAndPointerDetails[existingUserIndex] = {
          ...userAndPointerDetails[existingUserIndex],
          mousePosition: {
            x: positionData.mousePosition?.x ?? 0,
            y: positionData.mousePosition?.y ?? 0,
          },
        };
      } else {
        userAndPointerDetails.push({ ...positionData, color: getRandomColor() });
      }

      io.to('room1').emit('userAndPointers', userAndPointerDetails);
    });

    socket.on('disconnect', () => {
      userAndPointerDetails = [];
      console.log('User disconnected');
    });

    // Define other socket events and handlers here
  });
};

export default configureSocketIO;
