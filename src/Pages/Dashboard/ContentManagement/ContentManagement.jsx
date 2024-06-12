import { Link } from "react-router-dom";
import PrimaryBtn from "../../../Components/PrimaryButton/PrimaryBtn";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SecondaryBtn from "../../../Components/SecondaryButton/SecondaryBtn";


const ContentManagement = () => {
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

                  refetch()
            
            }
        })
        .catch(err => {
            console.log(err);
        })
      }
      
      const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
    
                axiosSecure.delete(`/blogs/${id}`)
                .then(res => {
                    console.log(res.data);
                    if(res.data.deletedCount > 0){
    
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
        
                     refetch()
                    }
            
                })
                .catch(err => {
                    console.log(err);
                })
    
    
             
    
            }
          });
      }
    return (
        <div>
            <Link to={'/dashboard/content-management/add-blog'} className="flex justify-end mr-4"><PrimaryBtn btnText={'Add Blog'} /></Link>

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

                <button onClick={()=>handleDelete(blog._id)} className="btn bg-[#9B111E] text-white btn-xs justify-end">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
    );
};

export default ContentManagement;