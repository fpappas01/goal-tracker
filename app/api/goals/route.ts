import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session?.user?.id;

  try {
    const result = await query(
      "SELECT * FROM items WHERE user_id = $1 ORDER BY target_date ASC",
      [userId],
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { description, targetDate } = await req.json();
    const userId = session?.user?.id;

    const result = await query(
      "INSERT INTO items (description, target_date, user_id) VALUES ($1, $2, $3) RETURNING *",
      [description, targetDate, userId],
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 },
    );
  }
}
