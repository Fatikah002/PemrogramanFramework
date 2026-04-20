import {
    getFirestore,
    collection,
    getDocs,
    Firestore,
    getDoc,
    doc,
    query,
    addDoc,
    where,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

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

export async function signUp(
    userData: {
        email: string;
        fullname: string;
        password: string;
        role?: string;
    },
) {
    try {
        const q = query(
            collection(db, "users"),
            where("email", "==", userData.email),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

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
            role: "member",
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