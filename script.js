const tagnome = document.querySelector("#nome")
const tagemail = document.querySelector("#email")
const tagsenha = document.querySelector ("#senha")
const btnCadastro = document.querySelector ("#cadastro")

const tagloginemail = document.querySelector ("#emaillogin");
const tagloginsenha = document.querySelector ("#senhalogin");
const btnLogin = document.querySelector ("#login");

const btnSair = document.querySelector("#Sair");
const exibirnome = document.querySelector("#exibirusuario");

let cadastro = JSON.parse(localStorage.getItem("usuarios")) || []

let usuarioLogado = JSON.parse(localStorage.getItem ("usuariosLogado")) || null;

if(window.location.pathname.endsWith("index.html")){

btnCadastro.addEventListener("click",
function () {
    const nome = tagnome.value;
    const email = tagemail.value;
    const senha =  tagsenha.value;

    if(nome === "" | email === "" | senha ===""){
        alert("Preencha todos os campos!")
    }else{

    const usuario = { nome: nome, email: email, senha: senha};

    cadastro.push(usuario);
 localStorage.setItem("usuarios", JSON.stringify(cadastro));
 
    console.log("USUARIO CADASTRADO")
    console.log (cadastro)
    }
}
)

btnLogin.addEventListener("click" , function () {


const emaillogin = tagloginemail.value;
const senhalogin = tagloginsenha.value;

const existe = cadastro.find (function (usuario) {
return usuario.email == emaillogin && usuario.senha === senhalogin

})

if (existe){
    alert ("Você fez login")
    logado = { nome: existe.nome , email: existe.email}
    localStorage.setItem("usuarioLogado", JSON.stringify(logado))
    window.location.href = "home.html";

}else{
    alert ("Usuario não encontrado")
}
tagloginemail = "";
tagloginsenha = "";


})
}

if(window.location.pathname.endsWith("home.html")){
btnSair.addEventListener("click", function(){
    usuarioLogado = null;
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
})
}