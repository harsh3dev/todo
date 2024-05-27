import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import Filter from './Filter';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodo, updateSearchTerm } from '../redux/actions';
import { ShepherdJourneyProvider, useShepherd } from "react-shepherd";


const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };


  function StartTour() {
    const shepherd = useShepherd();
    const tour = new shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: true,
        scrollTo: true,
        classes:
          " bg-white p-5 w-96 rounded-lg border-2 border-indigo-500",
      },
    });

    const Steps = [
      {
        id: "intro",
        attachTo: { element: "#addTodo", on: "top" },
        buttons: [
          {
            classes: "mt-2 mr-2 bg-white", // Added mr-2 for margin-right
            text: "🚪 Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "mt-2 bg-white ", // Used btn-sm for smaller buttons
            text: "➡️ Next",
            action() {
              return this.next();
            },
          },
        ],
        title:
          "<span className='text-lg font-bold bg-white '>👋 Welcome to Company task management</span>", // Added classes for larger, bold title
        text: [
          "<p className='bg-white' >Here you can add tasks, update them and delete them</p>",
        ],
      },
      {
        id: "search",
        attachTo: { element: "#search", on: "top" },
        buttons: [
          {
            classes: "mt-2 mr-2", // Added mr-2 for margin-right
            text: "🚪 Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "mt-2", // Used btn-sm for smaller buttons
            text: "➡️ Next",
            action() {
              return this.next();
            },
          },
        ],
        title: "<span className='text-lg font-bold bg-white '>🔍 Search</span>", // Added classes for larger, bold title
        text: [
          "<p className='bg-white' >Use the search bar to find <b>your important</b> tasks</p>",
        ],
      },
      {
        id: "random",
        attachTo: { element: "#todo", on: "top" },
        buttons: [
          {
            classes: "mt-2 mr-2", // Added mr-2 for margin-right
            text: "🚪 Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "mt-2", // Used btn-sm for smaller buttons
            text: "➡️ Next",
            action() {
              return this.next();
            },
          },
        ],
        title: "<span className='text-lg font-bold bg-white '>🙈View TODO</span>", // Added classes for larger, bold title
        text: [
          "<p className='bg-white' >Here you can view all your todos</p>",
        ],
      },
      {
        id: "categories",
        attachTo: { element: "#mkd", on: "left" },
        buttons: [
          {
            classes: "btn btn-error btn-sm mr-2 mt-2 ", // Added mr-2 for margin-right
            text: "🚪 Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "mt-2", // Used btn-sm for smaller buttons
            text: "🎉 Finish",
            action() {
              return this.complete();
            },
          },
        ],
        title: "<span className='text-lg font-bold bg-white '>Mark as done</span>", // Added classes for larger, bold title
        text: [
          "<p className='bg-white' >Using this you can mark the todos done</p>",
        ],
      },
    ];

    tour.addSteps(Steps);

    return (
      <button className="bg-slate-800 text-white rounded-lg font-bold p-3 text-lg" onClick={tour.start}>
        Start Tour 
      </button>
    );
  }


  return (
    <ShepherdJourneyProvider>
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>Company Task Manager</h2>
      <div id='addTodo' className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodoClick}
        >
          <BsPlus size={20} />
        </button>
      </div>

      <div id='search' className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Filter />
        <div id='mkd' className="flex items-center mb-4 ">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

<div id='todo'>
      <TodoList />
</div>

      <div className="flex flex-col justify-center mt-10 w-full">
          <div className="text-lg md:text-2xl mb-6 ">
           
            <span>
              Click on the button below to start the tour and explore the
              website.
            </span>
          </div>

          <StartTour />
          </div>
    </div>
    </ShepherdJourneyProvider>
  );
};

export default Todo;