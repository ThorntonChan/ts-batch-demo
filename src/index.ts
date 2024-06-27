import * as dotenv from 'dotenv';
import express from 'express';
import router from './controller/routes';

dotenv.config();

const app = express();
const port = process.env.NODE_ENV === 'test' ? 0 : 8000;

app.use(express.json());
app.use(router);

let server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { server };
