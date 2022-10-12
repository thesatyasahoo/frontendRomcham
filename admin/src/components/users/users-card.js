import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useAuthContext } from "../../contexts/auth-context";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';

export const UserCard = ({ product, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [userArray, setuserArray] = useState([]);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [viewDialogObj, setViewDialogObj] = useState({});
  const [update, setUpdate] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [dialogObj, setDialogObj] = useState({});

  const { user } = useAuthContext();
  useEffect(() => {
    getRunRoomCall(user.access_token);
  }, []);
  const getRunRoomCall = async (token) => {
    await axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "userList", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        // console.log(res);
        setuserArray(res.data.userList);
        //  dispatch(RunroomActions.addToAdmin(res.data.roomList))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = userArray.map((admin) => admin._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedCustomerIds.indexOf(_id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, _id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const dialogClickOpen = () => {
    setOpenDialog(true);
  };
  const dialogClickOpen1 = () => {
    setOpenDialog1(true);
  };
  const dialogClose = () => {
    setOpenDialog(false);
  };
  const dialogClose1 = () => {
    setOpenDialog1(false);
  };
  const handleUpdate = (el) => {
    dialogClickOpen();
    setDialogObj(el);
    setUpdate({
      name: el.firstname ? el.firstname : "",
      email: el.email ? el.email : "",
      mobile: el.mobile ? el.mobile : "",
      password: el.password ? el.password : "",
    });
    // console.log(dialogObj);
  };
  const handleUpdateRoom = async () => {
    console.log(update, dialogObj);
    await axios
      .put(process.env.NEXT_PUBLIC_BASE_URL + "userupdate/" + dialogObj._id, update, {
        headers: {
          authorization: user.access_token,
        },
      })
      .then((res) => {
        // console.log(res);
        getRunRoomCall(user.access_token);
        setUpdate({ name: "", email: "", mobile: "", password: "" });
        setDialogObj({});
        dialogClose();
        // setAdminArray(res.data.userList);
        // dispatch(AdminActions.addToAdmin(res.data.userList));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleView = (el) => {
    console.log(el)
    setOpenDialog1(true);
    setViewDialogObj(el);
  }

  return (
    <>
    <Dialog
        open={openDialog1}
        maxWidth="lg"
        onClose={dialogClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Details"}</DialogTitle>
        <DialogContent style={{ minWidth: "30rem" }}>
            <table className="table">
              <tbody>
                <tr>
                  <td scope="row" style={{ paddingRight: "3rem"}}>First Name : {viewDialogObj.firstname ? viewDialogObj.firstname : "NA"}</td>
                  <td>Last Name : {viewDialogObj.lastName ? viewDialogObj.lastName : "NA"}</td>
                </tr>
                <tr>
                  <td scope="row" style={{ paddingRight: "3rem"}}>Email : {viewDialogObj.email ? viewDialogObj.email : "NA"}</td>
                  <td>Mobile : {viewDialogObj.mobile ? viewDialogObj.mobile : "NA"}</td>
                </tr>
              </tbody>
            </table>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            onClick={() => dialogClose1()}
            variant="contained"
            color="info"
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        maxWidth="lg"
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update User"}</DialogTitle>
        <DialogContent style={{ minWidth: "30rem" }}>
          <div>
            <TextField
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              fullWidth
              label="Name"
              name="name"
              type="text"
              defaultValue={dialogObj.firstname}
              // value={update.firstname}
              onChange={(e) => {
                setUpdate({ ...update, name: e.target.value });
              }}
              variant="outlined"
            />
            {/* {oldPass.status ? (
              oldPass.status === 200 ? (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>{oldPass.message}</p>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>{oldPass.message}</p>
              )
            ) : null} */}
          </div>
          <div>
            <TextField
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              fullWidth
              label="Email"
              name="email"
              type="email"
              defaultValue={dialogObj.email}
              // value={update.email}
              onChange={(e) => {
                setUpdate({ ...update, email: e.target.value });
              }}
              variant="outlined"
            />
            {/* {newPass.status ? (
              newPass.status === 200 ? (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>{newPass.message}</p>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>{newPass.message}</p>
              )
            ) : null} */}
          </div>
          <div>
            <TextField
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              fullWidth
              label="Mobile"
              name="mobile"
              type="text"
              defaultValue={dialogObj.mobile}
              // value={update.mobile}
              onChange={(e) => {
                setUpdate({ ...update, mobile: e.target.value });
              }}
              variant="outlined"
            />
            {/* {newPass.status ? (
              newPass.status === 200 ? (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>{newPass.message}</p>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>{newPass.message}</p>
              )
            ) : null} */}
          </div>
          <div>
            <TextField
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              fullWidth
              label="Password"
              name="password"
              type="password"
              defaultValue={dialogObj.password}
              // value={update.password}
              onChange={(e) => {
                setUpdate({ ...update, password: e.target.value });
              }}
              variant="outlined"
            />
            {/* {newPass.status ? (
              newPass.status === 200 ? (
                <p style={{ color: "#5cb85c", textAlign: "center" }}>{newPass.message}</p>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>{newPass.message}</p>
              )
            ) : null} */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            onClick={(el) => handleUpdateRoom()}
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
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === userArray.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < userArray.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userArray.length > 0
                  ? userArray.slice(0, limit).map((el) => (
                      <TableRow
                        hover
                        key={el._id}
                        selected={selectedCustomerIds.indexOf(el._id) !== -1}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedCustomerIds.indexOf(el._id) !== -1}
                            onChange={(event) => handleSelectOne(event, el._id)}
                            value="true"
                          />
                        </TableCell>
                        <TableCell>
                          {el.createdAt ? new Date(el.createdAt).toLocaleDateString() : "N/A"}
                        </TableCell>
                        <TableCell>{el.firstname ? el.firstname : "N/A"}</TableCell>
                        <TableCell>{el.lastname ? el.lastname : "N/A"}</TableCell>
                        <TableCell>{el.mobile ? el.mobile : "N/A"}</TableCell>
                        <TableCell>{el.email ? el.email : "N/A"}</TableCell>
                        <TableCell>
                        <VisibilityRoundedIcon color="info" onClick={() => handleView(el)} style={{marginRight: "1rem", cursor: "pointer"}} />
                        <SaveAsRoundedIcon color="success" onClick={() => handleUpdate(el)} style={{cursor: "pointer"}} />
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={userArray.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};
