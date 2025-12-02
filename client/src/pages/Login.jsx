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
    <div className="min-h-[20vh] flex items-center justify-center px-3 mb-4">
      <div className="rounded-2xl shadow-md p-8 border-gray-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-600 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-4">Please enter your details to log in</p>
        </div>

      <form onSubmit={loginUser} className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 mr-2">Email</label>
          <div className="relative">
            <input
        defaultValue="test"
        name="username"
        type="text"
        placeholder="Username"
        required
       className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"/>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 mr-2">Password</label>
          <div className="relative">
            <input
        defaultValue="12345678"
        name="password"
        type="password"
        placeholder="Password"
        required
      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition mb-2"/>
          </div>
        </div>
      <button type="submit" className="w-full justify-center items-center p-2 font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-full">Log in</button>
    </form>
      </div>
    </div>
  );
};

export default Login;
