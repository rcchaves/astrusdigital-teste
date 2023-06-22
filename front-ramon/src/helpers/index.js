export const formatarDinheiro = quantidade => {
    return quantidade.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    })
}