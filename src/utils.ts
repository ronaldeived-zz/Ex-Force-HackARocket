import { cliente } from "./models/cliente.model";

export function extrairCliente(requisicao: any): cliente {
  if ("message" in requisicao) {
    const numero = requisicao.message.from;
    if (numero) {
      if ("visitor" in requisicao.message) {
        let firstName = requisicao.message.visitor.firstName;
        if (!firstName) {
          firstName = "Usuario";
        }
        if ("contents" in requisicao.message) {
          if (requisicao.message.contents.length > 1) {
            if (requisicao.message.contents[1].type == "text") {
              let mensagem = requisicao.message.contents[1].text;
              if (!mensagem) {
                mensagem = "";
              }

              const clienteExtraido: cliente = {
                nome: firstName,
                numero: numero,
                mensagem: mensagem,
              };

              return clienteExtraido;
            }
          }
        }
      }
    }
  }

  return { nome: "", numero: "", mensagem: "" };
}
