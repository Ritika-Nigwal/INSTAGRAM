import { message as toast } from "antd";
export async function AuthLogin(name, password, email, flag, navigate) {
  if (name.trim() !== "" && password.trim() !== "" && flag == true) {
    const user_login = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: name.trim(),
          password: password.trim(),
        }),
      },
    );
    console.log(user_login);
    if (user_login.ok) {
      const data = await user_login.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      toast.success("Loginned Successfully!!!", 5);
      return data;
    } else {
      toast.error("Please Enter Valid credentials!!!", 5);
      return { detail: "Try Again..." };
    }
  }
  if (
    name.trim() !== "" &&
    password.trim() !== "" &&
    flag === false &&
    email.trim() !== ""
  ) {
    const create_user = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name.trim(),
        email: email.trim(),
        password: password.trim(),
      }),
    });
    const data = await create_user.json();
    if (create_user.ok) {
      toast.success("user created successfully login to proceed", 5);
    } else {
      toast.error("User already exist", 5);
    }

    return data;
  }
  toast.error("Anyone of the field is empty...");
  return { detail: "Something went Wrong" };
}
