// src/index.js
export default {
    async fetch(request, env) {
        // This is a public URL for a text file to test with.
        const targetUrl = "https://raw.githubusercontent.com/rust-lang/rust/master/README.md";

        try {
            // Use the built-in fetch API to get the content of the file.
            const response = await fetch(targetUrl);

            if (!response.ok) {
                return new Response(`Failed to fetch URL: ${response.statusText}`, { status: response.status });
            }

            const codeContent = await response.text();

            // Put the scraped code into your KV store, using the URL as a unique key.
            await env.bug_ai_engine.put(targetUrl, codeContent);

            return new Response(`Successfully scraped and saved content from ${targetUrl} to Workers KV.`);
        } catch (error) {
            return new Response(`An error occurred: ${error.message}`, { status: 500 });
        }
    },
};