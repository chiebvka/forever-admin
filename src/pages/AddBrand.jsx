import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";


let schema = Yup.object().shape({
  title: Yup.string().required("Brand Name is Required"),
});

const AddBrand = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  // useEffect(() => {
  //   if (getBrandId !== undefined) {
  //     dispatch(getABrand(getBrandId));
  //   } else {
  //     dispatch(resetState());
  //   }
  // }, [getBrandId]);



  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    // if (isSuccess && updatedBrand) {
    //   toast.success("Brand Updated Successfullly!");
    //   navigate("/admin/list-brand");
    // }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);



  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     title: brandName || "",
  //   },
  //   validationSchema: schema,
  //   onSubmit: (values) => {
  //     if (getBrandId !== undefined) {
  //       const data = { id: getBrandId, brandData: values };
  //       dispatch(updateABrand(data));
  //       dispatch(resetState());
  //     } else {
  //       dispatch(createBrand(values));
  //       formik.resetForm();
  //       setTimeout(() => {
  //         dispatch(resetState());
  //       }, 300);
  //     }
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema, 
    onSubmit: (values) => {
      dispatch(createBrand(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });





  return (
    <div>
        <h3 className="mb-4 title">Add Brands </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                    type="text" 
                    label="Add Brands" 
                    name="title" 
                    onCh={formik.handleChange("title")} 
                    onBlr={formik.handleBlur("title")} 
                    val={formik.values.title}
                    id="brand"
                />
                  <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <button type='submit' className='btn btn-success border-0 rounded-3 my-5' >Add Brands</button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand