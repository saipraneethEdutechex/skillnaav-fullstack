import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../../../../assets-webapp/login-image.png";
import axios from "axios";
import Loading from "../../../Warnings/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Client, Account } from "appwrite";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import ForgotPasswordModal from "../SignUpLogin/UserforgotPassword"; // Import the modal

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("6715ee9b0034e652fb17"); // Replace with your actual project ID

const account = new Account(client);

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const UserLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/users/login", values, config);
      
      // Store token in localStorage with the name 'userToken'
      const token = data.token;
      localStorage.setItem("userToken", JSON.stringify(token)); // Store token as 'userToken'
      localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info if needed
      
      // Log the token to the console
      console.log("User token stored in localStorage:", token);
  
      setLoading(false);
      navigate("/user-main-page");
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.message ? err.response.data.message : "Something went wrong");
      setSubmitting(false);
    }
  };
  
  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       // Make a request to get user information from Google
  //       const response = await axios.get(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tokenResponse.access_token}`,
  //           },
  //         }
  //       );

  //       // Log or use the user information
  //       console.log(response.data);

  //       // Navigate to 'user-main-page' after successful authentication
  //       navigate("/user-main-page");
  //     } catch (error) {
  //       console.error("Error fetching user info:", error);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Login failed:", error);
  //   },
  // });

  const login = () => {};

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-poppins">
      {/* Left Section (Image) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <img
          src={loginImage}
          alt="login"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col items-center justify-center p-8 w-full lg:w-1/2">
        <div className="w-full max-w-md flex flex-col justify-center min-h-screen lg:min-h-full">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Dear Student, Welcome!
          </h1>
          <h2 className="text-lg font-medium mb-6 text-center text-gray-600">
            Please sign in to your account
          </h2>
          {/* Error Message */}
          {error && (
            <div className="bg-red-200 text-red-600 p-3 mb-4 text-center rounded-lg">
              {error}
            </div>
          )}
          {/* Loading */}
          {loading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Email Field */}
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                    />

                    <button
                      type="button"
                      className="absolute inset-y-0 right-4 mt-3 flex items-center justify-center h-full text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        size="lg"
                      />
                    </button>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Forgot Password Button */}
                  <div className="flex justify-end mb-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)} // Open the modal
                      className="text-sm font-medium text-teal-500 hover:text-teal-700 transition duration-150 ease-in-out"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors duration-300 shadow-md"
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>
          )}
          <div className="flex items-center my-6">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          {/* Google Sign-In Button */}
          <button
            onClick={() => login()}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 mb-4 flex items-center justify-center space-x-2"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>

          {/* Sign Up Button */}
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/user-create-account" className="text-teal-500 hover:text-teal-700">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ForgotPasswordModal Component */}
      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserLogin;
