import express from 'express';
import spelersRouter from './routes/spelers.js'; // let op: .js als je ES modules gebruikt

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use('/spelers', spelersRouter);

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
