import { redisClient } from "./redis/redisClient";
import { cliente } from "./models/cliente.model";
import { mensagemContato } from "./models/contato.model";
import { mensagemTexto } from "./models/mensagem.model";
import request from "request";
import { empresa } from "./models/empresa.model";
import connection from "./database/connection";

var dbConnection = connection;

const redis = new redisClient();

export const templates = {
  "0": {
    mensagem: "",
    funcao: funcao0,
  },
  "1": {
    mensagem: "Olá {{nome}}. Você deseja fazer o *cadastro* ou *pesquisa*?",
    funcao: funcao1,
  },
  "2": {
    mensagem:
      "Vamos prosseguir com seu cadastro. Informe o nome da sua empresa.",
    funcao: funcao2,
  },
  "3": {
    mensagem: "Sua empresa é de que ramo?",
    funcao: funcao3,
  },
  "4": {
    mensagem: "Informe o seu CEP.",
    funcao: funcao4,
  },
  "5": {
    mensagem:
      "Parece que você já possui um cadastro, deseja *atualizar* ou *excluir*?",
    funcao: funcao5,
  },
  "6": {
    mensagem: "Informe o novo nome da empresa.",
    funcao: funcao6,
  },
  "7": {
    mensagem: "Informe o seu novo CEP.",
    funcao: funcao7,
  },
  "8": {
    mensagem: "Digite o que está procurando.",
    funcao: funcao8,
  },
  "9": {
    mensagem: "Qual seu CEP?",
    funcao: funcao9,
  },
  "10": {
    mensagem: "",
    funcao: funcao10,
  },
};

function funcao0(usuario: cliente) {
  setEstado(usuario.numero, "1");
  enviaTexto({
    mensagem: templates["1"].mensagem.replace("{{nome}}", usuario.nome),
    numero: usuario.numero,
  });
}
function funcao1(usuario: cliente) {
  if (usuario.mensagem.toLowerCase().includes("cadastro")) {
    const empresaCadastrada = pegarDoBanco(usuario.numero);
    const temCadastro = empresaCadastrada.numero != "";
    if (temCadastro) {
      setEstado(usuario.numero, "5");
      enviaTexto({
        mensagem: templates["5"].mensagem,
        numero: usuario.numero,
      });
    } else {
      const data: empresa = {
        descricao: "Não definido",
        numero: usuario.numero,
        cep: "Não definido",
        nome: "Não definido",
      };

      adicionarAoBanco(data);

      setEstado(usuario.numero, "2");
      enviaTexto({
        mensagem: templates["2"].mensagem,
        numero: usuario.numero,
      });
    }
  } else if (usuario.mensagem.toLowerCase().includes("pesquisa")) {
    setEstado(usuario.numero, "8");
    enviaTexto({
      mensagem: templates["8"].mensagem,
      numero: usuario.numero,
    });
  } else {
    enviaTexto({
      mensagem: "Não entendi o que você disse",
      numero: usuario.numero,
    });
  }
}

function funcao2(usuario: cliente) {
  adicionarAoBanco({
    numero: usuario.numero,
    nome: usuario.mensagem,
    descricao: "Não definido",
    cep: "Não definido",
  });
  setEstado(usuario.numero, "3");
  enviaTexto({
    mensagem: templates["3"].mensagem,
    numero: usuario.numero,
  });
}

function funcao3(usuario: cliente) {
  const empresa = pegarDoBanco(usuario.numero);
  empresa.descricao = usuario.mensagem;
  atualizarBanco(empresa);
  setEstado(usuario.numero, "4");
  enviaTexto({
    mensagem: templates["4"].mensagem,
    numero: usuario.numero,
  });
}

function funcao4(usuario: cliente) {
  const empresa = pegarDoBanco(usuario.numero);
  empresa.cep = usuario.mensagem;
  atualizarBanco(empresa);
  setEstado(usuario.numero, "0");
  enviaTexto({
    mensagem: "Cadastro concluído!",
    numero: usuario.numero,
  });
}

function funcao5(usuario: cliente) {
  const empresa = pegarDoBanco(usuario.numero);
  if (usuario.mensagem.toLowerCase().includes("atualizar")) {
    setEstado(usuario.numero, "6");
    enviaTexto({
      mensagem: templates["6"].mensagem,
      numero: usuario.numero,
    });
  } else {
    enviaTexto({
      mensagem: "Não deu tempo de fazer ;-; só da pra atualizar",
      numero: usuario.numero,
    });
  }
}

