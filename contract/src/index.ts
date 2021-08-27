import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { compiled } from './compile';

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

console.log(compiled);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});