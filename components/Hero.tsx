export default function Hero() {
  return (
    <section className="bg-background min-h-[100dvh] lg:h-[100dvh] xl:max-h-[1400px] pt-24 md:pt-[104px] pb-8 md:pb-12 flex flex-col">
      <div className="container mx-auto px-4 md:px-8 flex-1 flex flex-col min-h-0">
        
        {/* Image Block */}
        <div className="w-full flex-1 shrink min-h-[35vh] rounded-2xl md:rounded-[2rem] overflow-hidden mb-8 md:mb-12">
           <img
             className="w-full h-full object-cover"
             alt="Vues d'artistes sur le detailing de voiture, montrant un véhicule Porsche bleu"
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKcYtjp3QdHeL091UGdB23QHaz3dMpY2mbnzojClN8-K3CFX4U4isrkz3mA65eKXYk07VIAhDOZFc3E1nAqnfHcj36FTmS1jHuIm-2P3mngbD_uqx4nzbj7QKWhGlNiyYZ0IOpVVfZ0XJ2CxEptVIUwymUGemR0FS5VrHrp6wx3XbUV_5irF8N1boJtk8RTTRqLyAgcDiGirqZWGz3AD2aKbKBa87Y9U2a0nN_x7TTW8Y2YXnvY-TOiQE9qqG_4rMEP_GZT1WAHDo"
           />
        </div>

        {/* Text and Actions */}
        <div className="shrink-0 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-12 lg:gap-16 items-start">
          
          {/* Header */}
          <div>
            <h1 className="text-[3.5rem] leading-[1] md:text-6xl lg:text-[7rem] font-bold tracking-tighter text-foreground">
              L’art de <br className="hidden sm:block" /> l’excellence
            </h1>
          </div>

          {/* Description & Buttons */}
          <div className="flex flex-col gap-6 lg:pt-4">
            <p className="text-lg md:text-[1.35rem] leading-snug md:leading-[1.6] text-foreground font-medium max-w-lg">
              Ici, aucun compromis. Le travail bien fait nous importe plus que tout, afin que votre véhicule ne reparte jamais le même de notre atelier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-foreground text-background px-6 py-3.5 rounded-md transition-transform hover:scale-105 active:scale-95 font-medium flex-1 sm:flex-none flex items-center justify-center">
                Découvrir nos services
              </button>
              <button className="border border-foreground text-foreground px-6 py-3.5 rounded-md transition-transform hover:bg-muted active:scale-95 font-medium flex-1 sm:flex-none flex items-center justify-center bg-transparent">
                Notre portfolio
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
