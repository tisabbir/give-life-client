import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import registerPicture from "../../assets/register.jpg";
import { useEffect, useState } from "react";

const Register = () => {
  const [districts, setDistricts] = useState([]);
//   const [upozillas, setUpozillas] = useState([]);

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data[2].data);
      });
  }, []);

  useEffect(() => {
    fetch("upozillas.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data[2].data);
      });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const avatarUrl = form.url.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Error",
        text: "Password must contain at least 6 characters, must have at least one uppercase and one lowercase letter.",
        imageUrl: "https://i.ibb.co/TRYVL4g/error.jpg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      return;
    }
    console.log(name, email, avatarUrl);
  };

  return (
    <div className="pt-24">
      <Helmet>
        <title>Register || Give Life</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img className="max-w-lg rounded-lg" src={registerPicture} />
          </div>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-center mt-4 text-2xl font-bold">
              Register Now
            </h1>
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  name="url"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Choose your district
                  </option>
                  {districts.map((district) => (
                    <option key={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upozilla</span>
                </label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Choose your Upozilla
                  </option>
                  {districts.map((district) => (
                    <option key={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <h1 className="text-center mb-2">
                  Already a member of us?{" "}
                  <Link to={"/login"} className="text-blue-500">
                    Login Now
                  </Link>
                </h1>

                <button className="btn bg-green-500 text-white">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
