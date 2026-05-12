// ---------------------------------------------------------
// 1. MODÈLE : PORTFOLIO
// ---------------------------------------------------------
export interface PortfolioProject {
  id: string;
  ref_id: string;
  title: string;
  treatment: string;
  date_tag: string;
  model: string;
  img_single?: string;
  img_before?: string;
  img_after?: string;
  time_spent: string;
  solution: string;
  impact: string;
  context: string;
  work_done: string[];
  result: string;
  size: 'small' | 'medium' | 'large';
  created_at?: string;
}

// ---------------------------------------------------------
// 2. MODÈLES : GÉNÉRATEUR DE FORMULAIRES (Contact)
// ---------------------------------------------------------
export interface FormConfig {
  id: string;
  profile_type: 'PARTICULIER' | 'ENTREPRISE';
  title: string;
  is_active: boolean;
}

export interface FormField {
  id: string;
  form_id: string;
  field_name: string; // ex: "siret_id" (utilisé comme clé dans le JSON)
  field_label: string; // ex: "SIRET_ID" (affiché à l'écran)
  field_type: 'text' | 'email' | 'select' | 'checkbox';
  options?: string[]; // Si c'est un 'select', voici la liste des choix
  is_required: boolean;
  display_order: number;
}

export interface ServiceConfig {
  id: string; // ex: "CER_9H"
  label: string; // ex: "CERAMIC_COATING_9H"
  description?: string;
  base_price: number;
  is_active: boolean;
}

// ---------------------------------------------------------
// 3. MODÈLE : DEVIS SOUMIS (Boîte de réception)
// ---------------------------------------------------------
export interface QuoteRequest {
  id: string;
  form_id: string;
  client_email: string;
  form_data: Record<string, any>; // C'est ici qu'on gère le fameux JSONB ! (Équivalent de Map<String, dynamic> en Dart)
  status: 'NOUVEAU' | 'EN_COURS' | 'DEVIS_ENVOYE' | 'REFUSE' | 'ACCEPTE';
  created_at?: string;
}