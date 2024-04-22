import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthRepository {

    private readonly key = ''

    public async getLoggedUser(){
        const json = await AsyncStorage.getItem('token');
        return json? JSON.parse(json) : null;
    }

    public async setLoggedUser(token : any){
        if(token){
            await AsyncStorage.setItem('token', JSON.stringify(token));
        }
    }

    public async removeLoggedUser(){
        await AsyncStorage.removeItem('token');
    }

}

export const authRepository = new AuthRepository();