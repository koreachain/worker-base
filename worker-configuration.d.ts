// Add bindings to `wrangler.jsonc` and regenerate via `npm run cf-typegen`

interface Env extends Cloudflare.Env {
    PLACEHOLDER: never;
}
