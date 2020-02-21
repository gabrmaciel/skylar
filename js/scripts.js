//A funlão AbreTela() tem como parâmetro 'pagina', e se refere a página a ser exibida
//Primeiramente, a div #App é substituída por uma mensagem de carregamento
//O conteúdo da página é retornado via AJAX, e quando carregado dispara o conteúdo no corpo da div #App

function AbreTela(pagina){ 
    $("#App").html("Carregando...");

    var pagina_url = pagina + ".html";

    $.ajax({
        url: pagina_url, success: function(result){
            $("#App").html(result);
        }
    });
}


//ConstruiPaginaCliente() é uma função construtora da página clientes.html, o conteúdo principal da index
//Esta função tem como base os dados do cookie, que são "splitados" e depois inseridos o seu conteúdo nas DIVs através do JS
//Esse processo é feito, por meio de um loop, para todos os resultados
//Como a página não é reiniciada, o conteúdo é limpado toda vez que acessado

function ConstruiPaginaCliente(){
    var resultado = getCookie('clientes');
    var resultado2 = String(resultado);
    var resultado3 = resultado2.slice(1,-1);
    var resultado3Split = resultado3.split("][");

    $(".ClientesLista").html("");

    for(var i = 0; i < resultado3Split.length; i++){

        var resultado3Split2 = resultado3Split[i].split("|");

        var clienteNome = resultado3Split2[0];
        var clienteEmail = resultado3Split2[1];

        $(".ClientesLista").append("<div class='ClientesDiv' id='ClientesDiv"+ i +"'><div class='ClientesDivImagem' style='background-image:url()'>&nbsp;</div><div class='ClientesDivLateral'><div class='ClientesDivLateralCenter'><span class='ClientesDivNome'>"+ clienteNome +"</span><span class='ClientesDivEmail'>"+ clienteEmail +"</span><div class='ClientesEditar'><span class='ClientesEditarEditar' onclick='AbreTela(\"clientes-editar\")'>EDITAR</span><span class='ClientesEditarBarra'>&nbsp;|&nbsp;</span><span class='ClientesEditarRemover' onclick='RemoveClienteDiv("+ i +")'>REMOVER</span></div></div></div></div>");
        
    }
}

//RemoveClienteDiv() é uma função que remove a DIV de listagem de cliente e chama a função de ClienteFuncoes() com o parâmetro 'deletar'
//ConstruiPaginaCliente() reinicia o conteúdo da listagem

function RemoveClienteDiv(id){
    $("#ClientesDiv" + id).remove();
    ClienteFuncoes(id, 'deletar');
    ConstruiPaginaCliente();
}

//ClienteFuncoes é uma função para deletar e adicionar clientes
//Os dados do cookie são pegos, "splitados" e depois cada parâmetro define o que será feito

function ClienteFuncoes(id, funcao){

    var resultado = getCookie('clientes');
    var resultado2 = String(resultado);
    var resultado3 = resultado2.slice(1,-1);

    var resultado3Split = resultado3.split("][");

    if(funcao == "deletar"){

        //Identificado o cliente e o conteúdo a ser excluído, este é separado e removido da string original do cookie
        //Tendo os dados novos, o cookie é reescrito e os dados atualizados

        for(var i = 0; i < resultado3Split.length; i++){
            var clienteExcluido = "[" + resultado3Split[id] + "]";
        }

        var novoCookie = resultado2.replace(clienteExcluido, "");
        setCookie('clientes', novoCookie, 1);

    }else if(funcao == "adicionar"){

        //Os dados de 'adicionar' vêm da página 'clientes-adicionar', e os ID's de seus inputs, respectivamente
        //Estes dados são alocados num array, com o padrão definido inicialmente
        //Um novo cookie é criado e os dados novos são atualizados
        //AbreTela('clientes') retorna para a página inicial

        var nomeAdicionar = $("#cliente-adicionar-nome").val();
        var emailAdicionar = $("#cliente-adicionar-email").val();
        var telefoneAdicionar = $("#cliente-adicionar-telefone").val();

        var novoCliente = "[" + nomeAdicionar + "|" + emailAdicionar + "|" + telefoneAdicionar + "]";

        var novoCookie = resultado2 + novoCliente;
        setCookie('clientes', novoCookie, 1);

        AbreTela('clientes');

    }
    

}

//pega cookie, definido por parâmetros
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//exibe cookie, definido por parâmetros (sendo 'a' o nome do cookie)
function getCookie(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}