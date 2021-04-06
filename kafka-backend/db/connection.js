const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:v3FFvVIETswREvop@cluster0.srsoi.mongodb.net/splitwise?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('successfully connected to the database');
}).catch((err) => {
  console.log(`error connecting to the database: ${err}`);
  process.exit();
});

module.exports = mongoose;
