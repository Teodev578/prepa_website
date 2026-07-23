"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Printer, FileText } from "lucide-react";

const customEase = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-16 md:pb-24 relative">
      <div className="absolute inset-0 pointer-events-none bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-16 md:pt-24 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: customEase }}
          className="mb-12 pb-8 border-b border-border/60"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Retour à l&apos;accueil</span>
            </Link>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded bg-card hover:bg-accent border border-border text-foreground transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Imprimer / PDF</span>
            </button>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
            Conditions Générales de Vente<br/>et de Prestation de Services (CGV/CGPS)
          </h1>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Les présentes conditions générales de vente et de prestation de services (ci-après les « CGV ») régissent l’ensemble des prestations fournies par LAW CLEAN CENTER (ci-après le « Prestataire ») à ses clients (ci-après le « Client »).
          </p>
          <div className="mt-4 p-4 bg-muted/30 border border-border rounded-md text-sm text-foreground">
            <strong>LAW CLEAN CENTER – EURL</strong><br />
            Siège social : 2 rue Louise Michel, 95470 Fosses, France<br />
            SIRET : 922 386 131 00010<br />
            E-mail : lawcleancenter@outlook.com
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          className="prose prose-invert max-w-none prose-headings:font-sans prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
        >
          {/* Article 1 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 1 : Objet et champ d’application
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Les présentes CGV ont pour objet de définir les conditions dans lesquelles le Prestataire réalise, au profit du Client, des prestations de :
            </p>
            <ul className="space-y-3 mb-4 list-disc pl-5">
              <li className="text-muted-foreground"><strong className="text-foreground">Préparation esthétique de véhicules :</strong> nettoyage intérieur et extérieur, remise à neuf, detailing, polissage, traitement et protection (céramique, cire), préparation de véhicules neufs (VN) et d’occasion (VO) ;</li>
              <li className="text-muted-foreground"><strong className="text-foreground">Convoyage de véhicules :</strong> déplacement de véhicules pour le compte du Client, principalement en région Île-de-France ;</li>
              <li className="text-muted-foreground"><strong className="text-foreground">Formation du personnel :</strong> formation des collaborateurs du Client aux techniques de préparation esthétique automobile et, le cas échéant, aux bonnes pratiques de manipulation et de convoyage des véhicules ; ces sessions sont dispensées en présentiel, sur le site du Client ou en tout autre lieu convenu entre les parties.</li>
            </ul>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Les prestations de préparation esthétique et de convoyage s’adressent aux professionnels comme aux particuliers. Les prestations de formation du personnel s’adressent par nature aux Clients professionnels souhaitant former leurs équipes.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Elles s’appliquent à toute commande passée auprès du Prestataire, que le Client soit un professionnel (agissant dans le cadre de son activité : concessionnaire, garage, gestionnaire de flotte, etc.) ou un consommateur (personne physique agissant à des fins n’entrant pas dans le cadre de son activité professionnelle, au sens du Code de la consommation).
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Certaines clauses comportent des dispositions distinctes selon que le Client est un Client professionnel ou un Client consommateur ; ces dispositions sont alors expressément identifiées.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Les prestations de formation peuvent en outre faire l’objet de conditions particulières (programme, durée, effectif, lieu, tarif, modalités d’évaluation et de sanction de la formation) annexées au devis ou à une convention de formation, lesquelles prévalent sur les présentes CGV en cas de contradiction sur ces points.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Toute commande implique l’adhésion sans réserve du Client aux présentes CGV, qui prévalent sur tout autre document du Client, sauf dérogation écrite et expresse du Prestataire. Le fait que le Prestataire ne se prévale pas à un moment donné d’une clause des CGV ne vaut pas renonciation à s’en prévaloir ultérieurement.
            </p>
          </section>

          {/* Article 2 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 2 : Définitions
            </h2>
            <ul className="space-y-3 list-disc pl-5">
              <li className="text-muted-foreground"><strong className="text-foreground">Prestation(s) :</strong> tout service de préparation esthétique, de convoyage et/ou de formation du personnel réalisé par le Prestataire.</li>
              <li className="text-muted-foreground"><strong className="text-foreground">Devis ou Contrat :</strong> document chiffré décrivant la ou les Prestations, transmis au Client préalablement à toute commande.</li>
              <li className="text-muted-foreground"><strong className="text-foreground">Véhicule :</strong> le véhicule confié par le Client au Prestataire aux fins de réalisation de la Prestation.</li>
              <li className="text-muted-foreground"><strong className="text-foreground">État des lieux :</strong> constat contradictoire de l’état du Véhicule, établi à la prise en charge et à la restitution.</li>
            </ul>
          </section>

          {/* Article 3 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 3 : Devis et formation du contrat
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Toute Prestation fait l’objet d’un devis établi par le Prestataire sur la base des informations communiquées par le Client. Le devis précise la nature des Prestations, leur prix, les délais indicatifs et, le cas échéant, les conditions particulières.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Le devis est valable 30 jours à compter de sa date d’émission. Le contrat est formé à la réception par le Prestataire du devis daté, accepté et signé par le Client (par tout moyen, y compris électronique), accompagné le cas échéant du versement de l’acompte prévu à l’article 6.
            </p>
          </section>

          {/* Article 4 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 4 : Prix
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Les prix sont indiqués en euros. Pour les Clients consommateurs, ils sont exprimés toutes taxes comprises (TTC) ; pour les Clients professionnels, ils sont exprimés hors taxes (HT), la TVA applicable étant ajoutée le cas échéant.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Les prix s’entendent pour les Prestations décrites au devis. Toute prestation supplémentaire, ou tout surcoût lié à un état du Véhicule sensiblement différent de celui décrit lors de l’établissement du devis (encrassement extrême, salissures particulières, dégradations préexistantes nécessitant un traitement spécifique), fera l’objet d’un devis/avenant complémentaire soumis à l’accord préalable du Client.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Les éventuels frais de déplacement, de convoyage ou de carburant sont précisés au devis/contrat.
            </p>
          </section>

          {/* Article 5 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 5 : Modalités de paiement
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Sauf stipulation contraire au contrat/devis, le paiement s’effectue à réception de facture par virement, carte, ou encore espèces dans la limite légale.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Clients professionnels.</strong> Sauf accord particulier, les factures sont payables à compter de la date de réception de la facture, dans la limite des délais légaux de l’article L.441-10 du Code de commerce. En cas de retard de paiement, sont exigibles de plein droit, sans mise en demeure préalable : des pénalités de retard au taux d’intérêt légal majoré, et au minimum égal à trois fois le taux d’intérêt légal, ainsi qu’une indemnité forfaitaire pour frais de recouvrement de 40 € (articles L.441-10 et D.441-5 du Code de commerce), sans préjudice de toute indemnisation complémentaire sur justificatifs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Clients consommateurs.</strong> En cas de défaut de paiement à l’échéance, les sommes dues pourront porter intérêt au taux légal après mise en demeure restée infructueuse.
            </p>
          </section>

          {/* Article 6 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 6 : Acompte, modification et annulation
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              La commande peut être subordonnée au versement d’un acompte de 30 à 50% du montant total, le solde étant exigible selon les modalités de l’article 5.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Toute demande de modification de la commande par le Client doit être formulée par écrit et n’est effective qu’après accord du Prestataire et, le cas échéant, établissement d’un devis rectificatif.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En cas d’annulation par le Client après formation du contrat, l’acompte versé reste acquis au Prestataire à titre de dédommagement, sans préjudice de la facturation des prestations déjà engagées. Les dispositions du présent article s’appliquent sous réserve, pour les Clients consommateurs, du droit de rétractation prévu à l’article 15.
            </p>
          </section>

          {/* Article 7 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 7 : Exécution des prestations de préparation esthétique
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Le Prestataire s’engage à réaliser les Prestations conformément aux règles de l’art et au devis accepté. Il est tenu à une obligation de moyens : il met en œuvre son savoir-faire et des produits adaptés, sans pouvoir garantir la disparition totale de défauts résultant de l’usure, de l’ancienneté, d’une dégradation antérieure ou de la nature des matériaux du Véhicule (cuirs anciens, vernis dégradés, micro-rayures profondes, etc.)
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Le Prestataire informe le Client lorsqu’un résultat optimal ne peut être garanti compte tenu de l’état initial du Véhicule. Les photographies « avant/après » éventuellement réalisées le sont à titre de constat et, sous réserve de l’article 19, peuvent illustrer le savoir-faire du Prestataire.
            </p>
          </section>

          {/* Article 8 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 8 : Exécution des prestations de convoyage
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Le convoyage est réalisé par un conducteur titulaire des permis requis et habilité par le Prestataire. Le trajet est limité à l’itinéraire nécessaire à l’exécution de la Prestation.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Le Client garantit que le Véhicule est en état de circuler (notamment contrôle technique en cours de validité lorsqu’il est obligatoire, pneumatiques, freinage et éclairage conformes) et qu’il dispose d’une assurance valide couvrant sa circulation. Le Véhicule doit disposer d’un niveau de carburant ou d’énergie suffisant ; à défaut, les frais engagés par le Prestataire sont refacturés.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Les frais de péage, de stationnement et de carburant liés au convoyage sont à la charge du Client, sauf mention contraire au devis. Les contraventions et amendes consécutives à une infraction commise pendant le convoyage sont à la charge de la partie responsable : elles sont supportées par le Prestataire lorsqu’elles résultent d’une faute de son conducteur, et par le Client dans les autres cas (notamment infractions liées à l’état du Véhicule ou à un défaut de documents). Les parties coopèrent pour la désignation du conducteur auprès des autorités.
            </p>
          </section>

          {/* Article 9 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 9 : Obligations du Client
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">Le Client s’engage à :</p>
            <ul className="space-y-3 list-disc pl-5">
              <li className="text-muted-foreground">Fournir des informations exactes sur le Véhicule et la Prestation souhaitée ;</li>
              <li className="text-muted-foreground">Mettre le Véhicule à disposition aux date, heure et lieu convenus, avec les documents nécessaires (clés, et pour le convoyage : certificat d’immatriculation, attestation d’assurance) ;</li>
              <li className="text-muted-foreground">Retirer tous objets personnels et de valeur du Véhicule avant la prise en charge ; le Prestataire décline toute responsabilité quant aux objets laissés dans le Véhicule ;</li>
              <li className="text-muted-foreground">Signaler tout élément particulier du Véhicule (équipements fragiles, modifications, défauts connus, dispositifs spécifiques).</li>
            </ul>
          </section>

          {/* Article 10 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 10 : Prise en charge et restitution du Véhicule
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              À la prise en charge et à la restitution, un état des lieux contradictoire est établi entre les parties, le cas échéant accompagné de photographies, mentionnant l’état apparent du Véhicule, le kilométrage et le niveau de carburant.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Toute réserve sur l’état du Véhicule à la restitution doit être formulée par le Client lors de cet état des lieux, ou par écrit dans les meilleurs délais. À défaut d’état des lieux contradictoire signé, le Véhicule est réputé restitué dans l’état constaté à la prise en charge.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Le Client s’engage à venir récupérer le Véhicule dans le délai convenu. Passé un délai de 5 jours après mise à disposition et mise en demeure restée sans effet, des frais de gardiennage pourront être facturés.
            </p>
          </section>

          {/* Article 11 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 11 : Délais et immobilisation
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Les délais d’exécution et la durée d’immobilisation du Véhicule sont communiqués à titre indicatif. Un retard raisonnable ne peut donner lieu à annulation de la commande, à indemnité ou à pénalité, sauf engagement écrit exprès du Prestataire sur un délai ferme. Le Prestataire informe le Client de tout retard significatif.
            </p>
          </section>

          {/* Article 12 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 12 : Assurances
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Le Prestataire déclare être titulaire des assurances nécessaires à l’exercice de son activité, couvrant sa responsabilité civile professionnelle et la garde des véhicules qui lui sont confiés.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Le Client conserve l’obligation de maintenir sa propre assurance sur le Véhicule pendant toute la durée de la Prestation.
            </p>
          </section>

          {/* Article 13 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 13 : Responsabilité
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Le Prestataire est responsable des dommages causés au Véhicule par sa faute pendant la durée de la garde, dans la limite des constatations effectuées aux états des lieux et des garanties de ses assurances.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Le Prestataire n’est pas responsable : des dommages résultant d’un vice propre, de l’usure ou de l’état préexistant du Véhicule ; des dommages causés par des informations inexactes ou incomplètes communiquées par le Client ; des objets laissés dans le Véhicule.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Clients professionnels.</strong> Sauf faute lourde ou dolosive, la responsabilité du Prestataire est limitée au montant des Prestations effectivement payées par le Client au titre de la commande concernée, et exclut les dommages indirects (perte d’exploitation, perte de chiffre d’affaires, préjudice commercial).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Clients consommateurs.</strong> Aucune disposition des présentes CGV n’a pour effet de limiter les droits que le Client consommateur tient des dispositions légales impératives, notamment des garanties légales.
            </p>
          </section>

          {/* Article 14 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 14 : Force majeure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Aucune des parties ne pourra être tenue responsable d’un manquement à ses obligations résultant d’un cas de force majeure au sens de l’article 1218 du Code civil. Les obligations sont suspendues pendant la durée de l’événement ; si celui-ci se prolonge au-delà d’un délai raisonnable, le contrat pourra être résilié sans indemnité.
            </p>
          </section>

          {/* Article 15 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 15 : Réclamations et garanties
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Toute réclamation doit être adressée au Prestataire par e-mail à lawcleancenter@outlook.com dans les meilleurs délais. Le Client consommateur bénéficie, le cas échéant, des garanties légales applicables.
            </p>
          </section>

          {/* Article 16 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 16 : Données personnelles
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Les données personnelles collectées dans le cadre de la relation contractuelle sont traitées conformément à la Politique de confidentialité du Prestataire et au Règlement (UE) 2016/679 (RGPD).
            </p>
          </section>

          {/* Article 17 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 17 : Propriété intellectuelle
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Le Prestataire conserve la propriété intellectuelle sur les photographies et contenus qu’il réalise. Sauf opposition écrite du Client, le Prestataire peut utiliser des photographies « avant/après » du Véhicule à des fins d’illustration de son savoir-faire (site, portfolio, réseaux sociaux), en veillant à ne pas faire apparaître d’élément identifiant (plaque d’immatriculation notamment) sans accord.
            </p>
          </section>

          {/* Article 18 */}
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-foreground mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Article 18 : Droit applicable et litiges
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Les présentes CGV sont régies par le droit français.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              En cas de litige, les parties s’efforceront de trouver une solution amiable. À défaut :
            </p>
            <ul className="space-y-3 list-disc pl-5">
              <li className="text-muted-foreground">Pour les Clients professionnels, et sauf disposition impérative contraire, tout litige sera soumis aux tribunaux compétents du ressort du siège social du Prestataire.</li>
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  );
}