import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { getOrders } from '../features/auth/authSlice';


const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];


const Orders = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOrders())
  }, []);


  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderedBy.firstname,
      product: orderState[i].products.map((i, j) => {
        return( 
                <ul key={j}>
                  <li>{i.product.title}</li> 
                </ul>
        );
      }),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleDateString(),
      action:  <>
                  <Link to="/" className='fs-5'><CiEdit /></Link> 
                  <Link className='ms-3 fs-5 text-danger' to="/"><AiOutlineDelete /></Link> 
              </> 
    });
  }


  return (
    <div>
        <h3 className="mb-4 title">Orders</h3>
        <div>
            <Table 
                columns={columns} 
                dataSource={data1} 
            />
        </div>
    </div>
  )
}

export default Orders