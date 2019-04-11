const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.use(
//   '/:restaurantId',
//   proxy({ target: 'http://localhost:3001/', changeOrigin: true })
// );
app.use(
  '/ratings_ambience/:id',
  proxy({ target: 'http://localhost:3002/', changeOrigin: true })
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

app.listen(port, () => {
  console.log(`server running at: :${port}`);
});

app.get('/:id', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});