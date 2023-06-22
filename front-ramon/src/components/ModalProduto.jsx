import { useState, useEffect } from "react";
import usePedido from "../hooks/usePedidos"
import { formatarDinheiro } from "../helpers";


export default function ModalProduto() {

    const { produto, handleClickModal, handleAgregarPedido, order } = usePedido();
    const [quantidade, setQuantidade] = useState(1);
    const [edicao, setEdicao] = useState(false);

    useEffect(() =>{
        if(order.some( orderState => orderState.id === produto.id )) {
            const produtoEditado = order.filter( orderState => orderState.id ===
            produto.id)[0]
            setQuantidade(produtoEditado.quantidade)
            setEdicao(true)
        }
    }, [order])

  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <img
                alt={`imagem produto ${produto.nome}`}
                src={`http://127.0.0.1:8000/storage/${produto.imagen}`}
            />
        </div>
            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-2 right-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">{produto.nome}</h1>
                <p className="mt-5 font-black text-5xl text-amber-500">{formatarDinheiro(produto.preco)}</p>

                <div className="flex gap-4 mt-5">
                    <button
                        type="button"
                        onClick={() => 
                            {if(quantidade <=1) return
                            setQuantidade(quantidade - 1);
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <p className="text-3xl">{quantidade}</p>
                
                
                    <button
                        type="button"
                        onClick={() => 
                            {if(quantidade >=5) return
                            setQuantidade(quantidade + 1);
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <button
                    type=""
                    className="bg-indigo-600 houver:bg-indigo-800 px-5 py-2 mt-5 text-white 
                    font-bold uppercase rounded"
                    onClick={() => {
                        handleAgregarPedido({...produto, quantidade})
                        handleClickModal()
                    }}>
                        {edicao ? 'Salvar alteração' : 'Adicionar ao pedido'}
                </button>                
        </div>            
    </div>
          
    )
}
