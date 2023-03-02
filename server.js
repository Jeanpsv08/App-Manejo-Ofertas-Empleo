const express = require('express');
require('./server/config/mongoose.config');
const cors = require('cors');
const app = express();
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const allUserRoutes = require('./server/routes/offer.routes');
allUserRoutes(app);

app.listen(port, () => {
    console.log("Server listening at port", port);
})
