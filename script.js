// Algoritmo

// CALCULARIMC
// 1. PEGAR OS VALORES
// 2.CALCULAR O imc
// 3. GERAR A CLASSIFICAÇAO DO IMC
// 4.  ORGANIZAR AS INFORMAÇOES
//5. SALVAR OS DADOS NA LisTA
//6. LER A LSITA COM DADOS
//7. RENDERIZAR O CONTEUDO NO HTML
// 8. BOTAO DE LIMPAR OS REGISTROS


// funçao principal

function calcularImc(event) {
  event.preventDefault()

  console.log("Funcionando");

  let dadosUsuario = pegarValores();


  let imc = calcular(dadosUsuario.altura, dadosUsuario.peso);

  console.log(ClassificarImc(imc));

  let classificacaoImc = ClassificarImc(imc);

 
  let usuarioAtualizado = organizarDados(dadosUsuario,imc,classificacaoImc);

  cadastrarUsuario(usuarioAtualizado);
  



}


function pegarValores() {
  let nomeRecebido = document.getElementById("nome").value.trim();
  let alturaRecebida = parseFloat(document.getElementById("altura").value)
  let pesoRecebido = parseFloat(document.getElementById("peso").value)

  let dadosUsuario = {
    nome: nomeRecebido,
    altura: alturaRecebida,
    peso: pesoRecebido
  }

  console.log(dadosUsuario);

  return dadosUsuario;

}
//PASSO 2   - CAlcular
function calcular(altura, peso) {
  let imc = peso / (altura * altura)
  console.log(imc);
  return imc;
}

//PASSO 3 -  Classificar

function classificarImc(imc) {
    /*
        Resultado	        Situação
        Abaixo de 18,5      Filezinho!!
        Entre 18,5 e 24,99	Diliça!!!!
        Entre 25 e 29,99	Ta Top!!!
        Acima de 30      	Oh la em casa!!!
    */

    if(imc < 18.5){
        return "Filezinho!!!";

    }else if(imc < 25){
        return "Diliça!!!"

    }else if (imc < 30) {
        return "Ta Top!!!"

    }else{
        return "Oh la em casa!!!"
    }
}

function organizarDados(dadosUsuario,valorImc, classificacaoImc) {
  let dataHoraAtual = Intl.DateTimeFormat('pt-BR',{timeStyle:"long",dateStyle: "short"}).format(Date.now())


  let dadosUsuarioAtualizado ={
    ...dadosUsuario,
    imc: valorImc.toFixed(2),
    classificacao: classificacaoImc,
    dataCadastro: dataHoraAtual


  }
  console.log( dadosUsuarioAtualizado);
  return dadosUsuarioAtualizado;
}


// Passo 5 - Salvar
function cadastrarUsuario(usuario) {
  let listaUsuarios = [];
  // if (localStorage.getItem("usuariosCadastrados") == true)
 if (localStorage.getItem("usuariosCadastrados")) {
  listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));


  
 }



  listaUsuarios.push(usuario)

  localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

  
}

// passos 6  ler lsita
function carregarUsuarios() {
  

let listaUsuarios = [];
if (localStorage.getItem("usuariosCadastrados")) {
  listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));


  
 }
 if (listaUsuarios.length == 0){
  let tabela =document.getElementById("corpo-tabela");

  tabela.innerHTML = '<tr class="linha-mensagem" <td  colspan="6"> Nenhum usuario cadastrado!</td> </tr>'
  } else{

    montarTabela(listaUsuarios);
  }

 
}
 // aero function "=>
window.addEventListener('DOMContentLoaded', ()=> carregarUsuarios() );

// passos 7 montar tabelas


function montarTabela(listaDeCadastrados ) {
  let tabela =document.getElementById("corpo-tabela");

  let template = '';

  listaDeCadastrados.forEach(pessoa => {
    template +=  `<tr>
    <td data-cell="nome">${pessoa.nome}</td>
    <td data-cell="altura">${pessoa.altura}</td>
    <td data-cell="peso">${pessoa.peso}</td>
    <td data-cell="valor do IMC">${pessoa.imc}</td>
    <td data-cell="classificação do IMC">${pessoa.classificacao}</td>
    <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
</tr> `
    
  });
  tabela.innerHTML = template;
}

function deletarRegistros() {
  localStorage.removeItem("usuariosCadastrados")
  window.location.reload();
}
