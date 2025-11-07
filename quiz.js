const enunciado = document.querySelector("#enunciado")
const alternativa1 = document.querySelector ("#alternativa1")
const alternativa2 = document.querySelector ("#alternativa2")
const alternativa3 = document.querySelector ("#alternativa3")
const alternativa4 = document.querySelector ("#alternativa4")

const btnHome = document.querySelector("#voltarhome")

let cadastro = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

const perguntas = [{pergunta:"Em que ano a Baribie foi lançada oficialmente?", alternativas:["1950","1959","1965","1970"], resposta:2},
    {pergunta:"Quem é o namorado da Barbie?", alternativas:["Ken","Kevin","Karl","Kris"],  resposta:0},
    {pergunta:"em Barbie e o Quebra-Nozes, qual é o nome do principe que ajuda a Barbie?", alternativas:["Daniel","Eric","Stefan","Armand"], resposta:2},
{ pergunta:"qual a cor preferida da Barbie?", alternativas:["Rosa","Azul","Verde","Amarelo"], resposta:0},
{ pergunta:"Qual o nome da irmã mais nova da Barbie?", alternativas:["Skipper","Stacie","Chelsea","Shelly"], resposta:2},
{ pergunta:"Qual profissão a Barbie nunca teve?", alternativas:["Astronauta","Presidente","Médica","Engenheira de Software"], resposta:3},
{ pergunta:"Quantos irmãos a Barbie tem?", alternativas:["2","3","4","5"], resposta:2},
{ pergunta:"Qual o nome do cachorro da Barbie?", alternativas:["Teddy","Buddy","Max","Chewy"], resposta:0},
{ pergunta:"Em que cidade a Barbie mora?", alternativas:["Los Angeles","Miami","Chicago","Nova York"], resposta:0},
{ pergunta:"Qual o nome da melhor amiga da Barbie?", alternativas:["Teresa","Nikki","Midge","Raquelle"], resposta:2}
];

let perguntaAtual = 0
let pontos= 0 

if (!usuarioLogado){
    window.location.href = "home.html";
 }

btnHome.addEventListener("click", function (){
window.location.href = "home.html";
})

function carregarPergunta (){
    enunciado.textContent = perguntas[perguntaAtual].pergunta;
    alternativa1.textContent = perguntas[perguntaAtual].alternativas[0];
    alternativa2.textContent = perguntas[perguntaAtual].alternativas[1];
    alternativa3.textContent = perguntas[perguntaAtual].alternativas[2];
    alternativa4.textContent = perguntas[perguntaAtual].alternativas[3];
    alternativa1.style.display = "inline-block";
    alternativa2.style.display = "inline-block";
    alternativa3.style.display = "inline-block";
    alternativa4.style.display = "inline-block";
    alternativa1.disabled = false;
    alternativa2.disabled = false;
    alternativa3.disabled = false;
    alternativa4.disabled = false;
}

alternativa1.addEventListener("click", function() {verificarResposta(0)})
alternativa2.addEventListener("click", function() {verificarResposta(1)})
alternativa3.addEventListener("click", function() {verificarResposta(2)})
alternativa4.addEventListener("click", function() {verificarResposta(3)})

function verificarResposta(alternativaSelecionada){
    if(alternativaSelecionada == perguntas[perguntaAtual].resposta){
        pontos++;
        Swal.fire({
  title: "respondeu certo!!",
  icon: "success"
});
    }else{
        Swal.fire({
  title: "respondeu errado!",
  icon: "error"
});
    }

    if (perguntaAtual < perguntas.length - 1){
        perguntaAtual++;
        carregarPergunta()

    }else{
        alternativa1.style.display = "none";
        alternativa2.style.display = "none";
        alternativa3.style.display = "none";
        alternativa4.style.display = "none";
        enunciado.innerHTML = `Pontos: ${pontos} de 10 pontos`;

        if(usuarioLogado && cadastro.length > 0) {
            const existe = cadastro.find(function (usuario){
                return usuario.email === usuarioLogado.email;
            } );
            if (existe){
                existe.pontuacao = pontos;
            }
    }

    localStorage.setItem("usuarios", JSON.stringify(cadastro));
      Swal.fire({
  title: "Acabou o Quizz!",
    icon: "info"
});
    }
}

carregarPergunta()

