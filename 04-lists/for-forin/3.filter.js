const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function(callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        if(!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    try {

        const {
            results
        } = await obterPessoas('a')

        // const familiaLars = results.filter(function(item) {
        //     // Por padrão precisa retornar um boolean
        //     // Para informar se deve manter ou remover da lista
        //     // False -> remover da lista
        //     // True -> manter na lista
        //     // Não encontrou = -1
        //     // Encontrou = posição no array
        //     const result = item.name.toLowerCase().indexOf('lars') !== -1
        //     return result
        // })

        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)

    } catch (error) {
        console.error(error)
    }
}

main()