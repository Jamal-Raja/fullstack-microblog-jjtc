// import { useAuth } from "../context/AuthContext";
import axios from "axios";
import PopupMessage from "../components/utils/PopupMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; //added TN//

const Register = () => {
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate(); //added TN//
  // const { login } = useAuth();

  // REGISTER USER
  async function registerUser(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const userInput = {
      username: form.get("username"),
      email: form.get("email"),
      password: form.get("password"),
      passwordConfirmation: form.get("passwordConfirmation"),
    };
    // login({ displayName: "" });

    try {
      const { data } = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        data: userInput,
      });

      setPopup({
        key: Date.now(),
        type: "success",
        message: data.message,
        displayTime: 4000,
      });
      
      console.log(data)

      // Wait 1 second, then redirect
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      // Added redirection

    } catch (error) {
      console.error(error.response.data.message);
      setPopup({
        key: Date.now(),
        type: "error",
        message: error.response?.data?.message || "Something went wrong.",
        displayTime: 4000,
      });
    }
  }

  return (
    <>
      {popup && (
        <PopupMessage
          key={popup.key}
          type={popup.type}
          message={popup.message}
        />
      )}
      <form onSubmit={registerUser}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2>Register</h2>
        <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          name="username"
          defaultValue="bob_marley123"
          type="text"
          placeholder="Username"
          required
        />
        <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          name="email"
          defaultValue="bob_marley123@gmail.com"
          type="email"
          placeholder="Email"
          required
        />
        <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          name="password"
          defaultValue="12345678"
          type="password"
          placeholder="Password"
          required
        />
        <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          name="passwordConfirmation"
          defaultValue="12345678"
          type="password"
          placeholder="Password Confirmation"
          required
        />
        <button
          type="submit"
          className="bg-teal-500 px-4 py-1 rounded-full hover:scale-105 active:scale-95 cursor-pointer"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
