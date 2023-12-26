require("dotenv").config();

import config from "config";
import initApp from "./app";

initApp().then((app) => {
  const port = config.get<number>("port");
  app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
  });
});
