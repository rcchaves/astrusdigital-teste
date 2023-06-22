import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import clienteAxios from '../config/axios';


const PedidosContext = createContext();

const PedidosProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaAtual, setCategotiaAtual] = useState({});
    const [modal, setModal] = useState(false);
    const [produto, setProduto] = useState({});
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);

      

    useEffect(() => {
        const novoTotal = order.reduce( (total, produto) => (produto.preco * produto.
            quantidade) + total, 0)
        setTotal(novoTotal)
    }, [order])

    const receberCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data)
            setCategotiaAtual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        receberCategorias();
    }, [])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategotiaAtual(categoria)

    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProduto = produto => {
        setProduto(produto)
    }

    const handleAgregarPedido = ({categoria_id, ...produto}) => {
        if(order.some( orderState => orderState.id === produto.id )) {
            const orderAtualizado = order.map( orderState => orderState.id === produto.
                id ? produto : orderState)
            setOrder(orderAtualizado)
            toast.success('Pedido Atualizado')
        } else{
            setOrder([...order, produto])
            toast.success('Adicionado ao Pedido')
        }
    }

    const handleEditarQuantidade = id => {
        const produtoAtualizar = order.filter(produto => produto.id === id)[0]
        setProduto(produtoAtualizar)
        setModal(!modal)
    }

    const handleEditarProduto = id => { 
        const produtoAtualizar = produto.filter(produto => produto.id !== id)
        setProduto(produtoAtualizar)
        console.log(produtoAtualizar)
        // setModal(!modal)
    }

    const handleEliminarProdutoPedido = id => {
        const pedidoAtualizado = order.filter(produto => produto.id !== id)
        setOrder(pedidoAtualizado)
        toast.success('Produto removido do pedido')
    }

    const handleSubmitNovaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.post('/api/pedidos', 
            {
                total,
                produtos: order.map(produto => {
                    return {
                        id: produto.id,
                        quantidade: produto.quantidade
                    }
                })
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);
            setTimeout(() => {
                setOrder([])
            }, 1000);
            
            //Fecha a sessao ao finalizar o pedido
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProdutoEsgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/produtos/${id}`, { source: 'button' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                 
            })
            toast.success('Produto Atualizado')
        } catch (error) {
            console.log(error)
        } 
              
    }

    const handleClickExcluirProduto = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const response = await clienteAxios.delete(`/api/produtos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                 
            })
            if (response.status === 200) {
                const data = response.data;
                toast.success(data.message);
              }
        } catch (error) {
            toast.error('O produto está vinculado a um ou mais pedidos e não pode ser excluído');
        } 
              
    }
    
    //Cadastro de Produtos
    const handleSubmitCadastroProduto = async (dados) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            
          const formData = new FormData();
          formData.append('nome', dados.nome);
          formData.append('preco', dados.preco);
          formData.append('imagen', dados.imagen);
          formData.append('categoria_id', dados.categoria_id);         
                
          const { data } = await clienteAxios.post('/api/produtos', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', 
            },
          });
          toast.success(data.message);          
        } catch (error) {  
             
            console.log(error);
        }
      };


    
    
    return(
        <PedidosContext.Provider value={{
            categorias,
            categoriaAtual,
            handleClickCategoria,
            modal,
            handleClickModal,
            produto,
            handleSetProduto,
            order, 
            handleAgregarPedido,
            handleEditarQuantidade,
            handleEliminarProdutoPedido,
            total,
            handleSubmitNovaOrden,
            handleClickCompletarPedido,
            handleClickProdutoEsgotado,
            handleSubmitCadastroProduto,
            handleClickExcluirProduto
        }}>

        {children}
        </PedidosContext.Provider>
    )
}

export {
    PedidosProvider
}

export default PedidosContext