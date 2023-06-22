import usePedido from "../hooks/usePedidos"
import  Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"

export default function Sidebar() {

    const {categorias} = usePedido()
    const {logout, user} = useAuth({middleware: 'auth'})

  return (
    <aside className="md:w-72">
        <div className="p-4">
            <img
                src="img/pizza-hut.png"
                className="w-40"
                alt="logo marca" />
        </div>

        <p className="my-10 text-xl text-center">Óla: {user?.name}</p>

        <div className="mt-10">
            {categorias.map(categoria => (
                <Categoria
                    key={categoria.id}
                    categoria = {categoria}
                />
            ))}
        </div>
        <div className="my-5 px-5">
            <button
            type="buttom"
            className="text-center bg-red-500 w-full p-3 
            font-bold text-white truncate"
            onClick={logout}>

                Sair X
            </button>
        </div>
    </aside>

  )
}
