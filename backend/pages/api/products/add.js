import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, price, quantity } = req.body;
    try {
      const newProduct = await Product.create({ name, price, quantity });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
