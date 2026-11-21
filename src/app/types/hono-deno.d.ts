declare module "npm:hono" {
  export * from "hono";
}

declare module "npm:hono/cors" {
  export * from "hono/cors";
}

declare module "npm:hono/logger" {
  export * from "hono/logger";
}

declare module "jsr:@supabase/supabase-js" {
  export const createClient: any;
}

declare module "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.8" {
  export const createClient: any;
}

declare module "https://esm.sh/@supabase/supabase-js@2.49.8" {
  export const createClient: any;
}

declare const Deno: any;
