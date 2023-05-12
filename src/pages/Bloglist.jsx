import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';


const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];


const Bloglist = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getBlogs())
  }, []);

  const blogState = useSelector((state) => state.blogs.blogs)

  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogState[i].title,
      catgegory: blogState[i].catgegory,
      action: <>
                <Link to="/" className='fs-5'><CiEdit /></Link> 
                <Link className='ms-3 fs-5 text-danger' to="/"><AiOutlineDelete /></Link> 
              </> ,
    });
  }


  return (
    <div>
        <h3 className="mb-4 title">Blogs List</h3>
        <div>
            <Table 
                columns={columns} 
                dataSource={data1} 
            />
        </div>
    </div>
  )
}

export default Bloglist