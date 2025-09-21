import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json(
      { error: authError?.message || "Invalid token" },
      { status: 401 }
    );
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing trackId" }, { status: 400 });
  }

  const { data, error: dbError } = await supabase
    .from("playlist_tracks")
    .delete()
    .eq("id", id)
    .select();
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Track deleted", track: data });
}
