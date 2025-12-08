import { createConfig } from "ponder";

export default createConfig({
  // network bisa kamu set ke Mantle/Base/Anvil sesuai kebutuhan
  chains: {
    mantleSepolia: {
      id: 5003,
      rpc: process.env.PONDER_RPC_URL_MANTLE!, // dari .env
    },
  },
  // Minimal block source supaya ada indexing function yang terdaftar
  // Kamu bisa hapus ini nanti jika sudah menambahkan contract/events yang sebenarnya
  blocks: {
    mantleHead: {
      chain: "mantleSepolia",
      startBlock: "latest",
    },
  },
  // konfigurasi database Postgres untuk menyimpan tabel schema
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL!,
  },
});
