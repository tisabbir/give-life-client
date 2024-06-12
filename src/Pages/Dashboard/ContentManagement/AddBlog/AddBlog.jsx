import JoditEditor from "jodit-pro-react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import SecondaryBtn from "../../../../Components/SecondaryButton/SecondaryBtn";
import { Link } from "react-router-dom";
const defaultConfig = {
  license: "%LICENSE_KEY%",
};

const AddBlog = () => {
  const [content, setContent] = useState("");
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  console.log(blogs);

  const handleSubmit = (e) => {
    //code goes here
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const thumbnail =
      form.photo.value ||
      `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/300/300`;
    const status = "draft";

    const blog = {
      title,
      thumbnail,
      content,
      status,
    };

    axiosSecure
      .post("/blogs", blog)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your blog has been drafted for admin approval.",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleStatus = (blog, status) => {
    const updatedBlog = {
        status : status,
    }
    axiosSecure.patch(`/blogs/${blog._id}`, updatedBlog)
    .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount>0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Blog Status Changed",
                showConfirmButton: false,
                timer: 1500
              });
            refetch();
        }
    })
    .catch(err => {
        console.log(err);
    })
  }
  

  return (
    <div>
      <SectionTitle
        Heading={"Add Blog"}
        subHeading={"You can contribute by adding blog to our platform."}
      />

      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title of the blog"
            name="title"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Thumbnail URL</span>
          </label>
          <input
            type="text"
            placeholder="Thumbnail URL"
            name="photo"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <JoditEditor
            value={content}
            name="content"
            tabIndex={1}
            config={defaultConfig}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        <input
          className="btn bg-[#9B111E] text-white text-xl"
          type="submit"
          name="submit"
          value={"Submit"}
        />
      </form>

      <SectionTitle Heading={"Blogs"} subHeading={"All the blogs"} />

      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="card card-compact w-96 bg-base-100 shadow-xl mx-auto"
          >
            <figure>
              <img
                src={blog.thumbnail}
                alt="Blog Thumbnail"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="card-actions flex gap-2 justify-center items-center">
                {
                    blog.status === 'draft' ? <Link onClick={()=>handleStatus(blog, 'published')}><SecondaryBtn  btnText={'Publish'} /></Link> :   <Link onClick={()=>handleStatus(blog, 'draft')}><SecondaryBtn  btnText={'UnPublish'} /></Link>
                }

                <button className="btn bg-[#9B111E] text-white btn-xs justify-end">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlog;
