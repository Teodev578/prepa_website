import { supabaseServer } from '../supabase/server';
import { PortfolioProject } from '@/lib/types';

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const supabase = supabaseServer();

  // On demande à Supabase : "Donne-moi tout, du plus récent au plus ancien"
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération du portfolio :", error.message);
    return []; // En Flutter tu ferais peut-être un "throw Exception", ici on renvoie une liste vide pour ne pas crasher l'UI.
  }

  // On "cast" les données pour qu'elles respectent notre modèle
  return data as PortfolioProject[];
}