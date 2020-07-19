export interface mensagemTexto {
  from: string;
  to: string;
  contents: mensagemTextoContent[];
}

interface mensagemTextoContent {
  type: "text";
  texto: string;
}
