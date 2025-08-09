import express from "express";
import bodyParser from "body-parser";
import db from "./utils/database";

async function init() {
  try {
    const PORT = 3000;
    const result = await db();
    console.log("Database status : ", result);

    const app = express();

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is runnning!",
        data: null,
      });
    });

    app.use(bodyParser.json());

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init()