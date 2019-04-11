const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  '/ratings_ambience/:id',
  proxy({ target: 'http://localhost:3001/', changeOrigin: true })
);

app.use(
  '/reviews/:id',
  proxy({ target: 'http://localhost:3002/', changeOrigin: true })
);

app.use(
  '/restaurants/:id',
  proxy({ target: 'http://localhost:3003/', changeOrigin: true })
);

app.use(
  '/menus/:id',
  proxy({ target: 'http://localhost:3004/', changeOrigin: true })
);

app.get('/:id', function(req, res){
  res.sendFile(path.join(__dirname + `/public/index.html`));
});

app.listen(port, () => {
  console.log(`server running at: ${port}`);
});