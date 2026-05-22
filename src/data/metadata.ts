
export interface PlayerData {
  id: number;
  name: string;
  ticker: string;
  ca: string;
  image: string;
  price: string;
  marketCap: string;
  change24h: number;
  country: string;
}

export interface SiteMetadata {
  mainCoin: {
    name: string;
    ticker: string;
    ca: string;
    description: string;
    image: string;
    buyLink: string;
    stats: {
      price: string;
      marketCap: string;
      volume24h: string;
      change24h: string;
    };
  };
  stats: {
    totalPlayers: number;
    totalMarketCap: string;
    totalVolume24h: string;
    topGainer: string;
  };
  match: {
    teams: string;
    date: string;
    stadium: string;
    countdownTarget: string; // ISO format string
  };
}

/**
 * CONFIGURATION: UPDATE PUMPFUN LINKS HERE
 * You can now simply paste the full Pump.fun URL into the 'ca' field.
 * All other data (Name, Ticker, Image, Price) will be pulled automatically.
 */

export const METADATA: SiteMetadata = {
  mainCoin: {
    name: "GOLDEN BOOT",
    ticker: "$BOOT",
    ca: "https://pump.fun/coin/GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ",
    description: "The main Golden Boot World Cup 2026 Community token — All heroes, legendary goals, and glory are right here.",
    image: "/boot-logo.png",
    buyLink: "https://pump.fun/coin/GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ",
    stats: {
      price: "$0.000074",
      marketCap: "$72.89K",
      volume24h: "$250.57K",
      change24h: "+8.39%"
    }
  },
  stats: {
    totalPlayers: 20,
    totalMarketCap: "$80.51K",
    totalVolume24h: "$150.24K",
    topGainer: "???"
  },
  match: {
    teams: "France vs Argentina",
    date: "July 15, 2026 - Lusail Stadium",
    stadium: "Lusail Stadium, Qatar",
    countdownTarget: "2026-07-15T20:00:00Z"
  }
};

// INITIAL PLAYERS - Just providing CAs/URLs
// You can replace these with your own Pump.fun links
export const PLAYERS: PlayerData[] = [
  {
    id: 1,
    name: "",
    ticker: "",
    ca: "GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ",
    image: "",
    price: "",
    marketCap: "",
    change24h: 0,
    country: ""
  },
  {
    id: 2,
    name: "",
    ticker: "",
    ca: "5UUH9RTDiSpq6HKS6bp4NdU9PNJpXRXuiw6ShBTBhgH2", // Placeholder example
    image: "",
    price: "",
    marketCap: "",
    change24h: 0,
    country: ""
  },
  // Adding empty slots for the remaining 18 players
  ...Array.from({ length: 18 }, (_, i) => ({
    id: i + 3,
    name: "",
    ticker: "",
    ca: "", // ENTER CA HERE
    image: "",
    price: "",
    marketCap: "",
    change24h: 0,
    country: ""
  }))
];
