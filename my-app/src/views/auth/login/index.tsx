import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import style from "./login.module.scss";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <div className={style.login}>
      {error && <p className={style.login__error}>{error}</p>}
      <h1 className={style.login__title}>Halaman login</h1>
      <div className={style.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label htmlFor="email" className={style.login__form__item__label}>
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
              className={style.login__form__item__input}
            />
          </div>

          <div className={style.login__form__item}>
            <label
              htmlFor="password"
              className={style.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              minLength={6}
              required
              onInvalid={handlePasswordInvalid}
              onInput={resetValidationMessage}
              className={style.login__form__item__input}
            />
          </div>

          <button
            type="submit"
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "login"}
          </button>
          {""}
          <br />
          <br />
          <button
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={style.login_form_item_button}
            disabled={isLoading}
          >
            {isLoading ? "Loading ... " : "sign in with google"}
          </button>
          <br />
          <br />
          <button
            onClick={() => signIn("github", { callbackUrl, redirect: false })}
            className={style.login_form_item_button}
            disabled={isLoading}
          >
            {isLoading ? "Loading ... " : "sign in with github"}
          </button>
        </form>

        <br />
        <p className={style.login__form__item__text}>
          Tidak punya {"'"} akun?{" "}
          <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanLogin;
