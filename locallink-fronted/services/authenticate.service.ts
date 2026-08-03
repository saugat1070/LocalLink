import $axios from "@/config/axios.api";
import { AuthEndpoint } from "@/enums/auth.enum";

export const authenticate = {
    async logout(){
        const res = await $axios.post(AuthEndpoint.LOGOUT);
        
    }
}