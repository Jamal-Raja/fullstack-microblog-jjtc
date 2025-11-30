// import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Register = () => {
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

      console.log("RESPONSE MSG -->", data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  return (
    <form onSubmit={registerUser}>
      <h2>Register</h2>
      <input
        name="username"
        defaultValue="bob_marley123"
        type="text"
        placeholder="Username"
        required
      />
      <input
        name="email"
        defaultValue="bob_marley123@gmail.com"
        type="email"
        placeholder="Email"
        required
      />
      <input
        name="password"
        defaultValue="12345678"
        type="password"
        placeholder="Password"
        required
      />
      <input
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
  );
};

export default Register;
