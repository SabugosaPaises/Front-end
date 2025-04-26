import { Card, Row, Col } from 'react-bootstrap';

const ItemStats = ({ items }) => {
  const statsByType = items.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const statsByRarity = items.reduce((acc, item) => {
    acc[item.rarity] = (acc[item.rarity] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-5">
      <h2>Estatísticas da Coleção</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Itens por Tipo</Card.Title>
              {Object.keys(statsByType).length > 0 ? (
                Object.entries(statsByType).map(([type, count]) => (
                  <Card.Text key={type}>
                    {type === 'Block' ? 'Bloco' : type === 'Tool' ? 'Ferramenta' : 'Comida'}: {count}
                  </Card.Text>
                ))
              ) : (
                <Card.Text>Nenhum item na coleção.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Itens por Raridade</Card.Title>
              {Object.keys(statsByRarity).length > 0 ? (
                Object.entries(statsByRarity).map(([rarity, count]) => (
                  <Card.Text key={rarity}>
                    {rarity === 'Common' ? 'Comum' :
                     rarity === 'Uncommon' ? 'Incomum' :
                     rarity === 'Rare' ? 'Raro' :
                     rarity === 'Epic' ? 'Épico' : rarity}: {count}
                  </Card.Text>
                ))
              ) : (
                <Card.Text>Nenhum item na coleção.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ItemStats;