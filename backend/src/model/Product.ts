import { Request, Response } from "express";
import { db } from '../db';
import { stringToArray, arrayToStringWithDash } from '../utils/stringTranformations';

const instrumentRef = db.collection('instruments');

export default class Product {

  async readAll(req: Request, res: Response) {
    let data: Array<object> = [];

    const snapshot = await instrumentRef.get();

    snapshot.forEach(doc => {
      let dataObj = doc.data();
      dataObj.id = doc.id;
      data.push(dataObj);
    });

    return res.json(data);
  }

  async read(req: Request, res: Response) {
    const id = req.params.id;
    const instrument = await instrumentRef.doc(id).get();
    if(!instrument.exists) {
      res.status(404).send("Instrument not found!");
    }
    let data = instrument.data();
    data.id = instrument.id;
    res.json(data).status(200);
  }

  async create(req: Request, res: Response) {
    const { name, imageUrl, price } = req.body;
    
    if(!name || !imageUrl || !price) {
      return res.status(406).send('Invalid format! \nAccepted format: {name, price, imageUrl}');
    };

    const nameSplit = stringToArray(name);
    const nameDash = arrayToStringWithDash(nameSplit);

    const newInstrument = instrumentRef.doc(nameDash);
    await newInstrument.set({
      name,
      price,
      imageUrl,
    });

    res.status(201).send('Instrument added!');
  }

  // Rota utilizada caso eu não tivesse optado por utilizar a do "add" para editar também
  // async update(req: Request, res: Response) {
  //   const id = req.params.id;
  //   const { name, price } = req.body;
  //   const instRef = await instrumentRef.doc(id).get();

  //   if(!instRef.exists) {
  //     return res.status(404).send("Instrument not found!");
  //   }

  //   await instrumentRef.doc(id).update({
  //     name,
  //     price
  //   }, {merge: true});
  //   res.send('Instrument updated!');
  // }

  async remove(req: Request, res: Response) {
    const id = req.params.id;
    const data = await instrumentRef.doc(id).get();
    await instrumentRef.doc(id).delete();

    if(!data.data()) {
      return res.status(404).send("Instrument not found!");
    }
    res.status(200).send('Instrument removed!');
  }

}
