import { useState, useEffect } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { getTranslatedName } from '../utils/translations';

const ItemForm = ({ formData, setFormData, handleSubmit, alert, apiItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (formData.name) {
      setSearchTerm(getTranslatedName(formData.name));
    } else {
      setSearchTerm('');
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectItem = (item) => {
    setFormData({
      ...formData,
      name: item.name,
      type: item.type,
    });
    setSearchTerm(item.translatedName);
    setShowSuggestions(false);
  };

  const filteredItems = apiItems.filter(item =>
    item.translatedName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Selecionar Item</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Buscar item..."
              required
            />
          </InputGroup>
          {showSuggestions && (
            <div className="suggestions-list">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="suggestion-item"
                    onMouseDown={() => handleSelectItem(item)}
                  >
                    {item.translatedName}
                  </div>
                ))
              ) : (
                <div className="suggestion-item">Nenhum item encontrado</div>
              )}
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="Block">Bloco</option>
            <option value="Tool">Ferramenta</option>
            <option value="Food">Comida</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Raridade</Form.Label>
          <Form.Select
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="Common">Comum</option>
            <option value="Uncommon">Incomum</option>
            <option value="Rare">Raro</option>
            <option value="Epic">Épico</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            max="64"
            placeholder="Ex.: 64"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="crafted">Craftado</option>
            <option value="collected">Coletado</option>
            <option value="not-obtained">Não Obtido</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          {formData.id ? 'Atualizar' : 'Adicionar'}
        </Button>
      </Form>
    </>
  );
};

export default ItemForm;