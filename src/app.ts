import { mensagemContato } from "./models/contato.model";
import { mensagemTexto } from "./models/mensagem.model";
import { redisClient } from "./redis/redisClient";
import { empresa } from "./models/empresa.model";
import connection from "./database/connection";
import request from 'request';


const redis = new redisClient();
var dbConnection = connection;

const dados: empresa = {
  descricao: "Pastelaria",
  numero: "5515997332831",
  cep: "18195000",
  nome: "Ex-Force Pasteis",
};

// dbConnection
//   .insert(dados)
//   .into("empresas")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const contatoExemplo: mensagemContato = {
  from: "tall-leader",
  to: "5515997332834",
  contents: [
    {
      type: "contacts",
      contacts: [
        {
          name: {
            firstName: "Nome da Empresa",
            formattedName: "Nome da Empresa",
          },
          phones: [
            {
              phone: "5515988287152",
              type: "CELL",
              waId: "5515988287152",
            },
          ],
        },
      ],
    },
  ],
};

const textoExemplo: mensagemTexto = {
  from: "tall-leader",
  to: "5515997332834",
  contents: [
    {
      type: "text",
      text: "Testando a mensagem",
    },
  ],
};

export function processarRequisicao(requisicao: any) {
  //const stateAtual = redis.get()
  if ("message" in requisicao) {
    const from =  requisicao.message.from;
    if (from) {
      if ("visitor" in requisicao.message) {
        let firstName = requisicao.message.visitor.firstName;
        if (!firstName) {
          firstName = "Usuario";
        }
      }
      if ("contents" in requisicao.message) {
        requisicao.message.contents.array.forEach(element => {
          
        });
      }
    }
    
    if (requisicao.contents.type) {
      
    }
  }
  enviaMensagem(contatoExemplo);
}

function enviaMensagem(mensagem: mensagemContato | mensagemTexto) {
  request.post({
      url: "https://api.zenvia.com/v1/channels/whatsapp/messages",
      method: "POST",
      json: true,
      headers: {
          "content-type": "application/json",
          "X-API-TOKEN": "ztr6CSDMXJXri6NhNwQnqyvxlVW1XPdbwMDu"  // <--Very important!!!
      },
      body: mensagem
  }, function (error, response, body){
      console.log(response);
  });
}
