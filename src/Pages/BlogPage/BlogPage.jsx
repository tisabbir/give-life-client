import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const axiosPublic = useAxiosPublic();
  const { data: publishedBlogs = [] } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishedBlogs");
      return res.data;
    },
  });



  return (
    <div className="pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {publishedBlogs.map((blog, index) => (
          <div
            key={index}
            className="card card-compact w-80 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={blog.thumbnail}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              
              <div className="card-actions justify-center w-full">
                <Link to={`/blogDetails/${blog._id}`}><button className="btn w-full bg-[#9B111E] text-white">View Details</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
