import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createNewblogCat, resetState } from '../features/bcategory/bcategorySlice';


let schema = Yup.object().shape({
  title: Yup.string().required("Blog Category Name is Required"),
});

const AddBlogcategory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createBlogCategory,
    brandName,
    updatedBrand,
  } = newBlogCategory;


  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      toast.success("Blog Catgeory Added Successfullly!");
    }
    // if (isSuccess && updatedBrand) {
    //   toast.success("Brand Updated Successfullly!");
    //   navigate("/admin/list-brand");
    // }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createBlogCategory]);




  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema, 
    onSubmit: (values) => {
      dispatch(createNewblogCat(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });

  return (
    <div>
        <h3 className="mb-4 title">Add Blog Category </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                  type="text" 
                  label="Enter Blog Category"
                  name="title" 
                  onCh={formik.handleChange("title")} 
                  onBlr={formik.handleBlur("title")} 
                  val={formik.values.title}
                  id="blogcat" 
                />
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <button type='submit' className='btn btn-success border-0 rounded-3 my-5' >Add Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogcategory