import Init from "./pages/login/Login";
import ChatPage from "./pages/chat/ChatPage";

const routes = [
  { path: "/", element: <Init />, exact: true },
  { path: "/chat", element: <ChatPage /> },
];

export default routes;
