try{
/* Operações da tela de usuasario  */
var usuarios = {
    
    tabela:{},
    lista:{},

    init:function(){
      let lista = [
                     {id:1,nome:'Gil',email:'gilberto.tec@vivaldi.net',cpf:'482.268.587-14',telefone:'45745-5754',online:'2019-01-02 00:20:02'},
                     {id:2,nome:'Sandra',email:'sandra@vivaldi.net',cpf:'759.837.120-20',telefone:'5858-5875',online:'2019-01-02 00:20:02'},
                     {id:3,nome:'Rafael',email:'rafael@vivaldi.net',cpf:'990.772.050-04',telefone:'5245-5872',online:'2019-01-02 00:20:02'},
                     {id:4,nome:'Alexandre',email:'alexandre@vivaldi.net',cpf:'028.371.370-49',telefone:'3567-5846',online:'2019-01-02 00:20:02'},
                    ];
       
      usuarios.tabela = $('#tbl_usuarios tbody');
      for(let usuario of lista){

           usuarios.lista[usuario.id] = usuario;   
       
      }
       
      usuarios.addViewAll(lista);
    },
    // Adiciona todos os usuarios passados como paremetros a tabela
    addViewAll:function(lista){
        
        if(typeof lista == "object")lista = Object.values(lista);

        usuarios.tabela.html('');

        for(let usuario of lista){
            usuarios.addView(usuario);
        }

    },
    // Adiciona o usuario passados como paremetros a tabela
    addView:function(usuario){
        let view = $(`
            <tr data-id="${usuario.id}">
                <td>${usuario.id}</td>
                <td>${usuario.email}</td>
                <td>${usuario.cpf}</td>
                <td>3h</td>
                <td class="center">
                    <a href="javascript:usuarios.ver(${usuario.id})"><label><i class="far fa-eye"></i>Exibir</label></a>
                    <a href="javascript:usuarios.deletar(${usuario.id})"><label><i class="far fa-trash-alt"></i>Deletar</label></a>
                    <a href="javascript:usuarios.editar(${usuario.id})"><label><i class="fas fa-edit"></i>Editar</label></a></td>
                </td>
            </tr>
        `);
        usuarios.tabela.append(view);
    },
    removeView:function(id){
        usuarios.tabela.find(`tr[data-id="${id}"]`)
        .hide(200,function(){
            $(this).remove();
        });
    },
    updateView:function(id){
        
        let usuario =  {};
        if(typeof id == "object")usuario = id
        else usuario = usuarios.lista[id];

        usuarios.tabela.find(`tr[data-id="${usuario.id}"]`)
        .html(`
                <td>${usuario.id}</td>
                <td>${usuario.email}</td>
                <td>${usuario.cpf}</td>
                <td>3h</td>
                <td class="center">
                    <a href="javascript:usuarios.ver(${usuario.id})"><label><i class="far fa-eye"></i>Exibir</label></a>
                    <a href="javascript:usuarios.deletar(${usuario.id})"><label><i class="far fa-trash-alt"></i>Deletar</label></a>
                    <a href="javascript:usuarios.editar(${usuario.id})"><label><i class="fas fa-edit"></i>Editar</label></a></td>
                </td>`);
    },
    editar:function(id){
        let usuario = {};
        // Verificado se o usuario já esta sendo psssado como parametro
        if(typeof id == "object")usuario = id
        else usuario = usuarios.lista[id];
        
        

        let alerta = new Alert(`<form>\
                                    <div class="row">
                                       <div class="cold6">
                                            <label class="row"> Nome: </label>
                                            <div class="content-icon-input cold10">
                                                <input class="input-icone" data-model='nome' value="${usuario.nome}" >
                                                <span aria-hidden="true" class="icon_profile"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                            <label class="row"> CPF: </label>
                                            <input value="${usuario.cpf}"  data-model='cpf'>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="cold6">
                                            <label class="row"> E-mail: </label>
                                            <div class="content-icon-input cold10">
                                                <input class="input-icone" data-model='email' value="${usuario.email}"  required>
                                                <span aria-hidden="true" class="icon_mail_alt"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                            <label class="row"> Telefone: </label>
                                            <div class="content-icon-input">
                                                <input class="input-icone"  data-model="telefone" value="${usuario.telefone}">
                                                <span aria-hidden="true" class="icon_phone"></span>
                                            </div>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="cold8" style="width:81%;">
                                            <label class="row"> Senha: </label>
                                            <div class="content-icon-input cold10">
                                                <input type="password" class="input-icone" data-model="senha" required value="${usuario.nome}" >
                                                <span aria-hidden="true" class="icon_key_alt"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                       </div>
                                    </div>
                                </form>`);
        
        alerta.buttons.push({
            texto:'Salvar',
            click:function(){
                
                 let formulario = alerta.janela.find('form');

                 let listaDados = {};
                 
                 formulario.off('submit');

                 formulario.submit(function(event){
                    
                    event.preventDefault();
                    
                    formulario.find('input[data-model]').each(function(elm,list){
                       $(this).removeClass('required');
                       
                       if( $(this).val().slice('') <1 || typeof $(this).val() == "undefined" ){
					       $(this).addClass('required');
					       return false;
       				   }

                       listaDados[$(this).attr('data-model')] = $(this).val() || '';

                    });
                    
                    listaDados.id = usuario.id;

                    usuarios.dao.update(listaDados).then(function(){
                        alerta.close();
                        usuarios.updateView(usuario.id);

                    })
                    

                 })
                 
                 formulario.submit();

            }
        })
    
        alerta.view('Editar Usuario ' + usuario.nome).then(html=>{

        }).catch(erro=>{
            
        })
    },
    ver:function(id){
        
        let usuario = usuarios.lista[id];

        let alerta = new Alert(`<form>\
                                    <div class="row">
                                       <div class="cold6">
                                            <label class="row"> Nome: </label>
                                            <div class="content-icon-input cold10">
                                                <input class="input-icone" value="${usuario.nome}" disabled>
                                                <span aria-hidden="true" class="icon_profile"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                            <label class="row"> CPF: </label>
                                            <input value="${usuario.cpf}" disabled>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="cold6">
                                            <label class="row"> E-mail: </label>
                                            <div class="content-icon-input cold10">
                                                <input class="input-icone" value="${usuario.email}" disabled>
                                                <span aria-hidden="true" class="icon_mail"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                            <label class="row"> Telefone: </label>
                                            <div class="content-icon-input">
                                                <input class="input-icone" value="${usuario.telefone}" disabled>
                                                <span aria-hidden="true" class="icon_phone"></span>
                                            </div>
                                       </div>
                                    </div>
                                </form>`);
        
        alerta.buttons.push({
            texto:'Editar',
            click:function(){
                alerta.close();
                console.log("Editar chamada : ",usuario);
                usuarios.editar(usuario);
            }
        })
    
        alerta.view('Usuario: ' + usuario.nome).then(html=>{

        }).catch(erro=>{

        })
    },
    deletar:function(id){
        
        let usuario = usuarios.lista[id];

        let alerta = new Alert(`<h1>Desejá realmente deletar <strong>${usuario.nome}</strong>?</h1>`,null,null);
        alerta.view().then(html=>{

        }).catch(erro=>{
            
        })
        .then(function(){
        
            console.log("Iniciano o delete");
            usuarios.dao.delete(id).then(function(){
                
                usuarios.removeView(id);

            })

        }).catch(function(janela){
            console.log("Cancelar")
        })
    },
    criar:function(){
        let alerta = new Alert(`<form>\
                                    <div class="row">
                                       <div class="cold6">
                                            <label class="row"> Nome: </label>
                                            <div class="content-icon-input cold10">
                                                <input class="input-icone" data-model='nome' placeholder="João" value>
                                                <span aria-hidden="true" class="icon_profile"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                            <label class="row"> CPF: </label>
                                            <input value placeholder="000.000.000-00" data-model='cpf'>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="cold6">
                                            <label class="row"> E-mail: </label>
                                            <div class="content-icon-input cold10">
                                                <input class="input-icone" placeholder="exemplo@mail.com" data-model='email' value required>
                                                <span aria-hidden="true" class="icon_mail_alt"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                            <label class="row"> Telefone: </label>
                                            <div class="content-icon-input">
                                                <input class="input-icone" placeholder="(11)4303-6889" data-model="telefone" value>
                                                <span aria-hidden="true" class="icon_phone"></span>
                                            </div>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="cold8" style="width:81%;">
                                            <label class="row"> Senha: </label>
                                            <div class="content-icon-input cold10">
                                                <input type="password" class="input-icone" data-model="senha" required value="asdsa" >
                                                <span aria-hidden="true" class="icon_key_alt"></span>
                                            </div>
                                       </div>
                                       <div class="cold3">
                                       </div>
                                    </div>
                                </form>`);
        
        alerta.buttons.push({
            texto:'Salvar',
            click:function(){
                
                 let formulario = alerta.janela.find('form');

                 let listaDados = {};
                 
                 formulario.off('submit');

                 formulario.submit(function(event){
                    
                    event.preventDefault();
                    
                    formulario.find('input[data-model]').each(function(elm,list){
                       $(this).removeClass('required');
                       
                       if( $(this).val().slice('') <1 || typeof $(this).val() == "undefined" ){
					       $(this).addClass('required');
					       return false;
       				   }

                       listaDados[$(this).attr('data-model')] = $(this).val() || '';

                    });
                    

                    usuarios.dao.insert(listaDados).then(function(usuario){
                        alerta.close();
                        usuarios.addView(usuario);

                    })
                    

                 })
                 
                 formulario.submit();

            }
        })
    
        alerta.view('Adicionar Usuario ').then(html=>{

        }).catch(erro=>{
            
        })
    },
    dao:{//Funções que fazem as operações no banco
        insert:function(dados){
            return new Promise(function(resolve,reject){
                let id = 574;
                do{

                    id = (Math.random()*13 + Math.random()*13).toFixed(0)*1;
                
                }while(id in usuarios.lista)// Gera um id Aleatorio que não exista no array

                dados.id = id;

                usuarios.lista[dados.id] = dados;

                resolve(dados);
            })
        },
        update:function(dados){
            
            return new Promise(function(resolve,reject){
                
                usuarios.lista[dados.id].nome = dados.nome;
                usuarios.lista[dados.id].email= dados.email;
                usuarios.lista[dados.id].telefone = dados.telefone;
                usuarios.lista[dados.id].cpf = dados.cpf;

                resolve(usuarios.lista[dados.id]);

            })
        },
        delete:function(id){
            return new Promise(function(resolve,reject){
                
                delete usuarios.lista[id];

                resolve();

            })
        }
    }
}

// Iniciando

usuarios.init();


}catch(erro){
    console.log("Erro ",erro.toString());
}