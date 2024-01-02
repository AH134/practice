<script lang="ts">
  import todoServices from "./services/todo";
  import Login from "./lib/Login.svelte";
  import Todo from "./lib/Todo.svelte";
  import type { TodoType } from "./types";
  import { user } from "./stores";
  import { getToken } from "./services/user";

  let todoList: TodoType[];

  const loadTodos = async () => {
    try {
      const token = getToken();
      const res = await todoServices.getTodos(token);
      todoList = res;
      console.log(todoList);
    } catch (e) {
      console.log("failed to get todo list");
    }
  };

  $: $user.loggedIn && loadTodos();
</script>

{#if $user.loggedIn}
  <main>
    <form on:submit|preventDefault={() => {}}>
      <p class="todo-input">
        Title <span> <input class="input" type="text" maxlength="15" /></span>
      </p>
      <p class="todo-input">
        Desc <span> <input class="input" type="text" maxlength="50" /></span>
      </p>
      <div id="button-wrapper">
        <button draggable="false"> Submit </button>
      </div>
    </form>

    {#if todoList}
      <div>
        {#each todoList as todo (todo.id)}
          <Todo {todo} on:delete={() => {}} on:mark={() => {}} />
        {/each}
      </div>
    {/if}
  </main>
{:else}
  <Login />
{/if}

<style>
  main {
    overflow: auto;
    border: 2px solid rgba(146, 141, 141, 0.87);
    border-radius: 15px;
    height: 35em;
    width: 30em;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 10rem;
  }

  #button-wrapper {
    display: flex;
    padding: 1rem 0;
    justify-content: center;
  }

  button {
    font-size: 1.3rem;
    height: 2.5rem;
    width: 8rem;

    border: none;
  }

  button:hover {
    cursor: pointer;
    background-color: gray;
  }

  .todo-input {
    padding: 0;
    margin: 0;
    font-size: 1.3rem;
  }

  .todo-input input {
    font-size: 2rem;
  }

  .input {
    height: 2rem;
    width: 15rem;
  }
</style>
