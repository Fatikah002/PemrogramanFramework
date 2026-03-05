import Link from "next/link";

const halamanRegister = () => {
    return (
        <div>
            <h1>Halaman Register</h1>
            <Link href="/auth/login" style={{ textDecoration: "underline" }}>
                Ke Halaman Login
            </Link>
        </div>
    );
};

export default halamanRegister;