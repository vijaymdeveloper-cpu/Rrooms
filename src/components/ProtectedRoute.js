import { useSelector } from "react-redux";
import NotLoggedInScreen from '../screens/otherScreen/NotLoggedInScreen'

export default function ProtectedRoute({ children }) {

    const { userDetail } = useSelector(state => state.auth);

    if (!userDetail?.id) {
        return <NotLoggedInScreen />
    }

    return children;
}