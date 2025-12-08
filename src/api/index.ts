// src/api/index.ts
import { db } from "ponder:api";
import { newsCard } from "ponder:schema";
import schema from "ponder:schema";
import { Hono } from "hono";
import { client, graphql } from "ponder";

const app = new Hono();

// Jangan pakai "/health" karena sudah dipakai Ponder internal
app.get("/healthz", (c) => c.json({ status: "ok" }));

// GET semua news_card
app.get("/news_card", async (c) => {
    const rows = await db.select().from(newsCard);
    return c.json(rows);
});

// GET satu news_card by id
app.get("/news_card/:country", async (c) => {
    const id = Number(c.req.param("id"));
    if (Number.isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }

    const rows = await db.select().from(newsCard);
    const row = rows.find((r) => r.id === id);

    if (!row) return c.json({ error: "Not found" }, 404);
    return c.json(row);
});

// Optional: GraphQL auto-generated
app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

// Optional: SQL over HTTP (dipakai @ponder/client)
app.use("/sql/*", client({ db, schema }));

export default app;
