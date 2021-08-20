const express = require("express"); // for building rest api
const cors = require("cors"); // provides Express middleware to enable CORS with various options

const app = express();
const db = require("./models");

app.use(cors());
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// add Access Control Allow Origin headers
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// simple route
app.get("/", (request, response) => {
    response.json({ message: "Hello" });
});

require("./routes/letter.routes")(app);
require("./routes/category.routes")(app);
require("./routes/grammar.routes")(app);

// set port, listent for resquests 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});