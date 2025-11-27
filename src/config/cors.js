import "dotenv/config"

const allowedOrigin =  [
    process.env.FRONTEND_URL
];

export const corsConfig = {
    origin: function (origin, callback) {
      if (allowedOrigin.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }, 
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}