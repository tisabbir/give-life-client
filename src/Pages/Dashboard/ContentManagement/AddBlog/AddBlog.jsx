import JoditEditor from "jodit-pro-react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const defaultConfig = {
  license: "%LICENSE_KEY%",
};

const AddBlog = () => {
  const [content, setContent] = useState("");
  const axiosSecure = useAxiosSecure();
 

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

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your blog has been drafted for admin approval.",
            showConfirmButton: false,
            timer: 1500,
          });
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };



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

      
    </div>
  );
};

export default AddBlog;
