import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// NOTA: Reemplazar estas variables de entorno en producción (ej: react-native-dotenv)
const supabaseUrl = 'https://qjfyodqdngapdoperxqh.supabase.co';
const supabaseAnonKey = 'sb_publishable_5MhfwaopSyWPVP85yCQwKQ_ws6Ec0-o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
