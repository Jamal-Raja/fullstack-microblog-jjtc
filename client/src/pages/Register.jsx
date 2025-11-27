import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ displayName: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" placeholder="Display Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
