import app from './app.js';
import { initDb } from './db/index.js';

const PORT = Number(process.env.PORT) || 3000;

// Initialize Database
initDb();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
