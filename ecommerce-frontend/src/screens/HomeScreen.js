import axios from 'axios';
import { useEffect, useReducer } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from "../components/Product";
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const ActionTypes = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

const initialState = {
  products: [],
  loading: true,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case ActionTypes.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ActionTypes.FETCH_REQUEST });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: result.data });
      } catch (err) {
        dispatch({ type: ActionTypes.FETCH_FAIL, payload: err.message });
      }
    };

    // Call fetchData function to initiate the request
    fetchData();
  }, []);

  return (
    <div>
    <Helmet>
      <title>amazona</title>
    </Helmet>
      <h1>Featured Products</h1>
      <div className='products'>
        {
          loading ? (
            <LoadingBox/>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
      <Row>
           { products.map(product => (
           <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
              </Col> 
            ))}
            </Row>
          )
        }
      </div>
    </div>
  );
}

export default HomeScreen;