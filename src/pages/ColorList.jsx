import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { getColors } from '../features/color/colorSlice';


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
    title: 'Action',
    dataIndex: 'action',
  },
];


const ColorList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getColors())
  }, []);


  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action:  <>
                  <Link to="/" className='fs-5'><CiEdit /></Link> 
                  <Link className='ms-3 fs-5 text-danger' to="/"><AiOutlineDelete /></Link> 
              </> 
    });
  }

  return (
    <div>
        <h3 className="mb-4 title">Colors</h3>
        <div>
            <Table 
                columns={columns} 
                dataSource={data1} 
            />
        </div>
    </div>
  )
}

export default ColorList