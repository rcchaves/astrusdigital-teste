import useSWR from 'swr'
import Produto from "../components/Produto"
import usePedido from "../hooks/usePedidos"
import clienteAxios from '../config/axios';


export default function Inicio() {

    const {categoriaAtual} = usePedido();

    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => clienteAxios('/api/produtos', {
        headers: {
        Authorization: `Bearer ${token}`
        }
    }).then(data => data.data)

    const { data, error, isLoading } = useSWR('/api/produtos', fetcher, {
        refreshInterval: 1000
    })

    if(isLoading) return 'Carregando...';
    const produtos = data.data.filter(produto => produto.categoria_id === categoriaAtual.id)
   
  return (
    <>
        <h1 className=" text-4xl font-black">{categoriaAtual.nome}</h1>
        <p className="text-2xl my-10">
            Escolha seu pedido
        </p>

        <div className=" grid gap-4 grid-cols-1  md:grid-cols-2 xl:grid-cols-3">
            {produtos.map(produto => (
                <Produto
                key={produto.imagen}
                produto={produto}
                botaoAdicionar={true}/>
            ))}
        </div>
    </>
  )
}
