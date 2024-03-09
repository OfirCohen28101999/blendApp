require("dotenv").config();

import initApp from "./app";
import https from 'https'
import fs from 'fs';
import path from "path";
import http from "http";

initApp().then(app => {
  const port = process.env.PORT;
  if (process.env.NODE_ENV !== 'production') {
    console.log('DEVELOPMENT');
    http.createServer(app).listen(port, () => {
      console.log(`Server started on: http://localhost:${port}`);
    });
  } 
  else {
    console.log('PRODUCTION');
    const rootPath = path.join(__dirname, '../../../')
    const certPath = path.join(rootPath, 'client-cert.pem');
    const keyPath = path.join(rootPath, 'client-key.pem');
    const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  }
  https
    .createServer(httpsOptions, app)
    .listen(port, () => {
      console.log(`Server started on: https://10.10.248.181:${port}`);
    });
  }
})