import { Alert, Box, Button, Grid, IconButton, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { auth as authConfig } from "../../firebase-config";
import homeService from "./services/homeService";
import { IProduct } from "../../models/Product";

interface CreateProductAlertProps {
	message: string;
	type: "success" | "error";
	open: boolean;
}

export const Home = () => {
	const history = useNavigate();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [createProductAlert, setCreateProductAlert] = useState<CreateProductAlertProps>({ message: "", type: "success", open: false });

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [productName, setProductName] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	const handleCloseModal = () => setModalOpen(false);
	const handleOpenModal = () => setModalOpen(true);

	const auth = getAuth();
	const user = auth.currentUser;
	useEffect(() => {
		if (!user) {
			history('/signup');
		}
	}, [user]);

	const getProducts = async () => {
		try {
			setIsLoading(true);
			const products = await homeService.getProducts();
			setProducts(products);
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log('Unexpected error', err);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const logOut = async () => {
		try {
			await signOut(authConfig);
			history('/signup');
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log('Unexpected error', err);
			}
		}
	}

	const createProduct = async () => {
		try {
			setIsLoading(true);
			await homeService.createProduct(productName, category);
			setCreateProductAlert({ message: "Product created", type: "success", open: true });
			getProducts();
			setModalOpen(false);
			setProductName("");
			setCategory("");
		} catch (e) {
			if (e instanceof Error) {
				setCreateProductAlert({ message: e.message, type: "error", open: true });
			} else {
				setCreateProductAlert({ message: "Unexpected error", type: "error", open: true });
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<>
			<Snackbar open={createProductAlert.open} autoHideDuration={6000} onClose={() => setCreateProductAlert({ ...createProductAlert, open: false })}>
				<Alert onClose={() => setCreateProductAlert({ ...createProductAlert, open: false })} severity={createProductAlert.type} sx={{ width: '100%' }}>
					{createProductAlert.message}
				</Alert>
			</Snackbar>
			<Grid container textAlign='center' spacing={3}>
				<Grid item xs={9} textAlign='left'>
					<Typography variant='h4'>{user?.email}</Typography>
				</Grid>
				<Grid item xs={3} textAlign='right'>
					<Button variant="outlined" onClick={logOut} >
						Sign Out
					</Button>
				</Grid>
				<Grid item xs={12} textAlign='center' mb={3}>
					<Button variant="outlined" size="large" onClick={handleOpenModal} >
						Creat product
					</Button>
				</Grid>
				{isLoading ? (
					<Grid item xs={12} textAlign='center'>
						<CircularProgress />
					</Grid>
				) : (
					<>
						{products?.map((product) => (
							<Grid item xs={12} key={product._id} textAlign='center'>
								<Typography variant='h4'>{product.category} - {product.name}</Typography>
							</Grid>
						))}
					</>
				)}
			</Grid>
			<Modal
				open={modalOpen}
				onClose={handleCloseModal}
			>
				<Box sx={style}>
					<TextField value={productName} label='Procut name' onChange={(e) => setProductName(e.target.value)} type="text" sx={{ mb: 2 }} fullWidth />
					<TextField value={category} label='Category' onChange={(e) => setCategory(e.target.value)} type="text" sx={{ mb: 3 }} fullWidth />
					{isLoading ? <CircularProgress /> : <Button disabled={productName.length === 0 || category.length === 0} variant="outlined" size="large" onClick={createProduct} >Create product</Button>}
				</Box>
			</Modal>
		</>
	)
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	textAlign: 'center'
};