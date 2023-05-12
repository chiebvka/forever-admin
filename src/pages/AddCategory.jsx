import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createCategory, resetState } from '../features/pcategory/pcategorySlice';




let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is Required"),
});

const AddCategory = () => {




  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const getCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    CategoryName,
    updatedCategory,
  } = newCategory;



  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    // if (isSuccess && updatedCategory) {
    //   toast.success("Category Updated Successfullly!");
    //   navigate("/admin/list-Category");
    // }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);




  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema, 
    onSubmit: (values) => {
      dispatch(createCategory(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });







  return (
    <div>
        <h3 className="mb-4 title">Add  Category </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                    type="text" 
                    label="Add Product Category"
                    name="title" 
                    onCh={formik.handleChange("title")} 
                    onBlr={formik.handleBlur("title")} 
                    val={formik.values.title}
                />
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <button type='submit' className='btn btn-success border-0 rounded-3 my-5' >Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory