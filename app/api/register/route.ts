import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password)
      return new NextResponse("Missing fields", { status: 400 });

    // Hash του κωδικού
    const hashedPassword = await bcrypt.hash(password, 12);

    // SQL Query
    const result = await query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email",
      [email, hashedPassword, name],
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    // Ελέγχουμε αν το error είναι αντικείμενο και έχει κωδικό Postgres
    if (error instanceof Error) {
      return new NextResponse("Email already exists", { status: 400 });
    }
    return new NextResponse("Error creating user", { status: 500 });
  }
}
