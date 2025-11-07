
const tagnome = document.querySelector("#nome")
const tagemail = document.querySelector("#email")
const tagsenha = document.querySelector ("#senha")
const btnCadastro = document.querySelector ("#cadastro")

const tagloginemail = document.querySelector ("#emaillogin");
const tagloginsenha = document.querySelector ("#senhalogin");
const btnLogin = document.querySelector ("#login");

const btnQuiz = document.querySelector("#quiz");
const btnSair = document.querySelector("#desconectar");
const exibirnome = document.querySelector("#exibirusuario");


let cadastro = JSON.parse(localStorage.getItem("usuarios")) || []
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;

if (window.location.pathname.endsWith("index.html") && usuarioLogado){
window.location.href = "home.html"; 
}

if (window.location.pathname.endsWith("home.html") && !usuarioLogado) {
    window.location.href = "index.html";
}
 
if (window.location.pathname.endsWith("home.html")) {
        if (usuarioLogado){
        const existepontos = cadastro.find(function (usuario) {
            return usuario.email === usuarioLogado.email;
        });
        if (existepontos && existepontos.pontuacao > 0 ){
            exibirnome.innerHTML = `Bem-vindo, ${usuarioLogado.nome}!, <br> Você fez ${existepontos.pontuacao} de 4 pontos!`;
        }else {exibirnome.innerHTML = `Bem-vindo, ${usuarioLogado.nome}!`;

        }
        }

btnSair.addEventListener("click", function (){
    localStorage.removeItem("usuarioLogado");
    usuarioLogado = null;
    window.location.href ="index.html";
});

btnQuiz.addEventListener("click", function (){
    window.location.href = "quiz.html";
});
}


if (window.location.pathname.endsWith("index.html")) {
    btnCadastro.addEventListener("click",
function () {
    const nome = tagnome.value;
    const email = tagemail.value;
    const senha =  tagsenha.value

    if (!nome || !email || !senha){
        Swal.fire({
  title: "Preencha todos os campos!",
  icon: "error"
});
        return;
    }

const usuario = { nome: nome, email: email, senha: senha};

    cadastro.push(usuario);
 localStorage.setItem("usuarios", JSON.stringify(cadastro));

 Swal.fire({
  title: "Usuario cadastrado com sucesso!!",
  icon: "success"
});

 tagnome.value = "";
 tagemail.value = "";
 tagsenha.value = "";
   
 } );
btnLogin.addEventListener("click" , function () {
const emaillogin = tagloginemail.value;
const senhalogin = tagloginsenha.value;

const existe = cadastro.find (function (usuario) {
return usuario.email == emaillogin && usuario.senha === senhalogin

});

if (existe){
   const logado = {nome: existe.nome, email: existe.email};
    localStorage.setItem("usuarioLogado", JSON.stringify(logado));
    window.location.href = "home.html";
    if(usuarioLogado){console.log("OI")}
    
    Swal.fire({
  title: "Login realizado com sucesso!",
  icon: "success"
});

}else{
    Swal.fire({
  title: "Usuario não encontrado",
  icon: "error"
});
}
tagloginemail.value = "";
tagloginsenha.value = "";


});
 }