// import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  // const { login } = useAuth();

  // LOGIN USER
  async function loginUser(e) {
    e.preventDefault();
    // login({ displayName: "" });

    const form = new FormData(e.target);

    const userInput = {
      username: form.get("username"),
      password: form.get("password"),
    };

    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        data: userInput,
      });
      const token = response.data.accessToken;
      const userData = response.data.data.userData;

      console.log("TOKEN --> ", token);
      console.log("userData --> ", userData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={loginUser}>
      <h2>Login</h2>
      <input
        defaultValue="test"
        name="username"
        type="text"
        placeholder="Username"
        required
      />
      <input
        defaultValue="12345678"
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
