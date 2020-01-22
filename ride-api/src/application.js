const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const db = require("./db");

// files for sellmyride
////////////////////////////////////
const listing = require("./routes/listing");
const cars = require("./routes/cars");
const car_images = require("./routes/car_images");
const messages = require("./routes/messages");
const users = require("./routes/users");
const makeModel = require("./routes/makeModel");
////////////////////////////////////

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(ENV) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  // paths for sellmyride
  ////////////////////////////////////////
  app.use("/api", listing(db));
  app.use("/api", cars(db));
  app.use("/api", car_images(db));
  app.use("/api", messages(db));
  app.use("/api", users(db));
  app.use("/api", makeModel(db));
  ////////////////////////////////////////

  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function() {
    return db.end();
  };

  return app;
};
