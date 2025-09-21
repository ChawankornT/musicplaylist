import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(req: Request) {
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

  const url = new URL(req.url);
  const playlist_id = url.searchParams.get("playlist_id");
  if (!playlist_id) {
    return NextResponse.json({ error: "Missing playlist_id" }, { status: 400 });
  }

  const { data, error: dbError } = await supabase
    .from("playlist_tracks")
    .select("*")
    .eq("playlist_id", playlist_id);
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  const tracks = data.map((track) => ({
    id: track.id,
    trackId: track.track_id,
    trackName: track.track_title,
    artistName: track.artist_name,
    artworkUrl100: track.artwork_url,
    previewUrl: track.preview_url,
  }));

  return NextResponse.json(tracks);
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
  const { playlist_id, track } = body;
  const payload = {
    playlist_id: playlist_id,
    track_id: track.trackId,
    track_title: track.trackName,
    artist_name: track.artistName,
    artwork_url: track.artworkUrl100,
    preview_url: track.previewUrl,
  };

  const { data, error: dbError } = await supabase
    .from("playlist_tracks")
    .insert([payload])
    .select()
    .single();
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 501 });
  }
  return NextResponse.json(data);
}
