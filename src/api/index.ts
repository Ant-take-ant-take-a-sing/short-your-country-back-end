// src/api/index.ts
import { db } from "ponder:api";
import schema, { newsCard } from "ponder:schema";
import { Hono } from "hono";
import { graphql, client as sqlClient } from "ponder";

const app = new Hono();

// -------------------------
// Health check
// -------------------------
app.get("/healthz", (c) => c.json({ status: "ok" }));

// -------------------------
// NewsCard endpoints
// -------------------------
app.get("/news_card", async (c) => {
    const rows = await db.select().from(newsCard);
    return c.json(rows);
});

app.get("/news_card/:id", async (c) => {
    const id = c.req.param("id"); // ✅ STRING

    const rows = await db.select().from(newsCard);
    const row = rows.find((r) => r.id === id);

    if (!row) return c.json({ error: "Not found" }, 404);
    return c.json(row);
});

// -------------------------
// GraphQL & SQL endpoints
// -------------------------
app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));
app.use("/sql/*", sqlClient({ db, schema }));

export default app;
