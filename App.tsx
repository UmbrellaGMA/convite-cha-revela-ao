
import React, { useState, useEffect } from 'react';
import BackgroundVideo from './ConviteMatteo/components/BackgroundVideo';
import Countdown from './ConviteMatteo/components/Countdown';
import RSVPModal from './ConviteMatteo/components/RSVPModal';
import GiftListModal from './ConviteMatteo/components/GiftListModal';
import { EVENT_DATA } from './constants';
import { InvitationState, GuestInfo } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<InvitationState>(InvitationState.IDLE);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [isSpecialRN, setIsSpecialRN] = useState(false);

  // Detectar rota especial: link.com/especial ou ?fralda=rn ou ?especial
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      path.includes('especial') ||
      search.includes('especial') ||
      search.includes('rn') ||
      hash.includes('especial')
    ) {
      setIsSpecialRN(true);
    }
  }, []);

  const handleOpen = () => {
    setState(InvitationState.OPENING);
    setTimeout(() => {
      setState(InvitationState.OPENED);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleRSVPConfirm = (name: string, title: string, message: string) => {
    setGuestInfo({ name, confirmed: true, title, message });
    setShowRSVP(false);
    setState(InvitationState.RSVP_SUBMITTED);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-3 sm:p-6 overflow-x-hidden selection:bg-[#9E693F] selection:text-white">
      {/* Vídeo em loop com 11% de opacidade conforme solicitado */}
      <BackgroundVideo />

      {/* Cartão Central Estilo Convite */}
      <main className={`relative z-10 w-full ${state === InvitationState.IDLE ? 'max-w-[390px] sm:max-w-[410px]' : 'max-w-[440px] sm:max-w-[500px]'} my-auto`}>

        {/* ================= ESTADO INICIAL (CAPA DO CONVITE - SEM O QUADRADO BRANCO) ================= */}
        {state === InvitationState.IDLE && (
          <div className="relative w-full animate-fade-in flex flex-col items-center">
            
            {/* Moldura com Arco Superior Marrom - Transparente sobre o vídeo */}
            <div className="relative w-full rounded-b-2xl rounded-t-[140px] sm:rounded-t-[160px] border-2 border-[#A27653] pt-6 pb-12 px-3 sm:px-4 flex flex-col items-center text-center">
              
              {/* Nuvens Superiores de Fundo */}
              <div className="absolute -top-3 left-0 right-0 w-full pointer-events-none z-0 flex justify-center overflow-hidden rounded-t-[140px] sm:rounded-t-[160px]">
                <img
                  src="/nuvens.png"
                  alt="Nuvens Decorativas"
                  className="w-[110%] max-w-none object-contain opacity-95"
                />
              </div>

              {/* Urso com Balões e Balão de Ar Quente */}
              <div className="relative z-10 w-44 sm:w-52 -mt-4 mb-2 filter drop-shadow-sm transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/urso.png"
                  alt="Ursinho Zoe ou Heitor"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>

              {/* Textos Centrais */}
              <div className="relative z-10 mt-1 mb-4">
                <h1 className="text-xl sm:text-2xl font-serif-convite uppercase tracking-[0.16em] text-[#785237] font-semibold">
                  Você está convidado(a)
                </h1>
                <p className="text-xs sm:text-sm text-[#99765E] font-light mt-1 tracking-wide">
                  para um momento muito especial!
                </p>

                {/* Caligrafia Zoe ou Heitor */}
                <div className="my-2 sm:my-3">
                  <span className="font-zoe-heitor text-5xl sm:text-6xl text-[#4A3222] block leading-tight">
                    Zoe ou Heitor
                  </span>
                </div>

                {isSpecialRN && (
                  <span className="inline-block text-[10px] uppercase tracking-wider text-[#9E693F] bg-[#EFE3D5]/80 px-3 py-0.5 rounded-full border border-[#D5C2B1] mt-1 shadow-sm">
                    ✨ Convite Especial
                  </span>
                )}
              </div>

              {/* ================= SEÇÃO DO BOTÃO SUBIDO COM LAÇO E AVIÃO ================= */}
              <div className="relative w-full flex items-center justify-center my-3 z-20">
                
                {/* Laço no Canto Esquerdo do Botão */}
                <div className="absolute -left-7 sm:-left-9 -bottom-5 w-28 sm:w-34 pointer-events-none z-30">
                  <img
                    src="/laço.png"
                    alt="Laço"
                    className="w-full h-auto object-contain filter drop-shadow-sm transform -rotate-6"
                  />
                </div>

                {/* Avião no Canto Direito do Botão */}
                <div className="absolute -right-6 sm:-right-8 -bottom-4 w-28 sm:w-34 pointer-events-none z-30">
                  <img
                    src="/aviao.png"
                    alt="Avião"
                    className="w-full h-auto object-contain filter drop-shadow-sm transform rotate-3"
                  />
                </div>

                {/* Botão TOQUE PARA ABRIR O CONVITE */}
                <button
                  onClick={handleOpen}
                  className="relative z-20 bg-[#9E693F] hover:bg-[#87552F] text-white py-3.5 px-4 sm:px-6 rounded-xl shadow-[0_6px_20px_rgba(130,85,45,0.38)] flex items-center justify-center gap-2 sm:gap-2.5 transition-all transform hover:scale-[1.02] active:scale-95 border border-[#B5855E] mx-auto w-[78%] max-w-[270px]"
                >
                  {/* Ícone de toque à esquerda */}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a1 1 0 0 1-2 0V9a1 1 0 0 0-2 0v5a7 7 0 0 0 14 0V5a3 3 0 0 0-3-3z" />
                    <path d="M12 2v3" />
                    <circle cx="12" cy="4" r="0.5" fill="currentColor" />
                  </svg>

                  <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-center leading-tight whitespace-nowrap">
                    Toque para abrir o convite
                  </span>

                  {/* Ícone de toque à direita */}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a1 1 0 0 1-2 0V9a1 1 0 0 0-2 0v5a7 7 0 0 0 14 0V5a3 3 0 0 0-3-3z" />
                    <path d="M12 2v3" />
                    <circle cx="12" cy="4" r="0.5" fill="currentColor" />
                  </svg>
                </button>
              </div>

              {/* Margem inferior suave dentro da moldura */}
              <div className="h-2"></div>
            </div>
          </div>
        )}



        {/* ================= ESTADO ABERTO (DETALHES DO CONVITE - FONTE POPPINS) ================= */}
        {(state === InvitationState.OPENED || state === InvitationState.RSVP_SUBMITTED) && (
          <div className="w-full flex flex-col items-center animate-fade-in space-y-6 font-poppins">
            
            {/* Card Principal do Evento (Identidade Marrom Pastel em Poppins) */}
            <div className="relative w-full bg-[#FAF6F0]/92 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#DECDBE] shadow-[0_12px_45px_rgba(110,75,45,0.14)] text-center text-[#5D4330] overflow-hidden">
              
              {/* Citação de Abertura */}
              <p className="text-base sm:text-lg italic text-[#745037] font-medium tracking-wide px-2 leading-relaxed">
                "Um doce mistério prestes a ser desvendado: será Zoe ou Heitor?"
              </p>

              {/* Linha Divisória Superior */}
              <div className="h-[1px] w-full bg-[#E5D7CA] my-5"></div>

              {/* Grid QUANDO & ONDE em 2 Colunas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-left py-1">
                {/* Coluna QUANDO */}
                <div className="flex flex-col">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#9E693F] font-bold mb-1">
                    QUANDO
                  </h4>
                  <p className="text-lg sm:text-xl text-[#4E3524] font-bold leading-tight">
                    21 DE NOVEMBRO, 2026
                  </p>
                  <p className="text-xs sm:text-sm text-[#8C6D58] mt-1 font-normal">
                    Às {EVENT_DATA.time} horas
                  </p>
                </div>

                {/* Coluna ONDE */}
                <div className="flex flex-col">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#9E693F] font-bold mb-1">
                    ONDE
                  </h4>
                  <p className="text-lg sm:text-xl text-[#4E3524] font-bold leading-tight">
                    {EVENT_DATA.location}
                  </p>
                  <p className="text-xs sm:text-sm text-[#8C6D58] mt-1 font-normal leading-snug">
                    {EVENT_DATA.address}
                  </p>
                </div>
              </div>

              {/* Linha Divisória Inferior */}
              <div className="h-[1px] w-full bg-[#E5D7CA] my-5"></div>

              {/* Descrição Carinhosa */}
              <p className="text-xs sm:text-sm text-[#6E4F39] leading-relaxed max-w-md mx-auto mb-4 font-normal">
                {EVENT_DATA.description}
              </p>

              {/* Contagem Regressiva Delicada */}
              <div className="my-2">
                <Countdown targetDate={EVENT_DATA.date} />
              </div>

              {/* Indicador de Convite Especial se for a rota /especial */}
              {isSpecialRN && (
                <div className="mb-4 inline-block px-3.5 py-1 bg-[#EFE3D5] rounded-full border border-[#D5C2B1] text-[11px] text-[#8C684B] font-semibold">
                  🎁 Sugestão de presente do seu convite: Fralda RN + Mimo
                </div>
              )}

              {/* ================= BARRA DE 3 BOTÕES IGUAL À REFERÊNCIA ================= */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3 items-center justify-center mt-5 pt-1">
                {/* Botão MAPA */}
                <a
                  href="#mapa"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 min-w-[95px] py-3 px-3 rounded-full border-2 border-[#9E693F] text-[#7A5237] hover:bg-[#EFE3D5] transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span>📍</span>
                  <span>MAPA</span>
                </a>

                {/* Botão PRESENTES */}
                <button
                  type="button"
                  onClick={() => setShowGifts(true)}
                  className="flex-1 min-w-[115px] py-3 px-3 rounded-full border-2 border-[#9E693F] text-[#7A5237] hover:bg-[#EFE3D5] transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span>🎁</span>
                  <span>PRESENTES</span>
                </button>

                {/* Botão CONFIRMAR PRESENÇA */}
                {state !== InvitationState.RSVP_SUBMITTED && (
                  <button
                    type="button"
                    onClick={() => setShowRSVP(true)}
                    className="w-full sm:flex-[1.5] py-3.5 px-5 rounded-full bg-gradient-to-r from-[#A0693E] to-[#B37242] hover:from-[#8C5831] hover:to-[#9E6236] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(160,105,62,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#C5926B]"
                  >
                    <span>CONFIRMAR PRESENÇA</span>
                  </button>
                )}
              </div>

              {/* Feedback de Confirmação Enviada */}
              {state === InvitationState.RSVP_SUBMITTED && guestInfo && (
                <div className="mt-4 p-3.5 rounded-2xl bg-[#EFE3D5] border border-[#D5C2B1] text-center">
                  <span className="text-xs uppercase font-bold text-[#8C684B] block mb-0.5">
                    ✓ Presença Registrada
                  </span>
                  <p className="text-xs text-[#5D4330]">
                    Obrigado, {guestInfo.name}! Sua confirmação foi enviada com amor via WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* ================= SEÇÃO DO MAPA LOGO ABAIXO DO CARD ================= */}
            <div id="mapa" className="w-full rounded-3xl overflow-hidden border border-[#DECDBE] shadow-[0_10px_35px_rgba(110,75,45,0.12)] bg-[#FAF6F0]">
              <div className="p-3.5 sm:p-4 bg-[#F5ECE1] border-b border-[#E3D3C3] flex items-center justify-between text-left">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#5D3E2B]">
                    {EVENT_DATA.location}
                  </h4>
                  <p className="text-[11px] text-[#8C6D58]">
                    {EVENT_DATA.address}
                  </p>
                </div>
                <a
                  href={EVENT_DATA.shareMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#9E693F] hover:bg-[#85532A] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm"
                >
                  Abrir no Maps 🗺️
                </a>
              </div>
              <div className="w-full h-64 sm:h-72">
                <iframe
                  src={EVENT_DATA.mapUrl}
                  className="w-full h-full filter contrast-105"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Localização do Evento"
                ></iframe>
              </div>
            </div>

            {/* Rodapé Sutil */}
            <footer className="text-[11px] text-[#9C7A5E] tracking-wider py-4 text-center">
              <p>Zoe ou Heitor? • Chá Revelação</p>
              <p className="italic text-[10px] mt-0.5">Sua presença faz toda a diferença! ♡</p>
            </footer>
          </div>
        )}

      </main>

      {/* Modais */}
      {showRSVP && (
        <RSVPModal
          onClose={() => setShowRSVP(false)}
          onConfirm={handleRSVPConfirm}
          isRN={isSpecialRN}
        />
      )}

      {showGifts && (
        <GiftListModal
          onClose={() => setShowGifts(false)}
          isRN={isSpecialRN}
        />
      )}
    </div>
  );
};

export default App;


