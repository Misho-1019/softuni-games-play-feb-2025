import { useNavigate } from "react-router"
import { useRegister } from "../../api/authApi";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext)

    const registerHandler = async (formData) => {
        const { email, password } = Object.fromEntries(formData)

        const confirmPassword = formData.get('confirm-password')

        if (password !== confirmPassword) {
            console.log('Password mismatch!');
            
            return;
        }

        const authData = await register(email, password)

        userLoginHandler(authData)

        navigate('/')
    }
    return (
        // <!-- Register Page ( Only for Guest users ) -->
        <section id="register-page" className="content auth">
            <form id="register" action={registerHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com" />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}