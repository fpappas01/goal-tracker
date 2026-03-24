import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Ορίζουμε ένα interface για το σφάλμα της βάσης δεδομένων
interface DbError extends Error {
  code?: string;
}

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password)
      return new NextResponse("Missing fields", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email",
      [email, hashedPassword, name],
    );

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    // Χρησιμοποιούμε unknown αντί για any
    console.error("Registration Error:", error);

    // Ελέγχουμε αν το error έχει το property 'code' (τυπικό για Postgres)
    if (typeof error === "object" && error !== null && "code" in error) {
      const dbError = error as DbError;

      // Κωδικός 23505 = Unique Violation στην PostgreSQL
      if (dbError.code === "23505") {
        return new NextResponse("Email already exists", { status: 400 });
      }
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
