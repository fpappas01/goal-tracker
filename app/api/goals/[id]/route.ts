import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await query("DELETE FROM items WHERE id = $1 AND user_id = $2", [
      id,
      session.user.id,
    ]);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { description, targetDate } = await req.json();
    const userId = session.user.id;
    const itemId = id;

    // Ενημέρωση στη βάση δεδομένων
    const result = await query(
      "UPDATE items SET description = $1, target_date = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [description, targetDate, itemId, userId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Goal not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update goal" },
      { status: 500 },
    );
  }
}
