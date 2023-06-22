import {Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminSidebar() {

    const { logout } = useAuth({middleware: 'auth'});

    return (
        <aside className="md:w-72 h-screen">
            <div className="p-4">
                <img 
                    src="/img/pizza-hut.png"
                    alt="imagen logotipo"
                    className="w-40"
                />
            </div>

            <nav className='flex flex-col p-4'>
                <Link to="/terminal" className='font-bold text-lg'>Ordens</Link>
                <Link to="/terminal/produtos" className='font-bold text-lg'>Produtos</Link>
                <Link to="/terminal/cadastroproduto" className='font-bold text-lg'>Cadastro Produtos</Link>
            </nav>

            <div className='my-5 px-5'>
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    onClick={logout}
                >
                    Encerrar Sessão
                </button>
            </div>
        </aside>
    )
}
