import Server from "lume/core/server.ts";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' https://giscus.app",
  "style-src 'self' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "frame-src https://giscus.app",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": contentSecurityPolicy,
  "X-Frame-Options": "DENY",
  "Cross-Origin-Opener-Policy": "same-origin",
} as const;

const server = new Server({ root: `${Deno.cwd()}/_site` });

server.use(async (request, next) => {
  const response = await next(request);
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});

server.start();
