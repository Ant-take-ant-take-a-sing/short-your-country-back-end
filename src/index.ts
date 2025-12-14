import { ponder } from "ponder:registry";
import schema from "ponder:schema";

/**
 * Seed guard (in-memory)
 * - hanya hidup selama process jalan
 */
let newsSeeded = false;

/**
 * BLOCK HANDLER
 * - seed news (ONCE)
 * - snapshot totalSupply (periodik)
 */
ponder.on("mantleHead:block", async ({ event, context }) => {
    const { db, client } = context;

    console.log("mantleHead:block at", Number(event.block.number));

    // =========================
    // Seed news (RUN ONCE)
    // =========================
    if (!newsSeeded) {
        await db
            .insert(schema.newsCard)
            .values([
                {
                    id: "news-1",
                    title: "Maintaining Stability, Strengthening Economic Growth",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/indonesia/indo-1.png",
                    country: "Indonesia",
                    description:
                        "Bank Indonesia outlines plans to keep inflation within the 2.5% ± 1% target band.",
                },
                {
                    id: "news-2",
                    title: "CPI: Going Out of Trend",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/indonesia/indo-2.png",
                    country: "Indonesia",
                    description:
                        "Indonesia’s inflation eases as food prices moderate.",
                },
                {
                    id: "news-3",
                    title: "Indonesia September Inflation Rises",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/indonesia/indo-3.png",
                    country: "Indonesia",
                    description:
                        "Annual inflation moves higher in September 2025.",
                },
                {
                    id: "news-4",
                    title: "Japan Economy Minister on BOJ Policy Choices",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/japan/japan-1.png",
                    country: "Japan",
                    description:
                        "Japan’s economy minister says the BOJ will decide how and when to adjust monetary policy as markets price in a possible hike.",
                },
                {
                    id: "news-5",
                    title: "Japanese Stocks Fall as Yen Strengthens",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/japan/japan-2.jpg",
                    country: "Japan",
                    description:
                        "Japanese equities sell off while the yen strengthens, reflecting expectations of tighter BOJ policy.",
                },
                {
                    id: "news-6",
                    title: "US Consumer Spending Slows While Prices Stay High",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/us/us-1.png",
                    country: "United States",
                    description:
                        "US consumer spending growth cools as inflation remains elevated, raising questions about the durability of demand.",
                },
                {
                    id: "news-7",
                    title: "Economists Still Expect December Fed Rate Cut",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/us/us-2.png",
                    country: "United States",
                    description:
                        "Most economists still forecast a 25 bps Fed rate cut in December despite visible disagreements inside the central bank.",
                },
                {
                    id: "news-8",
                    title: "Singapore Q3 GDP Beats Expectations",
                    imageUrl:
                        "https://zlioksiyoneetwrlfsen.supabase.co/storage/v1/object/public/news-images/singapore/sgp-1.png",
                    country: "Singapore",
                    description:
                        "Singapore’s economy grows faster than expected in Q3 2025, prompting an upgrade to the full-year growth outlook.",
                },
            ])
            .onConflictDoNothing();

        newsSeeded = true;
        console.log("✅ newsCard seeded once");
    }

    // =========================
    // Snapshot totalSupply (tiap 50 block)
    // =========================
    if (event.block.number % 50n !== 0n) return;

    const tokenAddress =
        process.env.ERC20_TOKEN_ADDRESS as `0x${string}`;

    const totalSupply = await client.readContract({
        address: tokenAddress,
        abi: [
            {
                name: "totalSupply",
                type: "function",
                stateMutability: "view",
                inputs: [],
                outputs: [{ type: "uint256" }],
            },
        ],
        functionName: "totalSupply",
    });

    await db
        .insert(schema.erc20Supply)
        .values({
            id: "latest",
            supply: totalSupply,
            blockNumber: Number(event.block.number),
            timestamp: BigInt(event.block.timestamp),
        })
        .onConflictDoUpdate({
            supply: totalSupply,
            blockNumber: Number(event.block.number),
            timestamp: BigInt(event.block.timestamp),
        });

    console.log("✅ supply snapshot updated");
});

/**
 * ERC20 Transfer
 */
ponder.on("erc20Token:Transfer", async ({ event, context }) => {
    const { db } = context;

    await db.insert(schema.erc20Transfer).values({
        id: `${event.transaction.hash}-${event.log.logIndex}`,
        txHash: String(event.transaction.hash),
        from: String(event.args.from).toLowerCase(),
        to: String(event.args.to).toLowerCase(),
        value: event.args.value,
        blockNumber: Number(event.block.number),
        timestamp: BigInt(event.block.timestamp),
    });
});

/**
 * ERC20 Approval
 */
ponder.on("erc20Token:Approval", async ({ event, context }) => {
    const { db } = context;

    await db.insert(schema.erc20Approval).values({
        id: `${event.transaction.hash}-${event.log.logIndex}`,
        txHash: String(event.transaction.hash),
        owner: String(event.args.owner).toLowerCase(),
        spender: String(event.args.spender).toLowerCase(),
        value: event.args.value,
        blockNumber: Number(event.block.number),
        timestamp: BigInt(event.block.timestamp),
    });
});
