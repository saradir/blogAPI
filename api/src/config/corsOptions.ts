

const origins = (process.env.CORS_ORIGINS || "")
                .split(",")
                .map(s => (s.trim()))
                .filter(s => s);
export const corsOptions = {
  origin: origins,
  optionsSuccessStatus: 200
};
