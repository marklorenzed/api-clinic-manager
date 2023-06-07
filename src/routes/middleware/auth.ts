import { User, createClient } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || "";
// const supabaseServiceKey = process.env.PRIVATE_SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// const supabaseSecret = createClient(supabaseUrl, supabaseServiceKey);

export interface AuthRequest extends Request {
  user?: User;
}

const auth = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const jwt = request.headers.authentication;
  if (!jwt) {
    return response.status(401).send({
      error: "Access denied. No token provided",
    });
  }

  try {
    if (typeof jwt === "string") {
      const { data: user } = await supabase.auth.getUser(jwt);
      if (user?.user) request.user = user.user;
    }
  } catch (error) {
    return response.status(401).send({
      error: "Token expired",
    });
  }

  next();
};

export default auth;
