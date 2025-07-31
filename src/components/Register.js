import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../Auth.css";
import { useMutation } from "@apollo/client";
import { USER_REGISTRATION } from "../graphql/auth/authMutation";

// ✅ Import react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  });

  const [registerUser] = useMutation(USER_REGISTRATION);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          input: {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
          },
        },
      });

      const response = data?.userRegistration;

      if (response === "User email already registered. Login Instead!") {
        // ✅ Show error toast if user exists
        toast.error("User already registered. Please login instead.");
      } else if (response === "User registered!") {
        // ✅ Show success toast
        toast.success("Registration successful! Please login.");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          agree: false,
        });
        // Optionally switch to login after a short delay
        setTimeout(() => {
          onSwitchToLogin?.();
        }, 1500);
      }
    } catch (err) {
      console.log("Registration error:", err);
      toast.error("Something went wrong during registration.");
    }
  };

  return (
    <>
      <h3 className="mb-4">Register</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label={
              <>
                I agree to all the statements in{" "}
                <a href="#" className="text-primary">
                  Terms of service
                </a>
              </>
            }
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Sign Up
        </Button>
      </Form>

      <ToastContainer position="top-center" />
    </>
  );
};

export default Register;
