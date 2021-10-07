// Import Components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import React and hooks
import React, { useState, useEffect } from "react";

// Import components from React Router
import { Route, Switch, Link } from "react-router-dom";

function App(props) {
  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
  };

  ///////////////
  // State & Other Variables
  ///////////////

  // Our Api Url
  const url = "http://localhost:8000/todos/";

  // State to Hold The List of Posts
  const [posts, setPosts] = useState([]);

  const nullTodo = {
    subject: '',
    details: ''
  }

  const [targetTodo, setTargetTodo] = useState(nullTodo)
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

  

  const getTargetTodo = todo => {
    setTargetTodo(todo);
    props.history.push('/edit');
  }

  const updateTodo = async todo => {
      try {
        const response = await fetch(url + todo.id + '/', {
            method: "put",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(todo)
        })
      }catch(e) {
        console.error(e);
      }
      getTodos();
  }

  const deleteTodo = async todo => {
    try {
        const response = await fetch(url + todo.id + "/", {
          method: "delete",
        }).then(data => getTodos())
    }catch(e) {
        console.error(e)
    }finally{
        window.location.assign('/')
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
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost 
                {...routerProps} 
                posts={posts} 
                edit={getTargetTodo}
                deleteTodo={deleteTodo}
            />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => (
            <Form {...routerProps} 
            initialTodo={nullTodo}
            handleSubmit={addTodos}
            buttonLabel="Create Todo" 
            />
            )}
        />
        <Route
          path="/edit"
          render={(routerProps) => (
            <Form {...routerProps} 
            initialTodo={targetTodo}
            handleSubmit={updateTodo}
            buttonLabel="Update Todo" 
            />
            )}
        />
      </Switch>
    </div>
  );
}

export default App;