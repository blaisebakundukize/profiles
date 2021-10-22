import http from 'http';
import { app } from '.';

(async () => {
  const port = process.env.PORT || 5000;

  const server = http.createServer(app);

  server.listen(port, () => console.info(`⚡️ Server is running at http://localhost:${port}`));
})();
