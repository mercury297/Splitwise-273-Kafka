const mongoose = require('mongoose');

// const { Admin } = mongoose.mongo;

mongoose.connect('mongodb+srv://root:v3FFvVIETswREvop@cluster0.srsoi.mongodb.net/splitwise?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // const nativeConn = MongooseNode.connections[0];
  // new Admin(nativeConn.db).listDatabases((err, results) => {
  //   console.log(results); // store results and use
  // });
  console.log('successfully connected to the database');
}).catch((err) => {
  console.log(`error connecting to the database: ${err}`);
  process.exit();
});

module.exports = mongoose;
