import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Cadastro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const {cadastro} = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();

        const dados = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        
        cadastro(dados, setErrores)
    }

  return (
    <>
        <h1 className="text 4xl font-black">Fazer Cadastro</h1>
        <p>Preencha o formulário para criar sua conta</p>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmit}
                    noValidate>

                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)  : null }  

                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="name">Nome:
                        </label>
                        <input type="text" 
                            id="name" 
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Nome"
                            ref={nameRef}
                            />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="email">Email:
                        </label>
                        <input type="email" 
                            id="email" 
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Email"
                            ref={emailRef}/>
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="password">Senha:
                        </label>
                        <input type="password" 
                            id="password" 
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Senha"
                            ref={passwordRef}/>
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-800"
                            htmlFor="password_confirmation">Confirmar Senha:
                        </label>
                        <input type="password" 
                            id="password_confirmation" 
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            placeholder="Confirmar Senha"
                            ref={passwordConfirmationRef}/>
                    </div>
                    <input
                    type="submit"
                    value="Criar Conta"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3
                                uppercase font-bold cursor-pointer"/> 
                </form>
            </div>
            <nav className="mt-5">
                <Link to="/admin/login">
                    Já tenho conta. Fazer Login!
                </Link>    
            </nav>
    </>
  )
}
