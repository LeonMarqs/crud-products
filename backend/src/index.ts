import express from 'express';
import { addEditProduct, getProduct, getProducts, removeProduct, login, logout, verifyJWT } from './routes';
const cors = require("cors");

//API
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080; // Se você quiser, pode escolher uma porta através da variável de ambiente PORT

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});

app.post('/login', login);
app.post('/logout', logout); // Rota ilustrativa

app.get('/products', verifyJWT, getProducts);
app.get('/products/:id', verifyJWT, getProduct);

app.post('/products', verifyJWT, addEditProduct);
app.delete('/products/:id', verifyJWT, removeProduct);