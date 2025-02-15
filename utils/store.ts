import { create } from "zustand";

interface ChatMessage {
  from: string;
  to: string;
  message: string;
  time: string;
}
interface ChatState {
  isVisible: boolean;
  chatData: {
    imageLink: string;
    name: string;
    lastChat: string;
    time: string;
    unreadChatsCount: number;
  };
  messages: ChatMessage[];
  updateIsVisible: (isVisible: boolean) => void;
  updateChatData: (chatData: ChatState["chatData"]) => void;
  addMessage: (message: ChatMessage) => void;
}

type Action = {
  updateIsVisible: (isVisible: ChatState["isVisible"]) => void;
  updateChatData: (chatData: ChatState["chatData"]) => void;
};
export const useIsVisibleStore = create<ChatState & Action>((set) => ({
  isVisible: false,
  chatData: {
    imageLink: "",
    name: "",
    lastChat: "",
    time: "",
    unreadChatsCount: 0,
  },
  updateIsVisible: (isVisible) => set(() => ({ isVisible: isVisible })),
  updateChatData: (chatData) => set(() => ({ chatData: chatData })),
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

type userState = {
  userInfo: { id: string; name: string; profilePicUrl: string };
  receiverId: string
};
type userAction = {
  setUserInfo: (userState: userState["userInfo"]) => void;
  setReceiverId: (receiverId: string) => void;
};

export const useUserStore = create<userState & userAction>((set) => ({
  userInfo: { id: "", name: "", profilePicUrl: "" },
  setUserInfo: (userInfo) => set(() => ({ userInfo: userInfo })),
  receiverId: "",
  setReceiverId: (receiverId) => set(() => ({ receiverId: receiverId}))
}));
