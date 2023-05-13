import { useNavigate, useParams } from "react-router-dom";
import { verifyPassword } from "../../services/UserService";

function VerifyPassword() {
    const { token } = useParams()
    const navigate = useNavigate()
    const handleActivate = async () => {
        await verifyPassword(token)
        navigate('/login')
    }

    return (
        <div >
            <h2>Click here to change your password</h2>
            <button onClick={handleActivate}>Change</button>

        </div>
    );
}

export default VerifyPassword;