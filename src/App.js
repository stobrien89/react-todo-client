// Import Components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import React and hooks
import React, { useState, useEffect } from "react";

// Import components from React Router
import { Route, Switch } from "react-router-dom";

function App(props) {
  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  ///////////////
  // State & Other Variables
  ///////////////

  // Our Api Url
  const url = "http://localhost:8000/todos/";

  // State to Hold The List of Posts
  const [posts, setPosts] = useState([]);

  const nullTudo = {
    subject: '',
    details: ''
  }

  //////////////
  // Functions
  //////////////
  const getTodos = async () => {
      try{
          const response = await fetch(url);
          const data = await response.json();
          setPosts(data);
      }catch(e) {
          console.error(e);
      }
  }

  const addTodos = async newTodo => {
      try {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        }).then(_ => {
            return getTodos();
        })
      } catch(error){
        console.error(error);
      }
  }

  //////////////
  // useEffects
  //////////////
  useEffect(() => {
      getTodos();
  }, []);

  /////////////////////
  // returned JSX
  /////////////////////
  return (
    <div>
      <h1 style={h1}>My Todo List</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost {...routerProps} posts={posts} />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form {...routerProps} />}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form {...routerProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;