// Rótulos exibidos para modelos e datasets, e formatação de números.
import { t, langFromDocument, localeTag } from './i18n';
import { el } from './dom';

// Modelos exibidos, na ordem: Modelo 1 (synth-2gpu) e Modelo 2 (v2-fase2).
// Os manifestos em static/ também listam o official; a página o descarta com sortModels.
export const MODEL_ORDER = ['synth-2gpu', 'v2-fase2'];

// Filtra e ordena pela MODEL_ORDER; modelos fora dela (ex.: official) não aparecem.
export function sortModels(models: string[]): string[] {
  return MODEL_ORDER.filter((m) => models.includes(m));
}

// Só usado nos scripts de cliente: o idioma vem do <html lang>.
// Rótulos exibidos: renomear um modelo é mudar só aqui.
function modelLabels(): Record<string, string> {
  const common = t(langFromDocument()).common;
  return { 'synth-2gpu': common.model1, 'v2-fase2': common.model2 };
}

const DATASET_LABELS: Record<string, string> = { mvlf: 'MVLF', epfl: 'EPFL', zedd: 'ZEDD' };

export function modelLabel(name: string): string {
  return modelLabels()[name] || name;
}

export function datasetLabel(name: string): string {
  return DATASET_LABELS[name] || name;
}

// Formata números no padrão do idioma da página (vírgula decimal em pt, ponto em en).
export function formatNumber(value: number | string, digits = 2): string {
  return Number(value).toLocaleString(localeTag(langFromDocument()), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

// Texto com "K<sub>gt</sub>": monta os nós sem innerHTML (os dados vêm de JSON).
export function withKgt(before: string, after = ''): (Node | string)[] {
  return [before, el('span', { text: 'K' }, [el('sub', { text: 'gt' })]), after];
}
