import dotenv from 'dotenv';
import app from './index';

dotenv.config();

const PORT = Number(process.env.PORT) || 5009;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});