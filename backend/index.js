const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbconnection = require('./dbconnection');
const userinputroute = require('./Routes/userinputroute');
const app = express();

dotenv.config();

let port = process.env.PORT ? parseInt(process.env.PORT) : 2000;

if (isNaN(port)) {
  console.log("Invalid port number");
  port = 2000;
}

app.use(cors({
  origin: 'http://localhost:5173'
}))
dbconnection();
app.use(express.json());
app.use('/api/userinput', userinputroute);

app.get('/', (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("Server is running at port", port);
});
