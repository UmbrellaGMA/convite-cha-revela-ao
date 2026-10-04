import React, { useState } from 'react';
import { EVENT_DATA } from '../../constants';

interface Companion {
  name: string;
  age: string;
}

interface RSVPModalProps {
  onClose: () => void;
  onConfirm: (name: string, title: string, message: string) => void;
  isRN?: boolean;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ onClose, onConfirm }) => {
  const [mainName, setMainName] = useState('');
  const [mainAge, setMainAge] = useState('');
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCompanion = () => {
    setCompanions([...companions, { name: '', age: '' }]);
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };

  const updateCompanion = (index: number, field: keyof Companion, value: string) => {
    const newCompanions = [...companions];
    newCompanions[index][field] = value;
    setCompanions(newCompanions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainName.trim()) return;

    setIsSubmitting(true);

    const phoneNumber = EVENT_DATA.phone; // "5513991077408"
    let message = `Olá! Confirmo minha presença no Chá Revelação - Zoe ou Heitor!\n\n`;
    message += `*Convidado:* ${mainName}${mainAge ? ` (${mainAge} anos)` : ''}\n`;

    const validCompanions = companions.filter(c => c.name.trim() !== '');
    if (validCompanions.length > 0) {
      message += `\n*Acompanhantes:* (${validCompanions.length})\n`;
      validCompanions.forEach((c) => {
        message += `- ${c.name}${c.age ? ` (${c.age} anos)` : ''}\n`;
      });
    }

    message += `\n*Data:* 21 de Novembro às 14:00\n`;
    message += `*Local:* ${EVENT_DATA.location}\n`;
    message += `\nEstamos muito felizes em compartilhar esse momento tão especial!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    onConfirm(
      mainName,
      "Presença Confirmada",
      "Sua confirmação foi enviada com sucesso para o WhatsApp dos papais!"
    );
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto font-poppins">
      <div className="bg-[#FAF6F0] border border-[#DECDBE] rounded-3xl p-6 md:p-8 max-w-md w-full my-8 relative shadow-[0_20px_50px_rgba(110,75,45,0.2)] text-[#5D4330]">
        
        {/* Botão Fechar Delicado */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EFE3D5] text-[#7A5237] hover:bg-[#E3D1BF] transition-all flex items-center justify-center text-sm font-semibold"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#F2E5D8] rounded-full flex items-center justify-center mx-auto mb-2 text-2xl border border-[#DECDBE]">
            💌
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#4E3524]">
            Confirme sua presença
          </h2>
          <p className="text-xs text-[#8C6D58] mt-1 font-light">
            Será muito especial ter você com a gente nesse momento!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome e Idade */}
          <div className="flex gap-2.5">
            <div className="flex-1">
              <label className="block text-[11px] mb-1 uppercase tracking-wider font-semibold text-[#7A5237]">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                value={mainName}
                onChange={(e) => setMainName(e.target.value)}
                className="w-full bg-white border border-[#DDD0C2] rounded-xl py-2.5 px-3.5 text-[#5D4330] placeholder-[#B5A191] focus:outline-none focus:border-[#9E693F] transition-colors text-sm shadow-sm"
                placeholder="Nome completo"
              />
            </div>
            <div className="w-24">
              <label className="block text-[11px] mb-1 uppercase tracking-wider font-semibold text-[#7A5237]">
                Idade
              </label>
              <input
                type="text"
                value={mainAge}
                onChange={(e) => setMainAge(e.target.value)}
                className="w-full bg-white border border-[#DDD0C2] rounded-xl py-2.5 px-3 text-[#5D4330] placeholder-[#B5A191] focus:outline-none focus:border-[#9E693F] transition-colors text-sm text-center shadow-sm"
                placeholder="Ex: 28"
              />
            </div>
          </div>

          {/* Acompanhantes */}
          <div className="space-y-2.5 pt-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#7A5237]">
                Acompanhantes
              </label>
              <button
                type="button"
                onClick={addCompanion}
                className="text-xs bg-[#EFE3D5] border border-[#D5C2B1] px-3 py-1 rounded-full text-[#7A5237] hover:bg-[#E3D1BF] transition-all font-medium"
              >
                + Adicionar
              </button>
            </div>

            {companions.map((companion, index) => (
              <div key={index} className="flex gap-2 items-center animate-fade-in">
                <input
                  type="text"
                  placeholder="Nome do acompanhante"
                  value={companion.name}
                  onChange={(e) => updateCompanion(index, 'name', e.target.value)}
                  className="flex-1 bg-white border border-[#DDD0C2] rounded-lg py-2 px-3 text-xs text-[#5D4330] placeholder-[#B5A191] focus:outline-none focus:border-[#9E693F] shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Idade"
                  value={companion.age}
                  onChange={(e) => updateCompanion(index, 'age', e.target.value)}
                  className="w-16 bg-white border border-[#DDD0C2] rounded-lg py-2 px-2 text-xs text-[#5D4330] placeholder-[#B5A191] focus:outline-none focus:border-[#9E693F] text-center shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeCompanion(index)}
                  className="w-7 h-7 rounded-lg bg-[#F5E2E2] border border-[#E8C5C5] text-[#A84B4B] hover:bg-[#E8CECE] flex items-center justify-center text-xs"
                  aria-label="Remover"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Botão Confirmar no WhatsApp */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#9E693F] hover:bg-[#85532A] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#C5926B]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>{isSubmitting ? 'Enviando...' : 'Confirmar pelo WhatsApp'}</span>
            </button>
          </div>

          <p className="text-[11px] text-[#8C6D58] text-center italic">
            *Ao clicar, a confirmação abrirá diretamente no WhatsApp (13) 99107-7408.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RSVPModal;
