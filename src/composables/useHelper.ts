import { ref } from "vue";

export const useHelper = () => {
  const pastedText = ref('');

  async function copyToClipboard(result: string) {
    try {
      const textToCopy = result;
      await navigator.clipboard.writeText(textToCopy);
      return "Descrição copiada com sucesso!";
    } catch (error) {
      if (error) return "Erro ao copiar descrição!";
    }
  }

  async function pasteFromClipboard(){
    try {
      const text = await navigator.clipboard.readText();
      pastedText.value = text;
    } catch (error) {
      return "Erro ao colar descrição!";
    }
  }

  return {
    copyToClipboard,
    pasteFromClipboard,
    pastedText,
  };
};
