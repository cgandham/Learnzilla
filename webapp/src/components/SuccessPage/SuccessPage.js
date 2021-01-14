import React, {Component} from 'react';
import { Row,Col } from 'react-bootstrap';

class SuccessPage extends Component {

  render() {
    return (

        <Row className="show-grid">
          <Col md={12}>
            <h2>Operation Successful</h2>
          </Col>
        </Row>
    )
  }
}


export default SuccessPage;
