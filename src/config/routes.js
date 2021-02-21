import Auth from "../containers/Auth/Auth";
import Chat from "../containers/Chat/Chat";

const routes = [
    {
        path: '/auth',
        component: Auth,
        isPrivate: false
    },
    {
        path: '/chat',
        component: Chat,
        isPrivate: true
    }
]

export default routes;