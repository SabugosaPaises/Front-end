import { useState, useEffect } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import ItemStats from './components/ItemStats';
import { saveToLocalStorage, getFromLocalStorage } from './utils/localStorage';
import itemsData from './data/items.json'; // Importa os dados estáticos
import './minecraft-theme.css';

const App = () => {
  const [items, setItems] = useState(getFromLocalStorage('minecraftItems'));
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    type: '',
    rarity: '',
    quantity: '',
    status: 'not-obtained',
    favorite: false,
    image: '',
  });
  const [alert, setAlert] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [apiItems, setApiItems] = useState([]);

  useEffect(() => {
    // Carrega os itens do arquivo estático
    try {
      const filteredItems = itemsData
        .filter(item => ['Block', 'Tool', 'Food'].includes(item.type))
        .map(item => ({
          ...item,
        }));
      console.log('Itens carregados:', filteredItems); // Log para depuração
      setApiItems(filteredItems);
    } catch (err) {
      console.error('Erro ao carregar itens:', err);
      setAlert({ type: 'danger', message: 'Erro ao carregar itens. Verifique os dados locais.' });
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage('minecraftItems', items);
  }, [items]);

  const getItemImage = (name) => {
    const item = apiItems.find(i => i.name.toLowerCase() === name.toLowerCase());
    return item ? item.image : '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.rarity) {
      setAlert({ type: 'danger', message: 'Nome, tipo e raridade são obrigatórios!' });
      return;
    }
    if (formData.quantity && (formData.quantity < 1 || formData.quantity > 64)) {
      setAlert({ type: 'danger', message: 'Quantidade deve ser entre 1 e 64!' });
      return;
    }
    const image = getItemImage(formData.name);
    const updatedFormData = { ...formData, image };
    if (formData.id) {
      setItems(items.map(i => (i.id === formData.id ? updatedFormData : i)));
      setAlert({ type: 'success', message: 'Item atualizado com sucesso!' });
    } else {
      setItems([...items, { ...updatedFormData, id: Date.now() }]);
      setAlert({ type: 'success', message: 'Item adicionado com sucesso!' });
    }
    setFormData({ id: null, name: '', type: '', rarity: '', quantity: '', status: 'not-obtained', favorite: false, image: '' });
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
    });
  };

  const handleDelete = (id) => {
    setItems(items.filter(i => i.id !== id));
    setAlert({ type: 'success', message: 'Item excluído com sucesso!' });
  };

  const toggleFavorite = (id) => {
    setItems(
      items.map(i =>
        i.id === id ? { ...i, favorite: !i.favorite } : i
      )
    );
    setAlert({ type: 'success', message: 'Favorito atualizado com sucesso!' });
  };

  const handleClearCollection = () => {
    setItems([]);
    saveToLocalStorage('minecraftItems', []);
    setAlert({ type: 'success', message: 'Coleção limpa com sucesso!' });
    setShowClearModal(false);
  };

  return (
    <Container className="mt-5 minecraft-theme">
      <h1>Minha Coleção de Itens do Minecraft</h1>
      <div className="mb-3">
        <Button variant="danger" onClick={() => setShowClearModal(true)}>
          Limpar Coleção
        </Button>
      </div>
      <ItemForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        alert={alert}
        apiItems={apiItems}
      />
      <ItemStats items={items} />
      <ItemList
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toggleFavorite={toggleFavorite}
      />
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Limpeza da Coleção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja limpar toda a coleção? Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleClearCollection}>
            Limpar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;