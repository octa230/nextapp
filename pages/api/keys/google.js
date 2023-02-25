import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  res.send(process.env.GOOGLE_API_KEY || 'nokey');
};

export default handler;
