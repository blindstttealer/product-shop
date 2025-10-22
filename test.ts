import { Response, Request, NextFunction } from "express";
import express from 'express'
const handlebars = require('express-handlebars');
import * as fs from 'fs';
import * as path from 'path';
import { Writable } from "stream";
const morgan = require('morgan')
const app = express();
const request = require('request')


const host = '127.0.0.1';
const port = 7000;


app.engine(
    'handlebars',
    handlebars.engine({ defaultLayout: 'custom-layout' })
);
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/sss', (req: Request, res: Response) => {

    request('https://jsonplaceholder.typicode.com/todos', (err: any, response: any, body: any) => {
            
        if(err) {
            res.status(500)
            res.type('application/json')
            res.send(`<h1> Упала 500 ошибочка </h1>`)
        }

        return res.send(body)

    })

    
});

app.get('/home', (req: Request, res: Response) => {
    res.render('custom', {
      title: 'custom Title!!!',
      body: 'custom Body',
    })
})

const logsDirectionPath = path.resolve(path.join(__dirname, 'logs'))
const logsFilePath = path.resolve(path.join(logsDirectionPath, 'my-logs.txt'))


fs.mkdir(logsDirectionPath, { recursive: true }, () => {
  const customStream = new Writable({
    write(chunk, encoding, callback) {
      const logLine = chunk.toString();
      
      fs.appendFile(logsFilePath, logLine, (err) => {
        if (err) return callback(err);

        fs.readFile(logsFilePath, 'utf8', (err, data) => {
          if (err) return callback(err);

          const logsCount = data.trim().split('\n').length;

          if (logsCount >= 5) {
            fs.writeFile(logsFilePath, '', 'utf8', () => {
              console.log('Файл очищен (10+ строк)');
              callback();
            });
          } else {
            callback();
          }
        });
      });
    }
  });

  app.use(morgan('combined', { stream: customStream }));
});





const mongoose = require('mongoose');
const uri = "mongodb+srv://slavapetrovskijgg:gOIXZ4sXp5ejfLmb@cluster0.ic4dfwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

    

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});





 


