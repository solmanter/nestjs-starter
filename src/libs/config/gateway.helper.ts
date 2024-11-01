import "dotenv/config";

export const GatewayPort = parseInt(process.env.GATEWAY_PORT) || 3300;

export const GatewaySetup = {
  transports: ['websocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
};