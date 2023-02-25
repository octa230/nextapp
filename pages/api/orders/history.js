import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  const { user } = session;
  await db.connect();
  console.log(user._id);
  const orders = await Order.find({ user: user._id });
  res.send(orders);
};

export default handler;