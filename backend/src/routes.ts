import express from 'express';
import Product from './model/Product';
import { jwtadmin } from './db';

//JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

// Routes
const app = express();
app.use(express.json());

let instrument = new Product();

export function login(req: express.Request, res: express.Response)  {
  //esse teste abaixo está sendo feito estaticamente
  if(req.body.user === jwtadmin.user && req.body.pwd === jwtadmin.pwd){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 600 // expira em 10min
    });
    return res.json({ auth: true, token: token });
  }
  
  res.status(406).json({message: 'Invalid login!'});
};

export function logout(req: express.Request, res: express.Response) {
  res.json({ auth: false, token: null });
};

export async function getProducts(req: express.Request, res: express.Response) {

  instrument.readAll(req, res);
  
};

export async function getProduct (req: express.Request, res: express.Response) {
  
  instrument.read(req, res);
};

export async function addEditProduct (req: express.Request, res: express.Response) {
  
  instrument.create(req, res);
};

export async function removeProduct(req: express.Request, res: express.Response) {
  
  instrument.remove(req, res);
};

export function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}
