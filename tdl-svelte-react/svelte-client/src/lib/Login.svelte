<script lang="ts">
  import type { User } from "../types";
  import userServices from "../services/user";
  import { loggedIn } from "../stores";
  import { onMount } from "svelte";

  const user: User = {
    name: "demo",
    password: "demo123",
  };

  onMount(() => {
    const token = userServices.getToken();
    if (token === "") {
      console.log("no token");
      return;
    }
    loggedIn.setTrue();
    return () => console.log("Login component destroyed");
  });

  const handleLogin = async () => {
    try {
      console.log(user);
      const res = await userServices.login(user);
      localStorage.setItem("token", res.message);
      loggedIn.setTrue();
    } catch (e) {
      console.log("oops! error in login page");
    }
  };
</script>

<div>
  <p id="login">Login</p>
  <form on:submit|preventDefault={handleLogin}>
    Name: <input type="text" id="name" bind:value={user.name} />
    Password: <input type="password" id="password" bind:value={user.password} />
    <button type="submit">Login</button>
  </form>
</div>

<style>
  #login {
    font-size: 2rem;
    margin: 0;
  }
  div {
    border: 1px solid rgb(126, 123, 123);
    width: 30rem;
    height: 12rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    height: 1rem;
    padding: 0.3rem;
    font-size: 1.3rem;
    width: 10rem;
  }

  button {
    font-size: 1.3rem;
    margin: 0.3rem;
    height: 2rem;
    width: 5rem;
  }
</style>
