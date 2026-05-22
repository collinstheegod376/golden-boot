
# 🏆 Golden Boot

A premium web application for tracking Golden Boot player tokens on Solana, inspired by Golden Glove.

## 🚀 Features
- **Player Grid**: 20 slots for the world's top strikers.
- **Dynamic Search**: Real-time filtering by name, country, or ticker.
- **Live Stats dashboard**: Total Market Cap, Volume, and Top Gainer tracking.
- **Match Timer**: Countdown to the next big match.
- **Main Coin Dashboard**: Dedicated section for the primary $BOOT token.
- **Supabase Ready**: Integrated backend support for persistent data.

## 🛠️ Configuration (Action Required)

### 1. Update Player & Site Data
Edit the file at `src/data/metadata.ts`. This is the single source of truth for:
- Main Coin Contract Address (CA)
- Player Contract Addresses (CA)
- Tickers, Images, and Descriptions
- Match details and Countdown target

### 2. Connect Supabase
1. Create a project on [Supabase](https://supabase.com).
2. Create a `.env` file based on `.env.example`.
3. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## 📦 Tech Stack
- **React + TypeScript + Vite**
- **Lucide React** (Icons)
- **Supabase** (Backend)
- **Vanilla CSS** (Premium Design System)
- **Framer Motion** (Subtle Animations)

## 🏃 Running Locally
```bash
npm install
npm run dev
```
