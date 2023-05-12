import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/bcategory/bcategorySlice';


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


const BlogCategorylist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, []);

  const bCatState = useSelector((state) => state.bCategory.bCategories);

  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,
      action: <>
                <Link to="/" className='fs-5'><CiEdit /></Link> 
                <Link className='ms-3 fs-5 text-danger' to="/"><AiOutlineDelete /></Link> 
              </> ,
    });
  }


  return (
    <div>
        <h3 className="mb-4 title">Blog Categories</h3>
        <div>
            <Table 
                columns={columns} 
                dataSource={data1} 
            />
        </div>
    </div>
  )
}

export default BlogCategorylist