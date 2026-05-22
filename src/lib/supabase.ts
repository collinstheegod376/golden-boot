
import { createClient } from '@supabase/supabase-js';

// REPLACE THESE WITH YOUR SUPABASE PROJECT CREDENTIALS
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * RECOMMENDED SCHEMA:
 * 
 * players table:
 * - id: uuid
 * - name: text
 * - ticker: text
 * - ca: text
 * - image_url: text
 * - country: text
 * - market_cap: numeric
 * - price: numeric
 * - change_24h: numeric
 * 
 * global_stats table:
 * - total_market_cap: text
 * - total_volume_24h: text
 * - top_gainer: text
 * 
 */
