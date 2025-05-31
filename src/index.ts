export default {
  async fetch(request, env) {
    return new Response("Method Not Allowed", { status: 405 });
  },
} satisfies ExportedHandler<Env>;
