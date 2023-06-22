import { formatarDinheiro } from '../helpers';
import usePedido from "../hooks/usePedidos"
import { useAuth } from "../hooks/useAuth";
import ResumenProduto from './ResumenProduto';

export default function Resumen() {

  const comprovarPedido = () => order.length === 0; 

  const {order, total, handleSubmitNovaOrden} = usePedido();
  const { logout} = useAuth({})

  const handleSubmit = e => {
    e.preventDefault();

    handleSubmitNovaOrden(logout);
  }
    
    return (
      <aside className="w-72 h-screen overflow-y-scroll p-5">
        <h1 className="text-4xl font-black">
          Meu Pedido 
          </h1>
          <p className="text-lg my-5">
            Resumo do pedido e total:
          </p>
          <div className='py-10'>
            {order.length === 0 ? (
              <p className='texte-center text-2xl'>
                Você não possui produtos em seu pedido.
              </p>
            ) : (
              order.map(produto => (
                <ResumenProduto
                  key={produto.id}
                  produto={produto}
                />
              ))
            )}
          </div>
          <p className='text-xl mt-10'>
            Total: {''}
            {formatarDinheiro(total)}
          </p>
          <form className='w-full'
            onSubmit={handleSubmit}>

            <div className='mt-05'>
              <input
                type='submit'
                className={`${comprovarPedido() ? 
                  'bg-indigo-100' : 
                  'bg-indigo-600 hover:bg-indigo-800'}
                  px-5 py-2 rounded
                  uppercase font-bold text-white text-center w-full cursor-pointer`}
                value="Confirmar Pedido"
                disabled={comprovarPedido()}
              />

            </div>
          </form>
      </aside>
    )
}
