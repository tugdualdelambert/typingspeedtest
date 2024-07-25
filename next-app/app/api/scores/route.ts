import { score } from "@/types/score";
import Prisma  from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const newScore: score = await req.json();

  try {
    await Prisma.score.create({
      data: newScore,
    });
    return NextResponse.json({ message: 'Score created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating score' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const scores = await Prisma.score.findMany();
    return NextResponse.json({ scores: scores }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving scores' }, { status: 500 });
  }
}