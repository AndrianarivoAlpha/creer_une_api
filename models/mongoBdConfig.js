const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://127.0.0.1:27017/node_api_yt",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (!err) console.log("MongoDb connected");
    else console.log("Connection error : " + err)
  }
)