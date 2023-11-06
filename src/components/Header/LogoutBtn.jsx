import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
            .then(() => { dispatch(logout()); })
            .catch((error) => { console.log("LogoutBtn :: error: ", error); });
    };

    return (
        <button
            onClick={logoutHandler}
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
        >
            Logout
        </button>
    );
};

export default LogoutBtn;