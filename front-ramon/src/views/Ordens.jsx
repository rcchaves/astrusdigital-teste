import useSWR from 'swr'
import usePedido from "../hooks/usePedidos"
import clienteAxios from '../config/axios'
import { formatarDinheiro } from '../helpers'

export default function Ordenes() {
    
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {refreshInterval: 1000})

    const {handleClickCompletarPedido} = usePedido()

    if(isLoading) return 'Carregando...'

  return (
    <div>
  

        <h1 className='text-4xl font-black'>Ordens</h1>
        <p className='text-2xl my-10'>
          Lista de orden de Pedidos!
        </p>
       
    <div className="flex items-center">
        <div className="flex items-center mr-4">
        <p className="text-sm p-5 font-bold">Legenda:</p>
            <div className="w-4 h-4 rounded-full bg-indigo-100 mr-2"></div>            
            <p className="text-sm">Preparando pedido</p>
        </div>
        <div className="border-l border-gray-400 h-8"></div>
        <div className="flex items-center ml-4">
            <div className="w-4 h-4 rounded-full bg-white border border-gray-500 mr-2"></div>
            <p className="text-sm">Aceitar pedido</p>
        </div>
    </div>
        <div className='grid grid-cols-2 gap-5'>
            {data.data.data.map(pedido => (
                <div key={pedido.id} className={`${pedido.status ? 'bg-indigo-100' : 'bg-white'} p-5 shadow space-y-2 border-b`}>
                    <p className='text-xl font-bold text-slate-600'>
                        Conteúdo do Pedido:
                    </p>

                    {pedido.produtos.map(produto => (
                        <div
                            key={produto.id}
                            className='border-b border-b-slate-200 last-of-type:border-none py-4'
                        >
                            <p className='text-sm'>ID: {produto.id}</p>
                            <p>{produto.nome}</p>
                            <p>
                                Quantidade: {''}
                                <span className='font-bold'>{produto.pivot.quantidade}</span>
                            </p>

                        </div>
                    ))}

                    <p className='text-lg font-bold text-slate-600'>
                        Cliente: {''}
                        <span className='font-normal'>{pedido.user.name}</span>
                    </p>

                    <p className='text-lg font-bold text-amber-500'>
                        Total a Pagar: {''}
                        <span className='font-normal text-slate-600'>{ formatarDinheiro( pedido.total )}</span>
                    </p>

                    <button
                        type="button"
                        className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'
                        onClick={() => handleClickCompletarPedido(pedido.id)}
                    >
                    {pedido.status ? 'Preparando' : 'Aceitar'}
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}
