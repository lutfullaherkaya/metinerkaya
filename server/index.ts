import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const izlenenler = require('./services/youtube-gecmisi/youtube-gecmisi.json')
const reader = require('xlsx')

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors()); // todo: sil. deneme için. proxy çalışmadı vue.config.js'deki.
app.use(express.static('../client/dist'));



app.get('/izlenenler', (req: Request, res: Response) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(izlenenler));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
