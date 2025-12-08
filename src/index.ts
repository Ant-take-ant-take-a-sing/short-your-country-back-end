// src/index.ts
import { ponder } from "ponder:registry";
import schema from "ponder:schema";

ponder.on("mantleHead:block", async ({ event, context }) => {
    const { db } = context;

    console.log("mantleHead:block at", Number(event.block.number));

    await db
        .insert(schema.newsCard)
        .values([
            {
                id: 1,
                title: "Maintaining Stability, Strengthening Economic Growth",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/indonesia/indo-1.png",
                country: "Indonesia",
                description:
                    "Bank Indonesia outlines plans to keep inflation within the 2.5% ± 1% target band while supporting domestic growth.",
            },
            {
                id: 2,
                title: "CPI: Going Out of Trend",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/indonesia/indo-2.png",
                country: "Indonesia",
                description:
                    "Indonesia’s inflation eases as food prices moderate, showing weaker-than-usual year-end price pressure.",
            },
            {
                id: 3,
                title: "Indonesia September Inflation Rises",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/indonesia/indo-3.png",
                country: "Indonesia",
                description:
                    "Annual inflation moves higher in September 2025, driven mainly by food prices and seasonal patterns.",
            },
            {
                id: 4,
                title: "Japan Economy Minister on BOJ Policy Choices",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/japan/japan-1.png",
                country: "Japan",
                description:
                    "Japan’s economy minister says the BOJ will decide how and when to adjust monetary policy as markets price in a possible hike.",
            },
            {
                id: 5,
                title: "Japanese Stocks Fall as Yen Strengthens",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/japan/japan-2.jpg",
                country: "Japan",
                description:
                    "Japanese equities sell off while the yen strengthens, reflecting expectations of tighter BOJ policy.",
            },
            {
                id: 6,
                title: "US Consumer Spending Slows While Prices Stay High",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/us/us-1.png",
                country: "United States",
                description:
                    "US consumer spending growth cools as inflation remains elevated, raising questions about the durability of demand.",
            },
            {
                id: 7,
                title: "Economists Still Expect December Fed Rate Cut",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/us/us-2.png",
                country: "United States",
                description:
                    "Most economists still forecast a 25 bps Fed rate cut in December despite visible disagreements inside the central bank.",
            },
            {
                id: 8,
                title: "Singapore Q3 GDP Beats Expectations",
                imageUrl:
                    "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/singapore/sgp-1.png",
                country: "Singapore",
                description:
                    "Singapore’s economy grows faster than expected in Q3 2025, prompting an upgrade to the full-year growth outlook.",
            },
        ])
        .onConflictDoNothing(); // 👈 prevent duplicates

    console.log("✅ Seeded newsCard (idempotent)");
});
