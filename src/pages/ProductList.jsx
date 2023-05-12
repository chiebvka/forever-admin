import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";


const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];



const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
for (let i = 0; i < productState.length; i++) {
  data1.push({
    key: i + 1,
    title: productState[i].title,
    brand: productState[i].brand,
    category: productState[i].category,
    color: productState[i].color.title,
    price: `${productState[i].price}`,
    action:  <>
                <Link to="/" className='fs-5'><CiEdit /></Link> 
                <Link className='ms-3 fs-5 text-danger' to="/"><AiOutlineDelete /></Link> 
            </> 
  });
}

  
  return (
    <div>
    <h3 className="mb-4 title">Products </h3>
    <div>
        <Table 
            columns={columns} 
            dataSource={data1} 
        />
    </div>
</div>
  )
}

export default ProductList