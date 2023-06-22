import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Produto from '../components/Produto'


export default function Produtos() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/produtos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(dados => dados.data)

  const { data, error, isLoading } = useSWR('/api/produtos', fetcher, {refreshInterval: 10000})
  
  if(isLoading) return 'Carregando...' 

  return (
    <div>
        <h1 className='text-4xl font-black'>Produtos</h1>
        <p className='text-2xl my-10'>
          Lista de Produtos.
        </p>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {data.data.map(produto => (
              <Produto
                key={produto.imagen}
                produto={produto}
                botaoDisponivel={true}
              />
          ))}
        </div>
    </div>
  )
}
