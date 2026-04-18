export default function Hero() {
  return (
    <section className="bg-background min-h-[100dvh] lg:h-[100dvh] xl:max-h-[1200px] pt-24 md:pt-[100px] pb-6 md:pb-8 flex flex-col">
      <div className="container mx-auto px-4 md:px-8 flex-1 flex flex-col min-h-0">
        
        {/* Image Block: Made more prominent */}
        <div className="w-full flex-1 shrink min-h-[45vh] rounded-2xl md:rounded-[1.5rem] overflow-hidden mb-6 md:mb-10 shadow-xl">
           <img
             className="w-full h-full object-cover"
             alt="Vues d'artistes sur le detailing de voiture, montrant un véhicule Porsche bleu"
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKcYtjp3QdHeL091UGdB23QHaz3dMpY2mbnzojClN8-K3CFX4U4isrkz3mA65eKXYk07VIAhDOZFc3E1nAqnfHcj36FTmS1jHuIm-2P3mngbD_uqx4nzbj7QKWhGlNiyYZ0IOpVVfZ0XJ2CxEptVIUwymUGemR0FS5VrHrp6wx3XbUV_5irF8N1boJtk8RTTRqLyAgcDiGirqZWGz3AD2aKbKBa87Y9U2a0nN_x7TTW8Y2YXnvY-TOiQE9qqG_4rMEP_GZT1WAHDo"
           />
        </div>

        {/* Text and Actions */}
        <div className="shrink-0 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 md:gap-10 lg:gap-12 items-start">
          
          {/* Header */}
          <div>
            <h1 className="text-[3.5rem] leading-[0.95] md:text-[4.5rem] lg:text-[6rem] font-bold tracking-tighter text-foreground">
              L’art de <br className="hidden sm:block" /> l’excellence
            </h1>
          </div>

          {/* Description & Buttons */}
          <div className="flex flex-col gap-5 lg:pt-2">
            <p className="text-lg md:text-xl leading-snug md:leading-relaxed text-foreground font-medium max-w-[90%]">
              Ici, aucun compromis. Le travail bien fait nous importe plus que tout, afin que votre véhicule ne reparte jamais le même de notre atelier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2">
              <button className="bg-foreground text-background px-6 py-3 rounded-md transition-transform hover:scale-105 active:scale-95 font-medium flex-1 sm:flex-none flex items-center justify-center">
                Découvrir nos services
              </button>
              <button className="border border-foreground text-foreground px-6 py-3 rounded-md transition-transform hover:bg-muted active:scale-95 font-medium flex-1 sm:flex-none flex items-center justify-center bg-transparent">
                Notre portfolio
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
