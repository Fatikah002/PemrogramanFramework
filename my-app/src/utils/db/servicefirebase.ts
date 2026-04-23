import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    addDoc,
    where,
    updateDoc
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

type OAuthUserData = {
    fullname: string;
    email: string;
    image?: string;
    type?: string;
    role?: string;
};

type ServiceResult = {
    status: boolean;
    message: string;
    data?: OAuthUserData;
};

async function getUserByEmail(email: string) {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signIn(email: string) {
    const data = await getUserByEmail(email);
    if (data) {
        return data[0];
    } else {
        return null;
    }
}

export async function signUp(
    userData: {
        email: string;
        fullname: string;
        password: string;
        role?: string;
    },
) {
    try {
        const data = await getUserByEmail(userData.email);

        if (data.length > 0) {
            return {
                status: "error",
                message: "User already exists",
            };
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await addDoc(collection(db, "users"), {
            email: userData.email,
            fullname: userData.fullname,
            password: hashedPassword,
            role: userData.role || "member",
            createdAt: new Date().toISOString(),
        });

        return {
            status: "success",
            message: "User registered successfully",
        };
    } catch (error: any) {
        return {
            status: "error",
            message: error?.message || "Internal server error",
        };
    }
}

export async function signInWithOAuth(
    userData: OAuthUserData,
    providerName: string = "OAuth",
): Promise<ServiceResult> {
    try {
        const data: any = await getUserByEmail(userData.email);

        if (data.length > 0) {
            const mergedUserData = {
                ...userData,
                role: data[0].role,
            };

            await updateDoc(doc(db, "users", data[0].id), mergedUserData);
            return {
                status: true,
                message: `User registered and logged in with ${providerName}`,
                data: mergedUserData,
            };
        }

        const newUserData = {
            ...userData,
            role: "member",
        };
        await addDoc(collection(db, "users"), newUserData);
        return {
            status: true,
            message: `User registered and logged in with ${providerName}`,
            data: newUserData,
        };
    } catch (error: any) {
        return {
            status: false,
            message: `Failed to register user with ${providerName}`,
        };
    }
}

export async function signInWithGoogle(userData: any, callback: any) {
    const result = await signInWithOAuth(userData, "Google");
    callback(result);
}