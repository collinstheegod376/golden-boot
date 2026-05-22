
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

export const METADATA: SiteMetadata = {
  mainCoin: {
    name: "GOLDEN BOOT",
    ticker: "$BOOT",
    ca: "HK4WuuF...taiiqpump",
    description: "The main Golden Boot World Cup 2026 Community token — All heroes, legendary goals, and glory are right here.",
    image: "/boot-logo.png",
    buyLink: "https://pump.fun/coin/HK4WuuF...taiiqpump",
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
    topGainer: "MBAPPE"
  },
  match: {
    teams: "France vs Argentina",
    date: "July 15, 2026 - Lusail Stadium",
    stadium: "Lusail Stadium, Qatar",
    countdownTarget: "2026-07-15T20:00:00Z"
  }
};

const INITIAL_PLAYERS: PlayerData[] = [
  {
    id: 1,
    name: "Kylian Mbappé",
    ticker: "$MBAPPE",
    ca: "4ZTfdt...pump",
    image: "/players/mbappe.png",
    price: "$0.000008",
    marketCap: "$8.25K",
    change24h: -76.89,
    country: "France"
  },
  {
    id: 2,
    name: "Erling Haaland",
    ticker: "$HAALAND",
    ca: "H8Jdjk...pump",
    image: "https://b.fssta.com/wp-content/uploads/2023/10/Erling_Haaland.png",
    price: "$0.000004",
    marketCap: "$4.38K",
    change24h: -43.75,
    country: "Norway"
  },
  {
    id: 3,
    name: "Lionel Messi",
    ticker: "$MESSI",
    ca: "8Xt7ut...pump",
    image: "https://b.fssta.com/wp-content/uploads/2023/10/Lionel_Messi.png",
    price: "$0.000008",
    marketCap: "$8.04K",
    change24h: -45.17,
    country: "Argentina"
  },
  {
    id: 4,
    name: "Cristiano Ronaldo",
    ticker: "$CR7",
    ca: "anksto...pump",
    image: "https://b.fssta.com/wp-content/uploads/2023/10/Cristiano_Ronaldo.png",
    price: "$0.000006",
    marketCap: "$5.85K",
    change24h: -39.58,
    country: "Portugal"
  }
];

// Generate 16 more players to reach 20
const MOCK_PLAYERS: PlayerData[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 5,
  name: `Player ${i + 5}`,
  ticker: `$PLAY${i + 5}`,
  ca: `addr${i + 5}...pump`,
  image: "https://via.placeholder.com/400x500/121214/FFD700?text=Player",
  price: "$0.000002",
  marketCap: "$2.50K",
  change24h: parseFloat((Math.random() * 20 - 10).toFixed(2)),
  country: "World"
}));

export const PLAYERS: PlayerData[] = [...INITIAL_PLAYERS, ...MOCK_PLAYERS];
