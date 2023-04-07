import { Button, Grid, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
	const history = useNavigate();
	
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

	const handleChangePassWord = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

	console.log("Rerender");

	const signIn = async () => {
		try{
			await signInWithEmailAndPassword(auth, email, password);
			history('/home');
		}catch(err){
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log('Unexpected error', err);
			}
		}
	}

	return (
		<Grid container textAlign='center' spacing={2}>
			<Grid item xs={12}>
					<Typography variant='h4'>Sign In</Typography>
			</Grid>
			<Grid item xs={12}>
					<TextField value={email} label='Email' onChange={handleChangeEmail} type="email" />
			</Grid>
			<Grid item xs={12}>
					<TextField value={password} label='Password' onChange={handleChangePassWord} type='password' />
			</Grid>
			<Grid item xs={12}>
				<Button variant="outlined" onClick={signIn} >
				Sign In
				</Button>
			</Grid>
		</Grid>
	)
}