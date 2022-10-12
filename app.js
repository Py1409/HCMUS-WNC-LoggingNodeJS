import express from 'express';
import morgan from 'morgan';

import filmRouter from './routes/film.route.js';
import actorRouter from './routes/actor.route.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.json({
    msg: 'API Validation'
  });
});

app.use('/api/films', filmRouter);
app.use('/api/actors', actorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`API Validation is listening at http://localhost:${PORT}`);
});