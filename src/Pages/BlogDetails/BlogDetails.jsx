import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import PrimaryBtn from "../../Components/PrimaryButton/PrimaryBtn";

const BlogDetails = () => {
  const blog = useLoaderData();
  console.log(blog);
  return (
    <div className="pt-24">
        <SectionTitle Heading={'Blog Details'} subHeading={blog.title} />
      <div className="card card-side bg-base-100 flex-col md:flex-row md:w-3/4 mx-auto my-12 shadow-xl">
        <figure className="p-4">
          <img
            className="w-full rounded-lg"
            src={blog.thumbnail}
            alt="Movie"
          />
        </figure>
        <div className="card-body flex-1">
          <h2 className="card-title">{blog.title}</h2>
          <p>{blog.content}</p>
          <div className="card-actions justify-end">
          <Link to={'/blogPage'}><PrimaryBtn btnText={'Other Blogs'} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
