import { createConfig } from "ponder";
import {erc20EventsAbi} from "./abis/erc20";

export default createConfig({
    chains: {
        mantleSepolia: {
            id: 5003,
            rpc: process.env.PONDER_RPC_URL_MANTLE!,
        },
    },

    blocks: {
        mantleHead: {
            chain: "mantleSepolia",
            startBlock: 32092816,
        },
    },

    contracts: {
        erc20Token: {
            chain: "mantleSepolia",
            address: process.env.ERC20_TOKEN_ADDRESS as `0x${string}`,
            abi: erc20EventsAbi,
            startBlock: 32092816
        },
    },

    database: {
        kind: "postgres",
        connectionString: process.env.DATABASE_URL!,
    },
});
