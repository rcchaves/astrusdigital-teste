import { formatarDinheiro } from "../helpers"
import { Link } from "react-router-dom";
import usePedido from "../hooks/usePedidos";

export default function Produto({produto, botaoAdicionar = false, botaoDisponivel = false}) {

    const { handleClickModal, handleSetProduto, handleClickProdutoEsgotado, handleClickExcluirProduto  } = usePedido();
    const { id, nome, imagen, preco, disponivel} = produto
    

  return (
    <div className="border p-3 shadow bg-white">
        <img
            alt={`imagen ${nome}`}
            className="w-full"
            src={`http://127.0.0.1:8000/storage/${imagen}`}
        />
  
        <div className="p-5">
            <h3 className="text-2xl font-bold">{nome}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatarDinheiro(preco)}
            </p>

            {botaoAdicionar && (
                <button
                  type="button"
                  className={`${disponivel ? 'bg-indigo-600' : 'bg-indigo-100 hover:bg-indigo-800'} hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold`}
                  onClick={() => {
                    handleClickModal();
                    handleSetProduto(produto);
                  }}
                  disabled={!disponivel}
                >
                 {disponivel ? 'Adicionar' : 'Esgotado'}
                </button>
              )}
            {botaoDisponivel && (
                <button
                    type="button"
                    className={`${disponivel ?  'bg-indigo-600' : 'bg-indigo-100'} hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold`}
                    onClick={() => handleClickProdutoEsgotado(produto.id)}
                >
                    {disponivel ?  'Produto Esgotado' : 'Adicionar Produto'}
                    
                </button>
            )}

            {botaoDisponivel && (
                <div className="flex justify-center gap-2 pb-4 mt-5">
            
                <Link to={`/terminal/editproduto/${id}`} className="bg-sky-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
                  onClick={() => handleClickExcluirProduto(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}

        </div>

    </div>
  )
}
