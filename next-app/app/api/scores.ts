import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '@/prisma/prisma';
import { score } from '@/types/score';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log("Hi")

  if (req.method === 'POST') {
    const newScore: score = req.body;

    try {
      await Prisma.score.create({
        data: newScore,
      });
      res.status(200).json({ message: 'Score created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {

    try {
      const scores = await Prisma.score.findMany()
      res.status(200).json({ scores: scores });
    } catch (error) {
      res.status(500).json({ error: 'Error creating score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

}