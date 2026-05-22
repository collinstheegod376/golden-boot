
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

// Configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// We will fetch the list of CAs directly from the Supabase 'players' table or a local file
// For now, let's look for tokens that are currently in your dashboard
const SYNC_CAS = [
    "GcDk4k8kcmv9sq5YSFgGT7wwKvgsnAWM4uqEiA1csSzQ",
    "5UUH9RTDiSpq6HKS6bp4NdU9PNJpXRXuiw6ShBTBhgH2",
    "HK4WuuFTmPQB2jYwVjZkC6rBv6W9K5G5G5G5G5G"
];

async function syncData() {
    console.log(`[${new Date().toLocaleTimeString()}] Starting Sync...`);
    
    for (const ca of SYNC_CAS) {
        try {
            // Remove any "pump" suffix if present
            const cleanCA = ca.toLowerCase().endsWith('pump') ? ca.substring(0, ca.length - 4) : ca;
            
            console.log(` -> Fetching data for ${cleanCA}...`);
            const response = await fetch(`https://frontend-api.pump.fun/coins/${cleanCA}`);
            
            if (!response.ok) {
                console.warn(`    ! Could not find ${cleanCA} on Pump.fun`);
                continue;
            }
            
            const data = await response.json();
            
            const { error } = await supabase
                .from('players')
                .upsert({
                    ca: cleanCA,
                    name: data.name,
                    ticker: data.symbol,
                    image_url: data.image_uri,
                    market_cap: data.usd_market_cap,
                    price: data.usd_market_cap / data.total_supply,
                    change_24h: data.price_change_percent || 0
                }, { onConflict: 'ca' });
                
            if (error) console.error(`    ! Database Error for ${cleanCA}:`, error.message);
            else console.log(`    ✓ Updated ${data.name} ($${data.symbol})`);
            
        } catch (err) {
            console.error(`    ! Critical error during sync for ${ca}:`, err.message);
        }
    }
    
    console.log(`[${new Date().toLocaleTimeString()}] Sync cycle complete. Next update in 4 minutes.\n`);
}

// Initial Sync
syncData();

// Run every 4 minutes (240000 ms)
setInterval(syncData, 240000);
