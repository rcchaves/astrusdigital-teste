import { createRef, useState } from 'react';
import CategoriaSelect from '../components/CategoriasSelect';
import { useNavigate, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import usePedido from '../hooks/usePedidos';


export default function NovoProduto() {
const { categorias } = usePedido();
const navigate = useNavigate(); 
  const { handleSubmitCadastroProduto } = usePedido();

  const nameRef = createRef();
  const priceRef = createRef();
  const imageRef = createRef();
  const categoryRef = createRef();

  const [errores, setErrores] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      nome: nameRef.current.value,
      preco: priceRef.current.value,
      imagen: imageRef.current.files[0], 
      categoria_id: categoryRef.current.value,
    };

    handleSubmitCadastroProduto(dados, setErrores);
    navigate('/terminal/produtos');
  };
  
  return (
    <>
      <h1 className="text-4xl font-black">Novo Produto</h1>
      <p>Preencha o formulário para adicionar um novo produto</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errores && errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">
              Nome:
            </label>
            <input
              type="text"
              required
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="nome"
              placeholder="Nome"
              ref={nameRef}
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="price">
              Preço:
            </label>
            <input
              type="number"
              required
              id="price"
              className="mt-2 w-full p-3 bg-gray-50"
              name="preco"
              placeholder="Preço"
              ref={priceRef}
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="image">
              Imagem:
            </label>
            <input
              type="file"
              required
              id="image"
              className="mt-2 w-full p-3 bg-gray-50"
              name="imagen"
              accept=".jpg"
              ref={imageRef}
            />
            <p className="text-red-500 text-sm">Somente arquivos de extensão JPG são permitidos.</p>
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="category">
              Categoria:
            </label>
            <select
              id="category"
              required
              className="mt-2 w-full p-3 bg-gray-50"
              name="categoria_id"
              ref={categoryRef}
            >
              <option value="">Selecione uma categoria</option>
              {categorias && categorias.map((categoria) => (
                <CategoriaSelect key={categoria.id} categoriaSelect={categoria} />
              ))}
            </select>
          </div>
          <input
            type="submit"
            value="Criar Produto"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/terminal/produtos">Voltar para a lista de produtos</Link>
      </nav>
    </>
  );
}
