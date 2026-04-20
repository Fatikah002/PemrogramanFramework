import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import style from "./register.module.scss";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleEmailInvalid = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    if (input.validity.valueMissing) {
      input.setCustomValidity("Email wajib diisi");
      return;
    }

    if (input.validity.typeMismatch) {
      input.setCustomValidity("Format email tidak valid");
      return;
    }

    input.setCustomValidity("");
  };

  const handlePasswordInvalid = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    if (input.validity.valueMissing) {
      input.setCustomValidity("Password wajib diisi");
      return;
    }

    if (input.validity.tooShort) {
      input.setCustomValidity("Password minimal 6 karakter");
      return;
    }

    input.setCustomValidity("");
  };

  const resetValidationMessage = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = ((formData.get("email") as string) || "").trim();
    const fullname = formData.get("Fullname") as string;
    const password = (formData.get("Password") as string) || "";

    if (!email) {
      setIsLoading(false);
      setError("Email wajib diisi");
      return;
    }

    if (password.length < 6) {
      setIsLoading(false);
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
        return;
      }

      setIsLoading(false);
      setError(result?.message || "An error occurred");
    } catch {
      setIsLoading(false);
      setError("Cannot connect to server");
    }
  };

  return (
    <div className={style.register}>
      {error && <p className={style.register__error}>{error}</p>}
      <h1 className={style.register__title}>Halaman Register</h1>
      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.register__form__item}>
            <label
              htmlFor="email"
              className={style.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onInvalid={handleEmailInvalid}
              onInput={resetValidationMessage}
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label
              htmlFor="Fullname"
              className={style.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label
              htmlFor="Password"
              className={style.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              minLength={6}
              required
              onInvalid={handlePasswordInvalid}
              onInput={resetValidationMessage}
              className={style.register__form__item__input}
            />
          </div>

          <button
            type="submit"
            className={style.register__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        <br />
        <p className={style.register__form__item__text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;
