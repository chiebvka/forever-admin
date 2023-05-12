import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";


const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const BrandList = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getBrands())
  }, []);

  const brandState = useSelector((state) => state.brand.brands);

  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: <>
                <Link to="/" className='fs-5'><CiEdit /></Link> 
                <Link className='ms-3 fs-5 text-danger' to="/"><AiOutlineDelete /></Link> 
              </> ,
    });
  }
  
  return (
    <div>
        <h3 className="mb-4 title">Brands </h3>
        <div>
            <Table 
                columns={columns} 
                dataSource={data1} 
            />
        </div>
    </div>
  )
}

export default BrandList