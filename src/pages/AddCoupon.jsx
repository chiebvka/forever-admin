import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
createCoupon,
getACoupon,
resetState,
updateACoupon,
} from "../features/coupon/couponSlice";

let schema = Yup.object().shape({
    name: Yup.string().required("Coupon Name is Required"),
    expiry: Yup.date().required("Expiry Date is Required"),
    discount: Yup.number().required("Discount Percentage is Required"),
  });

const AddCoupon = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


      // const getBrandId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    brandName,
    updatedBrand,
  } = newCoupon;

  // useEffect(() => {
  //   if (getBrandId !== undefined) {
  //     dispatch(getABrand(getBrandId));
  //   } else {
  //     dispatch(resetState());
  //   }
  // }, [getBrandId]);



  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfullly!");
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
      name: '',
      expiry: '',
      discount: '',
    }, 
    validationSchema: schema, 
    onSubmit: (values) => {
      dispatch(createCoupon(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });

  
  return (
    <div>
         <h3 className="mb-4 title">Add Coupon </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                    type="text" 
                    label="Enter Coupon Name" 
                    name="name" 
                    onCh={formik.handleChange("name")} 
                    onBlr={formik.handleBlur("name")} 
                    val={formik.values.name}
                    id="brand"
                />
                  <div className="error">
                  {
                    formik.touched.name && formik.errors.name
                  }
                </div>
                <CustomInput
                    type="date"
                    name="expiry"
                    onCh={formik.handleChange("expiry")}
                    onBlr={formik.handleBlur("expiry")}
                    val={formik.values.expiry}
                    label="Enter Expiry Data"
                    id="date"
                />
                <div className="error">
                    {formik.touched.expiry && formik.errors.expiry}
                </div>
                <CustomInput
                    type="number"
                    name="discount"
                    onCh={formik.handleChange("discount")}
                    onBlr={formik.handleBlur("discount")}
                    val={formik.values.discount}
                    label="Enter Discount"
                    id="discount"
                />
                <div className="error">
                    {formik.touched.discount && formik.errors.discount}
                </div>
                <button type='submit' className='btn btn-success border-0 rounded-3 my-5' >Create Coupon</button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon