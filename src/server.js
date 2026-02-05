const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { port } = require('./config/env');
const { notFound, globalErrorHandler } = require('./middleware/error');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, 'frontend')));

app.use(notFound);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`HMS server running on http://localhost:${port}`);
});
