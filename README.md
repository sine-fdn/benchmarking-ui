# SINE Benchmarking UI

## Getting Started

First, clone the [Polytune repository](https://github.com/sine-fdn/polytune) and run the channel server:

1. Set the env variable CHANNEL_SERVER_BASEPATH to 'http://127.0.0.1:8080'
2. Run the channel server:
```bash
cd polytune/examples/wasm-http-channels
cargo run --release -F bin
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
