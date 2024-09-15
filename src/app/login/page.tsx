import { userLoginAction, userSignupAction } from "./ui/action";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={userLoginAction}>Log in</button>
      <button formAction={userSignupAction}>Sign up</button>
    </form>
  );
}
