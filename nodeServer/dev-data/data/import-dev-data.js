const fs = require('fs');
const Tour = require('./../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path : './../../config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
  console.log("successfuly connected to the DB");
  handleInput();
});

const handleInput = () => {
    if (process.argv.length < 3) {
        mongoose.disconnect();
        return console.log('Please run the script with the argument being the operation: --import | --delete');
    }
    
    switch (process.argv[2]) {
        case '--import':
            importData();
            break;
        case '--delete':
            deleteData();
            break;
        default:
            console.log("invalid operation ( --import || --delete )");
            mongoose.disconnect();
            break;
    }
}

const importData = async () => {
    const documents = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
    await Tour.create(documents);
    console.log("Files added to the DB");
    mongoose.disconnect();
};

const deleteData = async() => {
    await Tour.deleteMany();
    console.log("theoretically deleted them");
    mongoose.disconnect();
};
