var admin = require("firebase-admin");
require("dotenv-safe").config();

var serviceAccount = require("../" + process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();

// Usuário e senha para acessar o JWT 
export const jwtadmin = {
  user: process.env.USER_JWT,
  pwd: process.env.PWD_JWT
}