import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(req: Request) {
  const token = req.headers.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) {
    return NextResponse.json(
      { error: error?.message || "Invalid token" },
      { status: 401 }
    );
  }
  const { data, error: dbError } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const token = req.headers.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) {
    return NextResponse.json(
      { error: error?.message || "Invalid token" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { name, description } = body;

  const payload = { name: name, description: description, user_id: user.id };
  const { data, error: dbError } = await supabase
    .from("playlists")
    .insert([payload])
    .select()
    .single();
  if (dbError) {
    return NextResponse.json({ error: dbError?.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
