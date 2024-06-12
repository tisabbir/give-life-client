import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBars } from "react-icons/fa6";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: members = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleStatus = (member, status) => {
    const updatedMember = {
        status : status,
        role : member.role,
    }
    axiosSecure.patch(`members/${member.email}`, updatedMember)
    .then(res => {
        console.log(res.data);
        refetch();
    })
    .catch(err => {
        console.log(err);
    })
  }
  const handleRole = (member, role) => {
    const updatedMember = {
        status : member.status,
        role : role,
    }
    axiosSecure.patch(`members/${member.email}`, updatedMember)
    .then(res => {
        console.log(res.data);
        refetch();
    })
    .catch(err => {
        console.log(err);
    })
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={member.avatarUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{member.email}</td>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.status}</td>
                <th>
                  <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <FaBars />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        {member.status === 'active' ? <button onClick={()=>handleStatus(member, 'blocked')}>Block</button> : <button onClick={()=>handleStatus(member, 'active')}>Unblock</button>}
                      </li>
                      <li>
                        {
                            member.role === "donor" ? <button onClick={()=>handleRole(member, 'volunteer')}>Make Volunteer</button> : <></>
                        }
                      </li>
                      <li>
                        {
                            member.role === "donor" || member.role === 'volunteer' ? <button onClick={()=>handleRole(member, 'admin')}>Make Admin</button> : <></>
                        }
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
