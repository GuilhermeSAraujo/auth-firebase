import { Grid, TextField, Typography, Button } from "@mui/material";
import { User, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
	const history = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const signUp = async () => {
		try{
			await createUserWithEmailAndPassword(auth, email, password);
			history('/home');
		}catch(err){
			if (err instanceof Error) {
				console.log(err.message);
			} else {
				console.log('Unexpected error', err);
			}
		}
	}

	const handleChangeEmail = useCallback((e : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

	const handleChangePassWord = useCallback((e : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

	return (
		<Grid container textAlign='center' spacing={2}>
			<Grid item xs={12}>
					<Typography variant='h4'>Sign Up</Typography>
			</Grid>
			<Grid item xs={12}>
					<TextField value={email} label='Email' onChange={handleChangeEmail} type="email" />
			</Grid>
			<Grid item xs={12}>
					<TextField value={password} label='Password' onChange={handleChangePassWord}  type='password' />
			</Grid>
			<Grid item xs={12}>
				<Button variant="outlined" onClick={signUp} >
				Sign Up
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body2' onClick={() => history('/signin')} sx={{textDecoration:'underline', ':hover':{cursor: 'pointer', color: 'lightblue' }}}>Already have an account?</Typography>
			</Grid>
		</Grid>
	)
}