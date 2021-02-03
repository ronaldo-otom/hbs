import { Box, Grid, Paper, Typography, Button, Tooltip } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import Employees from '../../assets/dummyData/employees'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));


function EmployeeListComponent() {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const classes = useStyles();
    const [employees , setEmployees] = React.useState(Employees);

    const handleEdit = (id) => {
        history.push(`/employee/edit/${id}`)
    }
    const handleDelete = (id) => {
        setOpen(true)
    }

    const handleClose = () => {
    setOpen(false);
    };
   
    const deleteItem = () => {
        return (
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Employee"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this record?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
                Yes
            </Button>
            <Button onClick={handleClose} color="secondary"  variant="contained">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        )
    }
    return (
        <div>
            {deleteItem()}
            <Box position='fixed' right={10} bottom={10}>
                <Tooltip title="Add New Employee" placement="top">
                    <AddCircleIcon style={{fontSize: 40, color: 'red', cursor: 'pointer'}} onClick={() => history.push('/employee/add')}/>
                </Tooltip>
            </Box>
            <Grid container spacing={3}>
                {employees.map(employee => <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid xs={6}>
                                <Grid xs={12}>
                                    <Typography><strong>ID:</strong> {employee.id}</Typography>
                                    <Typography><strong>Name:</strong> {employee.name}</Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={6}>
                                <Grid xs={12}>
                                    <Box display='flex' justifyContent='flex-end'>
                                        <Tooltip title='Edit' placement='top'>
                                            <EditIcon style={{cursor: 'pointer'}} onClick={() => handleEdit(employee.id)}/>
                                        </Tooltip>
                                        <Tooltip title='Delete' placement='top'>
                                            <DeleteIcon style={{cursor: 'pointer'}} onClick={() => handleDelete(employee.id)}/>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>)}              
            </Grid>
        </div>
    )
}

export default EmployeeListComponent
