/*
0 - Obter um usuário
1 - Preciso obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    /* 
    Quando der algum problema chamamos o REJECT(ERRO)
    Quando tudo der SUCESSO chamamos RESOLVE
    */
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function (){
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date(),
                endereco: 'Rua zero, 01'
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function (){
            return resolve({
                telefone: '0800 900 800',
                ddd: '11'
            })
        }, 3000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 'zero'
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()
// para manipular o sucesso usamos a função .then
// para manipular os erros usamos a função .catch
usuarioPromise
.then(function(usuario){
    return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
})
.then(function (resultado){
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result){
        return {
            usuario: resultado.usuario,
            telefone: resultado.telefone,
            endereco: result
        }
    })
})
.then(function(resultado){
    //console.log('resultado:', resultado)
    console.log(`
        Nome: ${resultado.usuario.nome},
        Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
        Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone} 
    `)
})
.catch(function(error){
    console.log('DEU RUIM NO USUARIO', error)
})

/* Resolvendo erros assincronos */
/* function resolverUsuario(erro, usuario){
    console.log('usuario', usuario)
} */

/* Obtendo o usuario */
// obterUsuario(function resolverUsuario(erro, usuario){
//     if(erro){
//         console.error('DEU RUIM EM USUARIO:', erro)
//         return
//     }
//     obterTelefone(usuario.id, function resolverTelefone(erro2, telefone){
//         if(erro2){
//             console.error('DEU RUIM EM TELEFONE:', erro2)
//             return
//         }
//         obterEndereco(usuario.id, function resolverEndereco(erro3, endereco){
//             if(erro3){
//                 console.error('DEU RUIM EM ENDERECO:', erro3)
//                 return
//             }

//             console.log(`
//                 Nome: ${usuario.nome}, 
//                 Endereco: ${endereco.rua}, ${endereco.numero},
//                 Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })  
// })

/* Verificando */

// console.log('telefone', telefone)
