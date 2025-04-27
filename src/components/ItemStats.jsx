import { Card, Row, Col } from 'react-bootstrap';

const ItemStats = ({ items }) => {
  const statsByType = items.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-5">
    </div>
  );
};

export default ItemStats;