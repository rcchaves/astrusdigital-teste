import usePedido from "../hooks/usePedidos"

export default function Categoria({categoria}) {
    const {handleClickCategoria, categoriaAtual} = usePedido();
    const {icone, id, nome} = categoria
   
  return (
    <div className= {`${categoriaAtual.id === id ? "bg-amber-400" : "bg-white"}
        flex  items-center gap-4 border w-full p-3
        hover:bg-amber-400 cursor-pointer`} >
        
            <img src={`/img/icone_${icone}.png`} 
                alt="icone"
                className="w-12"
            />

            <button 
                className="text-lg  font-bold cursor-pointer truncate" 
                type="button"
                onClick={() => handleClickCategoria(id)}>
                {nome}
            </button>
    </div>
  )
}
