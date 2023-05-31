import { createClient } from "@supabase/supabase-js";
import type { Request, Response } from "express";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || "";
// const supabaseServiceKey = process.env.PRIVATE_SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// const supabaseSecret = createClient(supabaseUrl, supabaseServiceKey);

export default async function (request: Request, response: Response) {
  const jwt = request.headers.authentication;
  let id;
  if (typeof jwt === "string") {
    const { data: user } = await supabase.auth.getUser(jwt);
    id = user.user.id;
  }

  return id;
}
