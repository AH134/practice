<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { TodoType } from "../types";

  const dispatch = createEventDispatcher();

  export let todo: TodoType;
  let open = false;

  function handleOpen() {
    open = !open;
  }

  function deleteTodo() {
    dispatch("delete", {
      id: todo.id,
    });
  }

  function handleMark() {
    dispatch("mark", {
      id: todo.id,
    });
  }
</script>

<div id="container">
  <div id="top">
    {#if todo.completed}
      <p><strike>Title: {todo.title} | Completed: {todo.completed}</strike></p>
    {:else}
      <p>Title: {todo.title} | Completed: {todo.completed}</p>
    {/if}
    <button on:click={handleOpen}>Open</button>
    <button on:click={handleMark}>Mark</button>
    <button on:click={deleteTodo}>Delete</button>
  </div>
  {#if open}
    <div id="bot">
      <p>
        {todo.description}
      </p>
    </div>
  {/if}
</div>

<style>
  #container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #top {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #bot {
    background-color: rgb(42, 42, 42);
    display: flex;
    height: 10rem;
    width: 80%;
    border: 1px solid white;
  }

  #bot p {
    overflow: auto;
    word-break: break-all;
    white-space: normal;
    font-size: 1.3rem;
  }

  button {
    margin: 0 0.2rem;
    height: 2rem;
    width: 4rem;
  }
</style>
