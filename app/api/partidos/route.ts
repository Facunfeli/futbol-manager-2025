import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export async function GET() {
  try {
    const partidos = await db.select().from(schema.partidos);
    return NextResponse.json(partidos);
  } catch (error) {
    console.error("Error fetching partidos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
