import { useAuthStore } from "@/stores/auth";
import { useListStore } from "@/stores/list";

let ws: WebSocket;


const API_URL = import.meta.env.VITE_API_URL || ''


export function login(){
    console.log(`${API_URL.replace('https', 'wss').replace("http", 'ws')}/ws`, [ "Authorization", `Bearer ${useAuthStore().user?.token}` ])
    ws = new WebSocket(`${API_URL.replace('https', 'wss').replace("http", 'ws')}/ws`, [ "client", `${useAuthStore().user?.token}` ])
    ws.onmessage = function(event) {
        if (event.data =="updateItem"){
            useListStore().valid = false
        }
    }
    
    ws.onopen = function(event) {
        ws.send('Hello, Server!');
    }
    
}
export function logout(){
    ws.close()
}

export default {
    login,
    logout,
}