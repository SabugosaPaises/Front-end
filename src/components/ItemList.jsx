import { Table, Button } from 'react-bootstrap';
import { getTranslatedName } from '../utils/translations';

const ItemList = ({ items, handleEdit, handleDelete, toggleFavorite }) => {
  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 'table-success';
      case 'Uncommon':
        return 'table-info';
      case 'Rare':
        return 'table-primary';
      case 'Epic':
        return 'table-danger';
      default:
        return '';
    }
  };

  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>Imagem</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Raridade</th>
          <th>Quantidade</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className={getRarityClass(item.rarity)}>
            <td>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                />
              )}
            </td>
            <td>{getTranslatedName(item.name)}</td>
            <td>{item.type === 'Block' ? 'Bloco' : item.type === 'Tool' ? 'Ferramenta' : 'Comida'}</td>
            <td>
              {item.rarity === 'Common' ? 'Comum' :
               item.rarity === 'Uncommon' ? 'Incomum' :
               item.rarity === 'Rare' ? 'Raro' :
               item.rarity === 'Epic' ? 'Épico' : ''}
            </td>
            <td>{item.quantity || '-'}</td>
            <td>
              {item.status === 'crafted' ? 'Craftado' :
               item.status === 'collected' ? 'Coletado' :
               item.status === 'not-obtained' ? 'Item não obtido' : ''}
            </td>
            <td>
              <Button
                variant="warning"
                onClick={() => handleEdit(item)}
                className="me-2"
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(item.id)}
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ItemList;