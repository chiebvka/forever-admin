import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";


let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const getBlogId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);

  
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blogs);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success('Blog Post Added Successfully!!!');
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);


  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    })
  });

  useEffect(() => {
    formik.values.images = img;
  }, [ img])
  


  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      images: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000)
    },
  });
  return (
    <div>
        <h3 className="mb-4 title">Add Blog</h3>
        {/* <Stepper
            steps={[
                { label: 'Add Blog Details' }, 
                { label: 'Upload Images' }, 
                { label: 'Finish' }
            ]}
            activeStep={1}
        /> */}
        <div className=''>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className='mt-4'>
                    <CustomInput 
                      type="text" 
                      label="Enter Blog Title" 
                      name="title" 
                      onCh={formik.handleChange("title")} 
                      onBlr={formik.handleBlur("title")} 
                      val={formik.values.title}
                    />
                </div>
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <select 
                  className='form-control py-3 mt-3' 
                  id=""
                  name="category" 
                  onChange={formik.handleChange("category")} 
                  onBlur={formik.handleBlur("category")} 
                  value={formik.values.category}
                >
                    <option value="">Select Blog Category</option>
                    {bCatState.map((i, j) => { 
                        return(
                          <option key={j} value={i.title}>
                            {i.title} 
                          </option>
                        )
                      })}
                </select>
                <div className="error">
                  {
                    formik.touched.category && formik.errors.category
                  }
                </div>
                <ReactQuill 
                    theme="snow" 
                    name="description" 
                    className="mt-3"
                    onChange={formik.handleChange("description")} 
                    value={formik.values.description}
                  />
                  <div className="error">
                  {
                    formik.touched.description && formik.errors.description
                  }
                </div>
                <div className='bg-white border-1 p-5 text-center mt-3'>
                  <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div className="showimages d-flex flex-wrap mt-3 gap-3">
                  {imgState?.map((i, j) => {
                    return(
                        <div className='position-relative' key={j}>
                          <button 
                            type='button'
                            onClick={() => dispatch(delImg(i.public_id))} 
                            className="btn-close position-absolute" 
                            style={{top: "10px", right: "10px"}}
                          ></button>
                          <img src={i.url} alt="" width={200} height={200} />
                        </div>
                    )
                  })}
                </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5' >Add Blog </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlog