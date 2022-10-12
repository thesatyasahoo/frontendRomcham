import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export const AccountProfileDetails = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [oldPass, setOldPass] = useState({
    status: 0,
    message: "",
  });
  const [newPass, setNewPass] = useState({
    status: 0,
    message: "",
  });
  const [confPass, setConfPass] = useState({
    status: 0,
    message: "",
  });
  let urlMobile = process.env.NEXT_PUBLIC_BASE_URL + "resetPassword/";
  let token = useSelector((state) => (state.Profile.itemList ? state.Profile.itemList : []));
  let account_holder = useSelector((state) => (state.Profile.item ? state.Profile.item : []));
  const [values, setValues] = useState({
    firstName: account_holder.name,
    lastName: "k",
    email: account_holder.email,
    phone: account_holder.mobile,
    state: "Alabama",
    country: "USA",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const dialogClickOpen = () => {
    setOpenDialog(true);
  };

  const dialogClose = () => {
    setOldPass({ status: 0, message: "" });
    setNewPass({ status: 0, message: "" });
    setConfPass({ status: 0, message: "" });
    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setOpenDialog(false);
  };

  const handleForgotPassword = async () => {
    try {
      if (password.length === 0 && password.length < 4) {
        setMobileMsg({
          status: 400,
          message: "Please Enter Valid Password",
        });
      } else {
        await axios
          .put(urlMobile.toString() + account_holder.email, password, {
            headers: {
              authorization: token.access_token,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.status === "200") {
              setConfPass({
                status: 200,
                message: res.data.msg,
              });
              setTimeout(() => {
                setOldPass({ status: 0, message: "" });
                setNewPass({ status: 0, message: "" });
                setConfPass({ status: 0, message: "" });
                setPassword({
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }, 3000);
            } else {
              setOldPass({
                status: res.data.status,
                message: res.data.msg,
              });
            }
            // dialogClose;
          })
          .catch((error) => {
            console.log(error);
            setOldPass({
              status: 400,
              message: "Please Provide a Valid Number, Exist In Database!",
            });
            console.log("submit", "Please Provide a Number");
          });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Dialog
        open={openDialog}
        maxWidth="lg"
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reset Password"}</DialogTitle>
        <DialogContent style={{ minWidth: "30rem" }}>
          <div>
            <TextField
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              fullWidth
              label="Old password"
              name="oldPassword"
              type="password"
              value={password.oldPassword}
              onChange={(e) => {
                setPassword({ ...password, oldPassword: e.target.value });
                setOldPass({ ...oldPass, message: null });
              }}
              variant="outlined"
            />
            {oldPass.status ? (
              oldPass.status === 200 ? (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>{oldPass.message}</p>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>{oldPass.message}</p>
              )
            ) : null}
          </div>
          <div>
            <TextField
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              fullWidth
              label="New password"
              name="newPassword"
              type="password"
              value={password.newPassword}
              onChange={(e) => {
                setPassword({ ...password, newPassword: e.target.value });
                setNewPass({ ...newPass, message: null });
              }}
              variant="outlined"
            />
            {newPass.status ? (
              newPass.status === 200 ? (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>{newPass.message}</p>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>{newPass.message}</p>
              )
            ) : null}
          </div>
          <div>
            <TextField
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              fullWidth
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={password.confirmPassword}
              onChange={(e) => {
                setPassword({ ...password, confirmPassword: e.target.value });
                setConfPass({ ...confPass, message: null });
              }}
              variant="outlined"
            />
            {confPass.status ? (
              confPass.status === 200 ? (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>{confPass.message}</p>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>{confPass.message}</p>
              )
            ) : null}
            {password.confirmPassword.length > 0 ? (
              password.newPassword !== password.confirmPassword ? (
                <p style={{ color: "red", textAlign: "center" }}>Password Not Matched</p>
              ) : confPass.status === 200 ? null : (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>Password Matched</p>
              )
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            onClick={() => handleForgotPassword()}
            variant="contained"
          >
            Submit
          </Button>
          <Button
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            onClick={() => dialogClose()}
            variant="contained"
            color="info"
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Typography color="textPrimary" gutterBottom variant="p">
                  First Name: {values.firstName}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography color="textPrimary" gutterBottom variant="p">
                  Email: {values.email}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography color="textPrimary" gutterBottom variant="p">
                  Mobile: {values.phone}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Button onClick={dialogClickOpen} color="primary" variant="contained">
              Reset Password
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};
