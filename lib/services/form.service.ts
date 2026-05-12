import { supabaseServer } from '../supabase/server';
import { FormConfig, FormField, ServiceConfig } from '@/lib/types';

// 1. Récupère le bon formulaire ("PARTICULIER" ou "ENTREPRISE")
export async function getFormConfig(profileType: 'PARTICULIER' | 'ENTREPRISE'): Promise<FormConfig | null> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .eq('profile_type', profileType)
    .eq('is_active', true)
    .single(); // On en veut un seul

  if (error || !data) return null;
  return data as FormConfig;
}

// 2. Récupère les questions liées à un formulaire précis, triées dans le bon ordre
export async function getFormFields(formId: string): Promise<FormField[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('form_fields')
    .select('*')
    .eq('form_id', formId)
    .order('display_order', { ascending: true }); // Important pour l'ordre d'affichage !

  if (error) return [];
  return data as FormField[];
}

// 3. Récupère la liste des prestations (les cases à cocher en bas)
export async function getActiveServices(): Promise<ServiceConfig[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true);

  if (error) return [];
  return data as ServiceConfig[];
}