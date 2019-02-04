/*
0 - Obter um usuário
1 - Obter o número de telefone de um usuário
2 - Obter o endereço do usuário
*/

// Importamos um módulo interno do Node JS
const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    // Quando der algum problema -> reject(ERRO)
    // Quando success -> RESOLV
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
    
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 88
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)

}

//1° passo: adicionar async na função
main()
async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
        Nome: ${usuario.nome}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
        Endereço: ${endereco.rua}, ${endereco.rua}`)

        console.timeEnd('medida-promise')
    } catch (error) {
        console.error(error)
    }

}

// const usuarioPromise = obterUsuario()
// // Para manipular o sucesso usamos .then
// // Para manipular erros usamos .catch
// usuarioPromise
//     .then(function(usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function(resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function(resultado) {
//         console.log(`
//         Nome: ${resultado.usuario.nome}
//         Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//         Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}`)
//     }).catch(function(error) {
//         console.error(error)
//     })

/*obterUsuario(function resolverUsuario(erro, usuario){
    if(erro){
        console.log("DEU RUIM ", erro)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
        if(erro1){
            console.log("DEU RUIM ", erro1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
            if(erro2){
                console.log("DEU RUIM", erro2)
                return;
            }

            console.log(`
            Nome: ${usuario.nome},
            Endereço: ${endereco.rua}, ${endereco.numero},
            Telefone: (${telefone.ddd})${telefone.telefone}
            `)

        })
    })

}) */
