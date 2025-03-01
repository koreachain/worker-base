export default {
  async fetch(request, env) {
    // Serve HTML form on GET requests
    if (request.method === "GET") {
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Image Generator</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; }
            form { max-width: 300px; }
            label, input { display: block; width: 100%; margin-bottom: 1rem; }
          </style>
      </head>
      <body>
          <h1>Generate Image</h1>
          <form method="POST">
              <label for="token">Token:</label>
              <input type="password" id="token" name="token" required>

              <label for="prompt">Prompt:</label>
              <input type="text" id="prompt" name="prompt" required>

              <button type="submit">Generate</button>
          </form>
      </body>
      </html>
      `;
      return new Response(html, {
        headers: { "content-type": "text/html" },
      });
    }

    // Process form submission on POST requests
    if (request.method === "POST") {
      let formData;
      try {
        formData = await request.formData();
      } catch (err) {
        return new Response("Invalid form data", { status: 400 });
      }

      const token = formData.get("token");
      const prompt = formData.get("prompt");

      // Validate token
      const expectedToken = env.TOKEN;
      if (!token || token !== expectedToken) {
        return new Response("Unauthorized", { status: 401 });
      }

      if (!prompt) {
        return new Response("Missing prompt", { status: 400 });
      }

      const inputs = { prompt };

      // Run the image generation using Stability AI
      const aiResponse = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs
      );

      return new Response(aiResponse, {
        headers: {
          "content-type": "image/png",
        },
      });
    }

    return new Response("Method Not Allowed", { status: 405 });
  },
} satisfies ExportedHandler<Env>;
