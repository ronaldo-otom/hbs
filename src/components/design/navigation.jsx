import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Avatar, Box, Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useLocation, useHistory } from 'react-router-dom';
import EmployeeListComponent from '../employees/employeeList/employeeListComponent';
import UpdateEmployeeComponent from '../employees/updateEmployee/updateEmployeeComponent';
import AddEmployeeComponent from '../employees/addEmployee/addEmployeeComponent';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function NavigationDrawer(props) {
    const location = useLocation();
	const { window } = props;
	const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [search, setSearch] = React.useState(false);
    const pathName = String(location.pathname).split('/')[2];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const path = () => {
        const path = String(location.pathname).split('/')[2];
        const id = String(location.pathname).split('/')[3];
		if (location.pathname === '/') {
			return 'Home';
		} else if (location.pathname === '/loan-application') {
			return 'Loan Application';
		} else if (location.pathname === '/employees') {
			return 'Employees';
        } else if (path === 'edit') {
			return `Update ${id}`;
		}else if (path === 'add') {
			return `New Employee`;
		}
	};

	const navigator = [
		{
			link: '/',
			text: 'Home',
			icon: <HomeIcon />,
		},
		{
			link: '/loan-application',
			text: 'Loan Application',
			icon: <AccountBalanceWalletIcon />,
		},
		{
			link: '/employees',
			text: 'Employees',
			icon: <SupervisorAccountIcon />,
		},
	];

	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<Box display="flex" padding={1} width="70%" margin="auto">
					<Avatar>JD</Avatar>
					<Box marginLeft={2}>
						<Typography variant="button">
							<strong>John Doe</strong>
						</Typography>
						<div>
							<Typography variant="caption">Employee</Typography>
						</div>
					</Box>
				</Box>
			</div>
			<Divider />
			<List>
				{navigator.map((nav, index) => (
					<Link to={nav.link} className="link" onClick={() => setMobileOpen(false)}>
						<ListItem button key={index}>
							<ListItemIcon>{nav.icon}</ListItemIcon>
							<ListItemText primary={nav.text} />
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	);

    const renderComponent = () => {
        const path = String(location.pathname).split('/')[2];

        if (location.pathname === '/') {
			return 'Home Section';
		} else if (location.pathname === '/loan-application') {
			return 'Loan Application Section';
		} else if (location.pathname === '/employees') {
			return <EmployeeListComponent />;
		} else if (path === 'edit') {
            return  <UpdateEmployeeComponent />;    
		}  else if (path === 'add') {
            return  <AddEmployeeComponent />;    
		} 
    };

    const handleSearch = () => {
        setSearch(false)
    }
    const handleBackToList = () => {
        history.push('/employees')
    }
	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
                        <MenuIcon />
                    </IconButton>
              
                    {pathName === undefined ? null : 
                    <IconButton color="inherit"  onClick={handleBackToList} >
                     <Tooltip title='Back to List' placement='top'><ArrowBackIcon/></Tooltip>
                    </IconButton>
                    }
					<Box minWidth='200px'>
                        <Typography variant="h6" style={{marginLeft: 15}}>
                            {path()}
                        </Typography>
                    </Box>
                    <Box display='flex' justifyContent='flex-end' width='100%' paddingTop={1}>
                        <span style={{margin: 5, cursor: 'pointer'}} onClick={handleSearch}>
                            {search ? 
                            <Box>
                                <TextField placeholder="Search" variant="outlined" size="small"/>
                            </Box> : <Tooltip title='Search' placement='top'><SearchIcon /></Tooltip>}
                        </span>
                        <span  style={{margin: 5, cursor: 'pointer'}}>
                            <Tooltip title='Refresh' placement='top'><RefreshIcon /></Tooltip>
                        </span>
                    </Box>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{renderComponent()}
			</main>
		</div>
	);
}

NavigationDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default NavigationDrawer;
