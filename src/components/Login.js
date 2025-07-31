import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../Auth.css";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphql/auth/authMutation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserState } from "../redux/userSlice";

// ✅ Import toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [userLogin] = useMutation(USER_LOGIN);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userLogin({
        variables: {
          input: {
            ...formData,
          },
        },
      });

      const user = data?.userLogin;

      if (user) {
        localStorage.setItem("token", user.token);
        dispatch(
          changeUserState({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            status: true,
          })
        );
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        // ✅ Show toast if userLogin returns null
        toast.error("User not found or invalid credentials.");
      }
    } catch (err) {
      console.log("Login error:", err);
      // ✅ Show toast on API error
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <h3 className="mb-4">Sign In</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="loginEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="loginPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Sign In
        </Button>
      </Form>

      {/* ✅ Toast Container for showing messages */}
      <ToastContainer position="top-center" />
    </>
  );
};

export default Login;
