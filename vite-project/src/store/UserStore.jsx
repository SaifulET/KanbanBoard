import { create } from "zustand";
import Cookies from "js-cookie";


const UserStore = create((set) => ({
  text: "Login",
  setText: (newText) => {
    set({ text: newText });
  },
  logout:async()=>{

    Cookies.remove("token");
    set({text:"Login"})

  }
}));

export default UserStore;
