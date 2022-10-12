import { useFormik } from "formik";
import { useAuthContext } from "../../contexts/auth-context";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Button, Box, Card, Snackbar, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";

export const UserCreate = ({ product, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    state: false,
    mesage: "",
  });
  const [dialogObj, setDialogObj] = useState({});

  const { user } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      mobile: Yup.string().required("Mobile is required"),
      password: Yup.string().min(4).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const payload = {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
        };
        return await axios
          .post(process.env.NEXT_PUBLIC_BASE_URL + "addUser", payload, {
            headers: {
              authorization: user.access_token,
            },
          })
          .then((res) => {
            console.log(res);
            handleClick("Success");
            setTimeout(() => {
              Router.push("/users").catch(console.error);
            }, 1500);
          })
          .catch((error) => {
            // helpers.setFieldError("submit", "Please try with valid email & password!");
          });
      } catch (err) {
        handleClick("Error");
        console.error(err.message);
        helpers.setFieldError("submit", err.message || "Something went wrong");
        helpers.setSubmitting(false);
      }
    },
  });
  const handleClick = (message) => {
    setOpen({
      state: true,
      message: message,
    });
  };

  const handleClose = () => {
    setOpen({
      state: false,
      message: "",
    });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={open.state}
        autoHideDuration={2500}
        onClose={handleClose}
        message={open.message}
      ></Snackbar>
      <Card>
        <Box
          sx={{
            margin: "3rem",
          }}
        >
          <div style={{ marginTop: "1rem" }}>
            <TextField
              style={{ marginBottom: "1rem", marginRight: "1rem", width: "30%" }}
              error={Boolean(formik.touched.firstname && formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
              label="First Name"
              name="firstname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.firstname}
              variant="outlined"
            />

            <TextField
              style={{ marginBottom: "1rem", marginRight: "1rem", width: "30%" }}
              error={Boolean(formik.touched.lastname && formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              label="Last Name"
              name="lastname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.lastname}
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: "1rem", marginRight: "1rem", width: "30%" }}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: "1rem", marginRight: "1rem", width: "30%" }}
              error={Boolean(formik.touched.mobile && formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              label="Mobile"
              name="mobile"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.mobile}
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: "1rem", marginRight: "1rem", width: "30%" }}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 2 }} variant="p">
                {formik.errors.submit}
              </Typography>
            )}
            <Button
              style={{ marginBottom: "1rem", marginRight: "1rem", width: "10%" }}
              size="large"
              onClick={() => formik.handleSubmit()}
              variant="contained"
              disabled={!formik.isValid}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Card>
    </>
  );
};
