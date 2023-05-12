import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { RiDashboardFill, RiQuestionnaireLine, RiCouponLine } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import { MdLibraryAdd, MdOutlineDiscount } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { SiBrandfolder } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { TbBrandBlogger } from "react-icons/tb";
import { AiOutlineBgColors } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2 className='text-black fs-5 text-center py-4 mb-0 '>
            <span className='sm-logo'> DC</span>
            <span className='lg-logo'> Deluccis</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if ( key === "signout") {

            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <RiDashboardFill  className='fs-5'/>,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <HiUserGroup  className='fs-5'/>,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <GiShoppingCart className='fs-5' />,
              label: 'Catalog', 
              children: [
                {
                  key: "product",
                  icon: <MdLibraryAdd  className='fs-5'/>,
                  label: 'Add Product', 
                },
                {
                  key: "product-list",
                  icon: <MdLibraryAdd  className='fs-5'/>,
                  label: 'Product List', 
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder  className='fs-5'/>,
                  label: 'Brands ', 
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder  className='fs-5'/>,
                  label: 'Brand List ', 
                },
                {
                  key: "category",
                  icon: <BiCategory  className='fs-5'/>,
                  label: 'Category ', 
                },
                {
                  key: "category-list",
                  icon: <BiCategory  className='fs-5'/>,
                  label: 'Category List ', 
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors  className='fs-5'/>,
                  label: 'Color ', 
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors  className='fs-5'/>,
                  label: 'Color List ', 
                },
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList  className='fs-5'/>,
              label: 'Orders',
            },
            {
              key: 'blog',
              icon: <TbBrandBlogger  className='fs-5'/>,
              label: 'Blog',
              children: [
                {       
                  key: 'add-blog',
                  icon: <FiEdit3  className='fs-5'/>,
                  label: 'Add Blog',
                },
                {       
                  key: 'blog-list',
                  icon: <TbBrandBlogger  className='fs-5'/>,
                  label: 'Blog List',
                },
                {       
                  key: 'blog-category',
                  icon: <FiEdit3  className='fs-5'/>,
                  label: 'Add Blog Category',
                },
                {       
                  key: 'blog-category-list',
                  icon: <TbBrandBlogger  className='fs-5'/>,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'marketing',
              icon: <MdOutlineDiscount  className='fs-5'/>,
              label: 'Marketing',
              children: [
                {       
                  key: 'coupon',
                  icon: <FiEdit3  className='fs-5'/>,
                  label: 'Add Coupon',
                },
                {       
                  key: 'coupon-list',
                  icon: <RiCouponLine  className='fs-5'/>,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <RiQuestionnaireLine  className='fs-5'/>,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header   
          className='d-flex justify-content-between ps-2 pe-5'
          style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-3 align-items-center '>
            <div className='position-relative'>
              <IoIosNotificationsOutline className='fs-4' />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>
            </div>
            <div className='d-flex gap-4 align-items-center dropdown'>
              <div>
                <img 
                  width={40}
                  height={40}
                  src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt=""
                  />
              </div>
              <div role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='mb-0'>Narnia</h5>
                <p className='mb-0'>narnia@narnia.com</p>
              </div>
              <ul  className="dropdown-menu" aria-labelledby='dropdownMebuLink'>
                <li><Link className="dropdown-item py-1 mb-1" style={{"height": "auto", lineHeight: "20px"}} to="/">View Profile</Link></li>
                <li><Link className="dropdown-item py-1 mb-1" style={{"height": "auto", lineHeight: "20px"}} to="/">Inbox</Link></li>
                <li><Link className="dropdown-item py-1 mb-1" style={{"height": "auto", lineHeight: "20px"}} to="/">Sign Out</Link></li>
              </ul>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"

          />
            <Outlet />
    
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;