import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/CryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}><strong>Exchanges</strong></Col>
        <Col span={7}><strong>24h Trade Volume</strong></Col>
        <Col span={7}><strong>Markets</strong></Col>
        <Col span={4}><strong>Change</strong></Col>
        </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel 
                key={exchange.id}
                showArrow={false}
                header={(
                  <Col span={24}>
                  <Row key={exchange.id}>
                  
                    <Col span={6}>
                      <Text>{exchange.rank}.</Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text>{exchange.name}</Text>
                    </Col>
                    <Col span={7}>${millify(exchange.volume)}</Col>
                 
                    <Col span={7}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={4}>{millify(exchange.marketShare)}%</Col>
                    
                  </Row>
                  </Col>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
      
    </>
  );
};

export default Exchanges;