function funcao6(usuario: cliente) {
  const empresa = pegarDoBanco(usuario.numero);
  empresa.nome = usuario.mensagem;
  atualizarBanco(empresa);
  setEstado(usuario.numero, "7");
  enviaTexto({
    mensagem: templates["7"].mensagem,
    numero: usuario.numero,
  });
}

function funcao7(usuario: cliente) {
  const empresa = pegarDoBanco(usuario.numero);
  empresa.cep = usuario.mensagem;
  atualizarBanco(empresa);
  setEstado(usuario.numero, "0");
  enviaTexto({
    mensagem: "Cadastro concluído!",
    numero: usuario.numero,
  });
}

function funcao8(usuario: cliente) {
  const empresas = pegarTodasEmpresas();

  let a = "Empresas disponíveis:\n";
  let count = 1;
  empresas.forEach((empresa) => {
    a += `\n${count} - ${empresa.nome}`;
    count++;
  });

  setEstado(usuario.numero, "9");
  enviaTexto({
    mensagem: a,
    numero: usuario.numero,
  });
}

function funcao9(usuario: cliente) {
  const empresas = pegarTodasEmpresas();

  const empresaSelecionada = empresas[Number(usuario.mensagem)];

  setEstado(usuario.numero, "0");
  enviaContato({
    contato: usuario.numero,
    nomeContato: empresaSelecionada.nome,
    numero: empresaSelecionada.numero,
  });
}

function funcao10(usuario: cliente) {}

function enviaTexto(mensagem: textoSimples) {
  const textoRequisicao: mensagemTexto = {
    from: "tall-leader",
    to: "5515997332834",
    contents: [
      {
        type: "text",
        text: "Testando a mensagem",
      },
    ],
  };

  enviaMensagem(textoRequisicao);
}

function pegarTodasEmpresas(): empresa[] {
  return [
    {
      nome: "",
      numero: "",
      descricao: "",
      cep: "",
    },
  ];
}

function enviaContato(mensagem: contatoSimples) {
  const contatoRequisicao: mensagemContato = {
    from: "tall-leader",
    to: mensagem.numero,
    contents: [
      {
        type: "contacts",
        contacts: [
          {
            name: {
              firstName: mensagem.nomeContato,
              formattedName: mensagem.nomeContato,
            },
            phones: [
              {
                phone: mensagem.contato,
                type: "CELL",
                waId: mensagem.contato,
              },
            ],
          },
        ],
      },
    ],
  };

  enviaMensagem(contatoRequisicao);
}

interface textoSimples {
  numero: string;
  mensagem: string;
}

interface contatoSimples {
  numero: string;
  contato: string;
  nomeContato: string;
}

function enviaMensagem(mensagem: mensagemContato | mensagemTexto) {
  request.post(
    {
      url: "https://api.zenvia.com/v1/channels/whatsapp/messages",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "X-API-TOKEN": "ztr6CSDMXJXri6NhNwQnqyvxlVW1XPdbwMDu",
      },
      body: mensagem,
    },
    function (error, response, body) {
      console.log(response);
    }
  );
}

function pegarDoBanco(numero: string): empresa {
  return {
    nome: "",
    numero: "",
    descricao: "",
    cep: "",
  };
}

function adicionarAoBanco(dados: empresa) {
  dbConnection
    .insert(dados)
    .into("empresas")
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}

function atualizarBanco(dados: empresa) {}

interface estado {
  numero: string;
  estado: string;
}

function getEstado(numero: string) {
    let estado = dbConnection('estado')).find( (estado)=>{
      return estado.numero === numero
    })
    if (estado) {
        return estado.estado;
    }
    else{
        return "0";
    } 
}

function setEstado(key: string, value: string) {
    const estados = dbConnection.select().from('estado');

}

export async function a(key: string, value: string) {
  //Só ta inserindo, preciso q atualize, se já tiver
  const dados: estado = {
    numero: key,
    estado: value,
  };
  dbConnection
    .insert(dados)
    .into("estado")
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}
