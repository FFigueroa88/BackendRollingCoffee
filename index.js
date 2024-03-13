import express from 'express';
import 'dotenv/config'; //permite procesar variables de entorno
import cors from 'cors';
import morgan from 'morgan';
import productrosRouter from './src/routes/productos.routes.js';
import path from 'path';
import {fileURLToPath} from 'url';
console.log("hola mundo 2")

//1- configurar un puerto 
const app = express();
app.set('port',process.env.PORT || 4000);
app.listen(app.get('port'),()=>{
    console.log('Estoy en el puerto '+app.get('port'))
})

//2- configurar middleware
app.use(cors());//permite conexiones remotas
app.use(morgan('dev'));// nos da inforamcion extra en la terminal
app.use(express.json());// permite interpretar los datos en formato json
app.use(express.urlencoded( {extended:true} ));// ayuda a interpretar los datos del body del request
const ___filename = fileURLToPath(import.meta.url);

const ___dirname = path.dirname(___filename);

console.log(___filename);
console.log(___dirname);
app.use(express.static(path.join(___dirname,'/public')));
//3- configurar las rutas
//app.get('/nuevo/producto', (req,res)=> { 
//    console.log('aqui obtener la lista de todos los productos');
//    res.send('Aqui enviaremos la lista de productos');
//})

app.use('/api', productrosRouter)
