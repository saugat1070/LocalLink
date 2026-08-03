import $axios from "@/config/axios.api";
import { AuthEndpoint } from "@/enums/auth.enum";
import { authStorage } from "@/lib/auth.storage";
export const authenticateService = {
    async logout(){
        const res = await $axios.post(AuthEndpoint.LOGOUT);
        if(res){
            authStorage.clear();
        }
    }
}