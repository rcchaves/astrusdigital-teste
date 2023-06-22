import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
import usePedido from '../hooks/usePedidos';
import clienteAxios from '../config/axios'


export default function EditProduto() {

  const [status, setStatus] = useState(false);
  const [switchButton, setSwitchButton] = useState('Off');

  const handleClick = () => {
    setStatus(!status);
    setSwitchButton(!status ? 'ON' : 'OFF');   
  };

 
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const { id } = useParams();
  const { categorias } = usePedido();
  const [errores, setErrores] = useState([]);
  const navigate = useNavigate();
  const [imagem, setImagem] = useState(null);
  const [disponivelInicial, setDisponivelInicial] = useState(false);

  const handleSubmitEdit = async (e) => {
    if (e) {
      e.preventDefault();

    if (imagem && imagem.type !== 'image/jpeg') {
      alert('Apenas imagens .jpg são permitidas');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('categoria_id', categoria_id);
    formData.append('disponivel', 1);

    if (document.getElementById('image').files.length > 0) {
      
      formData.append('imagen', document.getElementById('image').files[0]);
    }

    formData.append('_method', 'patch');

    try {
      await clienteAxios.post(`/api/produtos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate('/terminal/produtos');
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
  }
};

  useEffect(() => {
    const getProdutoById = async () => {
      try {
        const response = await clienteAxios.get(`/api/produtos/${id}`);
        setNome(response.data.data.nome);
        setPreco(response.data.data.preco);
        setCategoriaId(response.data.data.categoria_id);
        setDisponivelInicial(response.data.data.disponivel);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };
    getProdutoById();
  }, []);

  useEffect(() => {
    setStatus(disponivelInicial);
    setSwitchButton(disponivelInicial ? 'ON' : 'OFF');
  }, [disponivelInicial]);

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  return (
    <>
      <h1 className="text-4xl font-black">Editar Produto ID: {id}</h1>
      <p>Edite as informações do produto</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmitEdit} noValidate>
          {errores && errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">
              Nome:
            </label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              type="text"
              required
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="nome"
              placeholder="Nome"
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="price">
              Preço:
            </label>
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              id="price"
              className="mt-2 w-full p-3 bg-gray-50"
              name="preco"
              placeholder="Preço"
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="image">
              Imagem:
            </label>
            <input
              type="file"
              id="image"
              className="mt-2 w-full p-3 bg-gray-50"
              name="imagen"
              accept=".jpg"
              onChange={handleImagemChange}
            />
            <p className="text-red-500 text-sm">Somente arquivos de extensão JPG são permitidos.</p>
          </div>
          <div className="mb-4">
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="disponivel"
                id="toggle"
                className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${status ? 'right-0 bg-green-500' : 'bg-red-500'}`}
                checked={status}
                onChange={handleClick}
              />
              <label
                htmlFor="toggle"
                className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${status ? 'bg-green-400' : 'bg-red-400'}`}
              ></label>
            </div>
        <label htmlFor="toggle" className="text-sm">
        Status do Produto
        </label>
      </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="category">
              Categoria:
            </label>
            <select
              id="category"
              onChange={(e) => setCategoriaId(e.target.value)}
              required
              className="mt-2 w-full p-3 bg-gray-50"
              name="categoria_id"
              value={categoria_id || ""}
            >
              <option value="">Selecione uma categoria</option>
              {categorias &&
                categorias.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                  >
                    {categoria.nome}
                  </option>
                ))}
            </select>
          </div>
          <input
            type="submit"
            value="Atualizar Produto"
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
