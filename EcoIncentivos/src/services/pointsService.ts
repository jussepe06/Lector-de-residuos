import { supabase } from '../config/supabaseClient';

export interface UserPoints {
  user_id: string;
  total_points: number;
}

/**
 * Función para actualizar (upsert) los puntos de un usuario en Supabase
 * @param userId - ID del usuario autenticado
 * @param newPoints - Puntos obtenidos en el escaneo actual que se sumarán al total
 */
export const addPointsToUser = async (userId: string, newPoints: number): Promise<void> => {
  try {
    // 1. Obtener los puntos actuales del usuario
    const { data: currentData, error: fetchError } = await supabase
      .from('users_points')
      .select('total_points')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // Ignorar error si no existe el registro
      console.error('Error obteniendo puntos actuales:', fetchError);
      return;
    }

    const currentPoints = currentData ? currentData.total_points : 0;
    const totalPoints = currentPoints + newPoints;

    // 2. Realizar Upsert de los nuevos puntos totales
    const { error: upsertError } = await supabase
      .from('users_points')
      .upsert({ 
        user_id: userId, 
        total_points: totalPoints
      }, { onConflict: 'user_id' });

    if (upsertError) {
      console.error('Error haciendo upsert de puntos:', upsertError);
    } else {
      console.log(`✅ Puntos actualizados correctamente: ${totalPoints} en total.`);
    }

  } catch (error) {
    console.error('Error inesperado actualizando puntos:', error);
  }
};
