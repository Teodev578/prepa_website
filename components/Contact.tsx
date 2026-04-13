"use client";
import React from "react";

const Contact = () => {
    return (
        <div className="bg-background text-on-background min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[250px] md:h-[409px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 hidden md:block">
                    <img 
                        className="w-full h-full object-cover opacity-40" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrNRVtS9VBf4O0AlJX5grgmmpMZbm4iTYjIoaH0CqOPIsSF09kDUJJu2ErJ5QT7JQFTYmaqu0hM6hqDirMgmVXfQARO9ynNPKHNmTtcepUct0zOljZg9ngljN5eH0m5dijlemOycWPFXERG7woLKp2kNvhBN_I1GkwEX8NNmMIBeJpGtAxEDso45OL2NL69qR_VuWt8Af_F9R4QfSf3WaIRHoRBuejduR8eyjT1q5UBnZXCdhgi7BFqK3Z75Be_rIhwUvt8XpFWtw" 
                        alt="Contact Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
                </div>
                {/* Mobile Hero (simple) vs Desktop Hero */}
                <div className="relative z-10 text-center px-6 md:px-4 w-full md:w-auto text-left md:text-center mt-8 md:mt-0">
                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-2 md:mb-4">
                        Contact &amp; <span className="text-primary md:text-on-background">Devis</span>
                    </h1>
                    <div className="h-1 w-24 bg-primary md:hidden mb-4"></div>
                    <p className="font-label text-secondary tracking-widest uppercase text-[10px] md:text-sm">Une précision millimétrée pour votre véhicule d'exception</p>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Form Section */}
                    <div className="lg:col-span-7 bg-surface-container-low p-6 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full md:h-20 bg-primary"></div>
                        <h2 className="hidden md:block font-headline text-3xl font-bold uppercase tracking-tighter mb-8">Demander un Devis Précis</h2>
                        <form className="space-y-8 md:space-y-10">
                            
                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="relative flex flex-col gap-2 md:gap-0 mt-4 md:mt-0">
                                    <label htmlFor="name" className="md:hidden absolute left-0 -top-3 text-[10px] tracking-widest uppercase text-primary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary z-10">NOM COMPLET</label>
                                    <label className="hidden md:block font-label text-[10px] uppercase tracking-widest text-secondary">Nom Complet</label>
                                    <input id="name" className="peer bg-transparent border-0 border-b border-outline-variant py-3 md:py-2 px-0 focus:ring-0 focus:border-primary text-white font-body placeholder-transparent md:placeholder:text-surface-variant transition-all w-full" placeholder="JEAN DUPONT" type="text"/>
                                </div>
                                <div className="relative flex flex-col gap-2 md:gap-0 mt-4 md:mt-0">
                                    <label htmlFor="email" className="md:hidden absolute left-0 -top-3 text-[10px] tracking-widest uppercase text-primary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary z-10">ADRESSE EMAIL</label>
                                    <label className="hidden md:block font-label text-[10px] uppercase tracking-widest text-secondary">Email</label>
                                    <input id="email" className="peer bg-transparent border-0 border-b border-outline-variant py-3 md:py-2 px-0 focus:ring-0 focus:border-primary text-white font-body placeholder-transparent md:placeholder:text-surface-variant transition-all w-full" placeholder="CONTACT@EXEMPLE.COM" type="email"/>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="relative flex flex-col gap-2 md:gap-0 mt-4 md:mt-0">
                                    <label htmlFor="phone" className="md:hidden absolute left-0 -top-3 text-[10px] tracking-widest uppercase text-primary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary z-10">TÉLÉPHONE</label>
                                    <label className="hidden md:block font-label text-[10px] uppercase tracking-widest text-secondary">Téléphone</label>
                                    <input id="phone" className="peer bg-transparent border-0 border-b border-outline-variant py-3 md:py-2 px-0 focus:ring-0 focus:border-primary text-white font-body placeholder-transparent md:placeholder:text-surface-variant transition-all w-full" placeholder="+33 0 00 00 00 00" type="tel"/>
                                </div>
                                <div className="relative flex flex-col gap-2 md:gap-0 mt-4 md:mt-0">
                                    <label htmlFor="year" className="md:hidden absolute left-0 -top-3 text-[10px] tracking-widest uppercase text-primary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary z-10">ANNÉE</label>
                                    <label className="hidden md:block font-label text-[10px] uppercase tracking-widest text-secondary">Année du Véhicule</label>
                                    <input id="year" className="peer bg-transparent border-0 border-b border-outline-variant py-3 md:py-2 px-0 focus:ring-0 focus:border-primary text-white font-body placeholder-transparent md:placeholder:text-surface-variant transition-all w-full" placeholder="2024" type="number"/>
                                </div>
                            </div>

                            {/* Vehicle Specs */}
                            <div className="relative flex flex-col gap-2 md:gap-0 mt-4 md:mt-0">
                                <label htmlFor="model" className="md:hidden absolute left-0 -top-3 text-[10px] tracking-widest uppercase text-primary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary z-10">MARQUE / MODÈLE</label>
                                <label className="hidden md:block font-label text-[10px] uppercase tracking-widest text-secondary">Marque &amp; Modèle</label>
                                <input id="model" className="peer bg-transparent border-0 border-b border-outline-variant py-3 md:py-2 px-0 focus:ring-0 focus:border-primary text-white font-body placeholder-transparent md:placeholder:text-surface-variant transition-all w-full" placeholder="PORSCHE 911 GT3 RS" type="text"/>
                            </div>
                            
                            <div className="hidden md:flex flex-col gap-2">
                                <label className="font-label text-[10px] uppercase tracking-widest text-secondary">État Général de la Carrosserie</label>
                                <select className="bg-transparent border-0 border-b border-outline-variant py-2 px-0 focus:ring-0 focus:border-primary text-white font-body appearance-none cursor-pointer">
                                    <option className="bg-surface-container-highest">NEUF (SORTIE CONCESSION)</option>
                                    <option className="bg-surface-container-highest">TRÈS BON ÉTAT (MICRO-RAYURES LÉGÈRES)</option>
                                    <option className="bg-surface-container-highest">ÉTAT MOYEN (CONTAMINATION VISIBLE)</option>
                                    <option className="bg-surface-container-highest">À RESTAURER (OXYDATION / RAYURES PROFONDES)</option>
                                </select>
                            </div>

                            {/* Services Checkboxes */}
                            <div className="pt-4 md:pt-0 space-y-4">
                                <h3 className="md:hidden text-xs font-bold tracking-[0.1em] uppercase text-secondary">Services Requis</h3>
                                <label className="hidden md:block font-label text-[10px] uppercase tracking-widest text-secondary mb-4">Services Souhaités</label>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    {/* Service 1 */}
                                    <label className="flex items-center gap-3 md:p-4 md:bg-surface-container-lowest md:border md:border-white/5 cursor-pointer md:hover:bg-surface-container-high transition-all group">
                                        <div className="md:hidden relative w-5 h-5 flex items-center justify-center">
                                            <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute cursor-pointer"/>
                                            <div className="w-5 h-5 border border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center pointer-events-none">
                                                <span className="material-symbols-outlined text-[14px] text-on-primary hidden peer-checked:block" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
                                            </div>
                                        </div>
                                        <input className="hidden md:block w-4 h-4 rounded-none border-secondary bg-transparent checked:bg-primary checked:border-primary focus:ring-0" type="checkbox"/>
                                        <span className="font-label text-xs uppercase tracking-tight md:tracking-tight text-on-surface-variant md:text-on-surface group-hover:text-primary md:group-hover:text-on-surface transition-colors">Ceramic Coating 9H</span>
                                    </label>
                                    
                                    {/* Service 2 */}
                                    <label className="flex items-center gap-3 md:p-4 md:bg-surface-container-lowest md:border md:border-white/5 cursor-pointer md:hover:bg-surface-container-high transition-all group">
                                        <div className="md:hidden relative w-5 h-5 flex items-center justify-center">
                                            <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute cursor-pointer"/>
                                            <div className="w-5 h-5 border border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center pointer-events-none">
                                                <span className="material-symbols-outlined text-[14px] text-on-primary hidden peer-checked:block" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
                                            </div>
                                        </div>
                                        <input className="hidden md:block w-4 h-4 rounded-none border-secondary bg-transparent checked:bg-primary checked:border-primary focus:ring-0" type="checkbox"/>
                                        <span className="font-label text-xs uppercase tracking-tight md:tracking-tight text-on-surface-variant md:text-on-surface group-hover:text-primary md:group-hover:text-on-surface transition-colors">Paint Correction Multi-étapes</span>
                                    </label>

                                    {/* Service 3 */}
                                    <label className="flex items-center gap-3 md:p-4 md:bg-surface-container-lowest md:border md:border-white/5 cursor-pointer md:hover:bg-surface-container-high transition-all group">
                                        <div className="md:hidden relative w-5 h-5 flex items-center justify-center">
                                            <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute cursor-pointer"/>
                                            <div className="w-5 h-5 border border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center pointer-events-none">
                                                <span className="material-symbols-outlined text-[14px] text-on-primary hidden peer-checked:block" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
                                            </div>
                                        </div>
                                        <input className="hidden md:block w-4 h-4 rounded-none border-secondary bg-transparent checked:bg-primary checked:border-primary focus:ring-0" type="checkbox"/>
                                        <span className="font-label text-xs uppercase tracking-tight md:tracking-tight text-on-surface-variant md:text-on-surface group-hover:text-primary md:group-hover:text-on-surface transition-colors">Nettoyage Intérieur Premium</span>
                                    </label>

                                    {/* Service 4 */}
                                    <label className="flex items-center gap-3 md:p-4 md:bg-surface-container-lowest md:border md:border-white/5 cursor-pointer md:hover:bg-surface-container-high transition-all group">
                                        <div className="md:hidden relative w-5 h-5 flex items-center justify-center">
                                            <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute cursor-pointer"/>
                                            <div className="w-5 h-5 border border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center pointer-events-none">
                                                <span className="material-symbols-outlined text-[14px] text-on-primary hidden peer-checked:block" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
                                            </div>
                                        </div>
                                        <input className="hidden md:block w-4 h-4 rounded-none border-secondary bg-transparent checked:bg-primary checked:border-primary focus:ring-0" type="checkbox"/>
                                        <span className="font-label text-xs uppercase tracking-tight md:tracking-tight text-on-surface-variant md:text-on-surface group-hover:text-primary md:group-hover:text-on-surface transition-colors">Protection PPF</span>
                                    </label>
                                </div>
                            </div>

                            {/* Detailed Message */}
                            <div className="relative pt-4 md:pt-0 flex flex-col gap-2">
                                <label htmlFor="message" className="md:hidden absolute left-4 top-1 text-[10px] tracking-widest uppercase text-primary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-outline peer-placeholder-shown:top-8 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-primary z-10">DÉTAILS SUPPLÉMENTAIRES</label>
                                <label className="hidden md:block font-label text-[10px] uppercase tracking-widest text-secondary">Message / Détails Complémentaires</label>
                                <textarea id="message" className="peer bg-surface-container-highest md:bg-transparent border-0 border-b border-outline-variant p-4 md:p-0 md:py-2 focus:ring-0 focus:outline-none focus:border-primary text-white font-body placeholder-transparent md:placeholder:text-surface-variant transition-all resize-none w-full" placeholder="DÉTAILLEZ VOS ATTENTES PARTICULIÈRES..." rows={4}></textarea>
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-container md:bg-transparent text-on-primary md:text-white md:bg-[linear-gradient(135deg,#00daf3_0%,#009fb2_100%)] py-5 font-headline font-bold uppercase tracking-[0.2em] md:tracking-widest text-sm md:text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,218,243,0.3)] transition-all active:scale-95">
                                Envoyer la Demande <span className="hidden md:inline">de Devis</span>
                                <span className="material-symbols-outlined text-lg md:hidden">arrow_forward</span>
                            </button>
                        </form>
                    </div>

                    {/* Info & Map Section */}
                    <div className="lg:col-span-5 space-y-6 md:space-y-12">
                        
                        {/* Workshop Info */}
                        <div className="bg-surface-container-high md:bg-surface-container-highest border-t md:border-t-0 border-primary/20 md:border-transparent p-0 md:p-8 relative overflow-hidden">
                            <div className="hidden md:block absolute -right-10 -top-10 opacity-5">
                                <span className="material-symbols-outlined text-[160px]">precision_manufacturing</span>
                            </div>
                            
                            <div className="p-8 md:p-0 flex flex-col gap-6 relative z-10">
                                <h3 className="hidden md:block font-headline text-2xl font-bold uppercase tracking-tighter mb-2 text-primary">L'Atelier de Précision</h3>
                                
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
                                    <div>
                                        <p className="font-label text-[10px] md:text-[10px] uppercase tracking-widest text-primary md:text-secondary mb-2 md:mb-1 font-bold md:font-normal">Quartier Général</p>
                                        <p className="font-body text-sm text-on-surface-variant md:text-white font-medium md:font-normal leading-relaxed">
                                            75 Avenue des Champs-Élysées<br/>
                                            75008 Paris, France
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start md:items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">schedule</span>
                                    <div>
                                        <p className="font-label text-[10px] md:text-[10px] uppercase tracking-widest text-primary md:text-secondary mb-1 md:mb-1 font-bold md:font-normal">Horaires</p>
                                        <div className="hidden md:grid grid-cols-2 gap-x-8 gap-y-1 font-body text-white text-sm">
                                            <span>LUN - VEN</span> <span>08:00 - 19:00</span>
                                            <span>SAMEDI</span> <span>09:00 - 17:00</span>
                                            <span className="text-error">DIMANCHE</span> <span className="text-error uppercase">Fermé</span>
                                        </div>
                                        <p className="md:hidden text-on-surface-variant text-sm font-medium mt-1">LUN — SAM: 08:00 - 19:00</p>
                                    </div>
                                </div>

                                <div className="hidden md:flex gap-4">
                                    <span className="material-symbols-outlined text-primary">call</span>
                                    <div>
                                        <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1">Ligne Directe</p>
                                        <p className="font-headline font-bold text-xl text-white">+33 1 23 45 67 89</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div className="w-full h-64 md:h-80 bg-surface-container-low border md:border-white/5 border-transparent relative group">
                            <div className="absolute inset-0 grayscale contrast-125 opacity-70 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700">
                                <img 
                                    className="w-full h-full object-cover hidden md:block" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEujDclAdAV4e1ip3QHFOoIgr6ihkEECLimrb7Tv743I2tlIKciua099weiBmcEl3KJavsNWf15G6Pp0GKGPxE9jrG9w7-Pcu-TgEf1ub_JnGzLpYZ-qVZX6J2K1XPX_JMoaj4PJ6H2Qd9NfobHzOhVH7a8DFrUz22_9wVEtL-H9oTm6OME8A0qZl1odbB0DigCMxc1xuP1J5Nh3Oc77f7Nfdlx9NsYQyl5J-2Dm1lN4PtCRzWlJIBF_xRGmNtALkt9LnLKpUFfVU" 
                                    alt="Map"
                                />
                                <img 
                                    className="w-full h-full object-cover md:hidden" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeJ4o5aWp5oZBhCHRXhz548YHoHA0cusl3lPFV7SQKyI-5wnM7thrZSzHb90MemSa65xasmqBA8eg1DhlCStE9vNkLiRZmdav-LprEmtelm1WWzsNs5C_KEdXlZefnPQ93a6y4KM1VwztmPEBHAiJC7SCCyAV78UU9t5rTwkuA0AkVN04GWzMOw5vuQKEOS68dMtl1mJ6Flc3ShadhAs7ReJ-4yV026Y1ULOOpo6Bc8PAa2_orhoMNkXtMYeVKfvBjnbHoz-ZjpCU" 
                                    alt="Map"
                                />
                            </div>
                            <div className="absolute inset-0 bg-primary/10 pointer-events-none md:mix-blend-normal mix-blend-overlay"></div>
                            
                            {/* Mobile marker */}
                            <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-8 h-8 bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,218,243,0.6)]">
                                    <span className="material-symbols-outlined text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
                                </div>
                            </div>

                            {/* Desktop marker */}
                            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-container flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(0,218,243,0.3)]">
                                    <span className="material-symbols-outlined text-on-primary">garage</span>
                                </div>
                                <div className="bg-background px-3 py-1 mt-2 border border-primary/30">
                                    <span className="font-label text-[8px] uppercase tracking-tighter text-primary">Precision Auto HQ</span>
                                </div>
                            </div>
                        </div>

                        {/* Assurance Block (Desktop only) */}
                        <div className="hidden md:grid grid-cols-2 gap-4">
                            <div className="p-4 border border-outline-variant bg-surface-container-lowest">
                                <span className="material-symbols-outlined text-primary mb-2">verified_user</span>
                                <h4 className="font-headline text-xs font-bold uppercase tracking-widest mb-1">Véhicule Assuré</h4>
                                <p className="font-body text-[10px] text-secondary">Garantie multirisque totale pendant le séjour.</p>
                            </div>
                            <div className="p-4 border border-outline-variant bg-surface-container-lowest">
                                <span className="material-symbols-outlined text-primary mb-2">workspace_premium</span>
                                <h4 className="font-headline text-xs font-bold uppercase tracking-widest mb-1">Certifié Detailer</h4>
                                <p className="font-body text-[10px] text-secondary">Accréditation officielle Gtechniq &amp; Swissvax.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
