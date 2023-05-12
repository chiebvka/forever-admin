import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createColor, resetState } from '../features/color/colorSlice';

let schema = Yup.object().shape({
  title: Yup.string().required("Color is Required"),
});

const Addcolor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();



  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    brandName,
    updatedBrand,
  } = newColor;


  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    // if (isSuccess && updatedBrand) {
    //   toast.success("Brand Updated Successfullly!");
    //   navigate("/admin/list-brand");
    // }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);




  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema, 
    onSubmit: (values) => {
      dispatch(createColor(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });




  return (
    <div>
        <h3 className="mb-4 title">Add Color</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                    type="color" 
                    label="Enter Color" 
                    name="title" 
                    onCh={formik.handleChange("title")} 
                    onBlr={formik.handleBlur("title")} 
                    val={formik.values.title}
                    id="color"
                />
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <button type='submit' className='btn btn-success border-0 rounded-3 my-5' >Add Color</button>
            </form>
        </div>
    </div>
  )
}

export default Addcolor