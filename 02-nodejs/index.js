/*
0 - Obter um usuário
1 - Preciso obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/

function obterUsuario(callback){
    setTimeout(function (){
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date(),
            endereco: 'Rua zero, 01'
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(function (){
        return callback(null, {
            telefone: '0800 900 800',
            ddd: '11'
        })
    }, 3000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 'zero'
        })
    }, 2000)
}

/* Resolvendo erros assincronos */
function resolverUsuario(erro, usuario){
    console.log('usuario', usuario)
}

/* Obtendo o usuario */
obterUsuario(function resolverUsuario(erro, usuario){
    if(erro){
        console.error('DEU RUIM EM USUARIO:', erro)
        return
    }
    obterTelefone(usuario.id, function resolverTelefone(erro2, telefone){
        if(erro2){
            console.error('DEU RUIM EM TELEFONE:', erro2)
            return
        }
        obterEndereco(usuario.id, function resolverEndereco(erro3, endereco){
            if(erro3){
                console.error('DEU RUIM EM ENDERECO:', erro3)
                return
            }

            console.log(`
                Nome: ${usuario.nome}, 
                Endereco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })  
})

/* Verificando */

// console.log('telefone', telefone)
