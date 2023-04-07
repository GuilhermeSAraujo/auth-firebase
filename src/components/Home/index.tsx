import { Button, Grid, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth as authConfig } from "../../firebase-config";

export const Home = () => {
	const history = useNavigate();

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		if(!user){
			history('/signup');
		}
	})

	const logOut = async () => {
		try{
			await signOut(authConfig);
			history('/signup');
		}catch(err){
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log('Unexpected error', err);
			}
		}
	}

	return (
		<Grid container textAlign='center' spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h4'>{user?.email}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button variant="outlined" onClick={logOut} >
				Sign Out
				</Button>
			</Grid>
		</Grid>

	)
}