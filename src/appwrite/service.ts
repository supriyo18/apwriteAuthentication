import { ID, Account, Client } from 'appwrite';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
};

type LoginUserAccount = {
    email: string;
    password: string;
};

class AppwriteService {
    account: Account;

    constructor() {
        appwriteClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
        this.account = new Account(appwriteClient);
    }

    // Create a new user record inside Appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name


            );
            if (userAccount) {
                return this.login({
                    email, password
                })
            } return userAccount
            console.log("User account created successfully:", userAccount);
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG,
            });
            console.log("Appwrite service create account error:", error);
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG,
            });
            console.log("Appwrite service Login account error:", error);
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite logout  user :", error);
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite getCurrent  user :", error);
        }
    }
    // Implement loginUserAccount method if needed
}

export default AppwriteService;
