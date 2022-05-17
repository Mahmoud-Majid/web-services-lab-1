const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const hateoasLinker = require("express-hateoas-links");

connectDB();
const app = express();

app.use(express.json());
app.use(hateoasLinker);

app.use("/api/articles", require("./routes/article"));
app.use("/api/users", require("./routes/user"));
app.use("/api/comments", require("./routes/comment"));

app.get("/", function (req, res) {
  var personSchema = {
    name: "majid",
    description:
      "This JSON Schema defines the parameters required to create a Person object",
    properties: {
      name: {
        title: "title",
        description: "mahmoud majid",
        type: "string",
        maxLength: 30,
        minLength: 1,
        required: true,
      },
      jobTitle: {
        title: "Job Title",
        type: "string",
      },
      telephone: {
        title: "Telephone Number",
        description: "Please enter telephone number including country code",
        type: "string",
        required: true,
      },
    },
  };

  res.json(personSchema, [
    { rel: "self", method: "GET", href: "http://127.0.0.1" },
    {
      rel: "create",
      method: "POST",
      title: "Create Person",
      href: "http://127.0.0.1/person",
    },
  ]);
});

app.listen(5555, () => console.log(`Server started on port 5555`));
