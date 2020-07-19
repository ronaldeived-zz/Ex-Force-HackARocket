export interface mensagemContato {
  from: string;
  to: string;
  contents: mensagemContatoContent[];
}

interface mensagemContatoContent {
  type: "contacts";
  contacts: contato[];
}

interface contato {
  name: nome;
  phones: numero[];
}

interface nome {
  firstName: string;
  formattedName: string;
}

interface numero {
  phone: string;
  type: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK";
  waId: string;
}
