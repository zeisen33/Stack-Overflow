import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'
import './LoginForm.css'
import { Link } from 'react-router-dom'


const LoginFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to='/' />

    const handleEmail = (e) => {
        e.preventDefault()
        setEmail(e.currentTarget.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setPassword(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        return dispatch(sessionActions.loginUser({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    // clone lets you read response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text() // hits if server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    return (
        <div className='DisplayBoxes'>
            <div className='LoginBox'>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label id='LoginEmailLabel'>Email
                        <br />
                        <input
                            type="text" value={email} onChange={handleEmail}
                        ></input>
                    </label>
                    <br>
                    </br>
                    <label id='LoginPasswordLabel'>Password
                    <Link to='/' id='ForgotPassword'>Forgot Password?</Link>
                        <br/> 
                        <input
                            type="password" value={password} onChange={handlePassword}
                        ></input>
                    </label>
                    <br/>
                    <button type="submit" id='LogInButton'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginFormPage