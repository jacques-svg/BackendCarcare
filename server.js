//require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRoutes')


// this takes the post body
app.use(cors({}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/',apiRouter)

app.listen(PORT, () => console.log(` app listening on port ${PORT}!`));
