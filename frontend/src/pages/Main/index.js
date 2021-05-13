import api from '../../api';
import './styles.css';
import { useState, useEffect } from "react";
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useHistory } from "react-router-dom";

export default function Main() {

  let history = useHistory();

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [isError, setIsError] = useState(false);

  function tokenExpirado() {
    alert('Token expirado, faça o login novamente.');
    logout();
    history.push('/login');
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  const getProducts = () => {

    api.get('/products', { 'headers': { 'x-access-token': sessionStorage.getItem('token') }})
    .then((response) => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
      if(error.response.status === 500) {
        tokenExpirado();
      }
    })
  }

  const deleteProduct = (id) => {
    api.delete(`/products/${id}`, { 'headers': { 'x-access-token': sessionStorage.getItem('token') }})
    .then(() => {
      getProducts();
    })
    .catch(error => {
      console.log(error); 
      if(error.response.status === 500) {
        tokenExpirado();
      }
    })
  }

  const addProduct = async ({name, price, imageUrl}) => {
    api.post('/products', {name, price, imageUrl}, {
      headers: {'x-access-token': sessionStorage.getItem('token')}
    })
    .then(() => {
      getProducts();
      setIsError(false);
    }).catch(error => {
      if(error.response.status === 500) {
        tokenExpirado();
      } else {
        setIsError(true);
      }
    })
  }

  const editProduct = ({name, price, imageUrl}) => {
    setName(name);
    setPrice(price);
    setImageUrl(imageUrl);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    await addProduct({name, price, imageUrl});
  }

    useEffect(() => {
      getProducts();
    }, []);

  return (
    <>
    <header>
      <div className="logo">
        Instrumentos CRUD
      </div>
        <button className="logout" onClick={logout}>logout</button>
    </header>
    <main>
      <div className="add">
        <form className="add-product" onSubmit={handleSubmit}>
          <div className="name">
            <span>Nome</span>
            <input  
              type="text" 
              placeholder="Nome do instrumento" 
              onChange={e => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="link">
            <span>Url da imagem</span>
            <input
              type="text"
              placeholder="Url completa da imagem"
              onChange={e => setImageUrl(e.target.value)}
              value={imageUrl}
            />
          </div>
          <div className="price">
            <span>Preço</span>
            <input
              type="number" 
              min="0" 
              placeholder="Preço (R$)" 
              onChange={e => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="addButton">
            <button type="submit">Adicionar/Editar</button>
          </div>
        </form>
      </div>

      {isError && (
        <p class="error">Todos os campos devem ser preenchidos!</p>
      )}

      <ul>
        {data.map(product => {
          return(
            <li key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.imageUrl} alt={product.name}/>
              <p>R$ {product.price},00</p>
              <div className="options">
                <button onClick={() => deleteProduct(product.id)}><FiTrash2 color="#fff" size="1.5rem"/></button>
                <button onClick={() => editProduct(product)}><FiEdit color="#fff" size="1.5rem"/></button>
              </div>
            </li>
          )
        })}

      </ul>
    </main>
    </>
  )
}