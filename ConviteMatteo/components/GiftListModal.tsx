import React from 'react';

interface GiftListModalProps {
  onClose: () => void;
  isRN?: boolean;
}

const GiftListModal: React.FC<GiftListModalProps> = ({ onClose, isRN = false }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in font-poppins">
      <div className="bg-[#FAF6F0] border border-[#DECDBE] rounded-3xl p-6 sm:p-7 max-w-sm w-full relative shadow-[0_15px_45px_rgba(110,75,45,0.18)] text-[#5D4330]">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EFE3D5] text-[#7A5237] hover:bg-[#E3D1BF] transition-all flex items-center justify-center text-sm font-semibold"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Topo com Ursinho */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-[#F2E5D8] rounded-full flex items-center justify-center mx-auto mb-2 text-2xl border border-[#DECDBE] shadow-sm">
            🧸
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#4E3524]">
            Sugestão de Presente
          </h2>
          <p className="text-[11px] uppercase tracking-wider text-[#9E693F] font-medium mt-0.5">
            Chá Revelação • Zoe ou Heitor
          </p>
        </div>

        {/* Card do Presente */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DACB] shadow-sm mb-4 text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#9E693F] font-bold block mb-1">
            {isRN ? 'Convite Especial' : 'Com Todo Carinho'}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#4E3524] mb-2">
            {isRN ? 'Fralda Tamanho RN + Mimo' : 'Fralda Tamanho P, M ou G + Mimo'}
          </h3>
          <p className="text-xs text-[#7A5E4B] leading-relaxed">
            {isRN
              ? 'Sua presença é muito especial para nós! Como sugestão de presente, pedimos um pacote de fralda tamanho RN com um mimo de sua preferência.'
              : 'Sua presença é o nosso maior presente! Como sugestão com amor, pedimos um pacote de fralda (tamanho P, M ou G) acompanhado de um mimo à sua escolha.'}
          </p>
        </div>

        {/* Ideias de Mimo (Sem sugestão de marcas) */}
        <div className="p-3.5 rounded-xl bg-[#F5ECE1] border border-[#E5D7CA] text-xs mb-5 flex items-start gap-2.5 text-left">
          <span className="text-base shrink-0">✨</span>
          <div>
            <strong className="text-[#5D3E2B] block mb-0.5 font-semibold">Ideias de Mimo:</strong>
            <span className="text-[#7A5E4B] leading-relaxed">
              Lenço umedecido, pomadinha para assaduras, roupinha, sabonete líquido infantil ou brinquedo.
            </span>
          </div>
        </div>

        {/* Botão Entendido */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-[#9E693F] hover:bg-[#85532A] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all border border-[#C5926B]"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default GiftListModal;
