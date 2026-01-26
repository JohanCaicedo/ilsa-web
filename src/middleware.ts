// Middleware to ensure globals are patched before any request handling
import "./lib/shim";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    // The import above side-effects the shim installation
    return next();
});
