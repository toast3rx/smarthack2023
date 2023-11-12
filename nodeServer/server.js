const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path : './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
const LOCAL_DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
  console.log("successfuly connected to the DB");
});

///4) Start the server
const port = 8000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

