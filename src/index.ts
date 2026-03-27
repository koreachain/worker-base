export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response("Method Not Allowed", { status: 405 });
  },
} satisfies ExportedHandler<Env>;
