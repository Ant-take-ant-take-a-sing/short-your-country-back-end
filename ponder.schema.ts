
import { onchainTable } from "ponder";

export const newsCard = onchainTable("news_card", (t) => ({
    id: t.text().primaryKey(),      // ⬅️ BUKAN serial
    title: t.text().notNull(),
    imageUrl: t.text().notNull(),
    country: t.text().notNull(),
    description: t.text().notNull(),
}));

/**
 * ERC20 Transfer
 */
export const erc20Transfer = onchainTable("erc20_transfer", (t) => ({
    id: t.text().primaryKey(),

    txHash: t.text().notNull(),        // string
    from: t.text().notNull(),          // ⬅️ address as string
    to: t.text().notNull(),            // ⬅️ address as string

    value: t.bigint().notNull(),       // token amount
    blockNumber: t.integer().notNull(),
    timestamp: t.bigint().notNull(),
}));

/**
 * ERC20 Approval
 */
export const erc20Approval = onchainTable("erc20_approval", (t) => ({
    id: t.text().primaryKey(),

    txHash: t.text().notNull(),        // string
    owner: t.text().notNull(),         // ⬅️ address as string
    spender: t.text().notNull(),       // ⬅️ address as string

    value: t.bigint().notNull(),
    blockNumber: t.integer().notNull(),
    timestamp: t.bigint().notNull(),
}));

export const erc20Supply = onchainTable("erc20_supply", (t) => ({
    id: t.text().primaryKey(),          // contoh: "latest"
    supply: t.bigint().notNull(),       // totalSupply
    blockNumber: t.integer().notNull(),
    timestamp: t.bigint().notNull(),
}));

// default export untuk GraphQL & SQL client
export default {
    newsCard,
    erc20Transfer,
    erc20Approval,
    erc20Supply,
};