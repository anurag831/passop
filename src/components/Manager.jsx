import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordref = useRef();
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      // when we recieve info data from a web server it is recieved as a string so to convert it to a js object we use JSON.parse()
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleshow = () => {
    if (ref.current.src.includes("/icons/eye.png")) {
      ref.current.src = "/icons/eye-cross.png";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "/icons/eye.png";
      passwordref.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveForm = () => {
    if (form.site && form.username && form.password) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      // when we send data to a web server, it is sent as a string, so to convert our array into string we use JSON.stringify()
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, { ...form, id: uuidv4() }]);
      setForm({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Some values are empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Delete passowrd?")
    if(c){
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
    toast("Password deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    }
    
  };

  const editPassword = (id) => {
    if (form.site) {
      let c = confirm(
        "Do you want to over write the present form values? (Password list wont be updated if not saved)"
      );
      if (c) {
        setForm(passwordArray.filter((item) => item.id === id)[0]);
        setPasswordArray(passwordArray.filter((item) => item.id !== id));
      }
    } else {
      setForm(passwordArray.filter((item) => item.id === id)[0]);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-1 py-1 lg:px-60 w-[100vw]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <form action="" className="flex flex-col gap-5">
          <input
            placeholder="Website URL"
            value={form.site}
            name="site"
            type="text"
            className="rounded-lg w-full py-1 px-3 focus:outline-gray-200 border bg-transparent border-blue-950 text-white"
            onChange={handleChange}
          />

          <div className="flex flex-col md:flex-row gap-5 md:gap-9">
            <input
              placeholder="Username"
              value={form.username}
              name="username"
              type="text"
              className="rounded-lg w-full py-1 px-3 focus:outline-gray-200 border bg-transparent border-blue-950 text-white"
              onChange={handleChange}
            />

            <div className="flex gap-2 items-center w-full relative">
              <input
                ref={passwordref}
                placeholder="Password"
                value={form.password}
                name="password"
                type="password"
                className="rounded-lg w-full py-1 px-3 
                focus:outline-gray-200 border bg-transparent border-blue-950 text-white"
                onChange={handleChange}
              />

              <img
                ref={ref}
                src="/icons/eye-cross.png"
                className="w-6 absolute right-2 cursor-pointer"
                alt=""
                onClick={handleshow}
              />
            </div>
          </div>

          <div className="flex gap-1 items-center w-full justify-center">
            <lord-icon
              src="https://cdn.lordicon.com/rcgrnzji.json"
              trigger="hover"
              stroke="bold"
              state="hover-swirl"
            ></lord-icon>

            <div
              className="bg-green-400 w-fit rounded-lg py-1 px-3 cursor-pointer hover:bg-green-500"
              onClick={saveForm}
            >
              Save Password
            </div>
          </div>
        </form>
      </div>

      <div className="passwords text-white py-7">
        {passwordArray.length === 0 && (
          <div className="text-xl text-center font-bold">
            No passwords to display
          </div>
        )}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full">
            <thead className="h-11 text-lg md:text-xl">
              <tr>
                <th className="w-1/4">Website</th>
                <th className="w-1/4">Username</th>
                <th className="w-1/4">Password</th>
                <th className="w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index} className="hover:bg-blue-950 cursor-pointer ">
                    <td className="text-center py-2 flex items-center gap-3 justify-center ">
                      <div className="py-2 flex items-center gap-3 justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <img
                          className="invert"
                          src="/icons/copy.svg"
                          alt=""
                          onClick={() => {
                            copyText(item.site);
                          }}
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="py-2 flex items-center gap-3 justify-center">
                        <span>{item.username}</span>
                        <img
                          className="invert"
                          src="/icons/copy.svg"
                          alt=""
                          onClick={() => {
                            copyText(item.username);
                          }}
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 ">
                      <div className="py-2 flex items-center gap-3 justify-center">
                        <span>{item.password}</span>
                        <img
                          className="invert"
                          src="/icons/copy.svg"
                          alt=""
                          onClick={() => {
                            copyText(item.password);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className="flex gap-4 justify-center">
                        <lord-icon
                          src="https://cdn.lordicon.com/oqaajvyl.json"
                          trigger="hover"
                          stroke="bold"
                          state="hover-line"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        ></lord-icon>
                        <lord-icon
                          src="https://cdn.lordicon.com/vlnvqvew.json"
                          trigger="morph"
                          stroke="bold"
                          state="morph-trash-in"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
