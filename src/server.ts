require("dotenv").config();

import config from "config";
import initApp from "./app";
import https from 'https'
import fs from 'fs';
import path from "path";

initApp().then(app => {
  const port = config.get<number>('port');
  const rootPath = path.join(__dirname, '../../../Blend App Certs')
  const certPath = path.join(rootPath, 'client-cert.pem');
  const keyPath = path.join(rootPath, 'client-key.pem');
  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  }
  
  https
    .createServer(httpsOptions, app)
    .listen(port, () => {
      console.log(`Server started on: https://localhost:${port}`);
    });
})