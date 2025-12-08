
import { onchainTable } from "ponder";

export const newsCard = onchainTable("news_card", (t) => ({
    id: t.integer().primaryKey(),      // ⬅️ BUKAN serial
    title: t.text().notNull(),
    imageUrl: t.text().notNull(),
    country: t.text().notNull(),
    description: t.text().notNull(),
}));


// default export untuk GraphQL & SQL client
export default { newsCard };
