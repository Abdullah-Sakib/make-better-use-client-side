import React, { useState } from "react";

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border rounded shadow-sm">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <div className="flex items-center justify-center w-8 h-8 border rounded-full">
          <svg
            viewBox="0 0 24 24"
            className={`w-3 text-gray-600 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="2,7 12,17 22,7"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
};

const Blogs = () => {
  return (
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 min-h-[92vh]">
      <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div class="space-y-4">
          <Item title="What are the different ways to manage a state in a React application?">
            There are four main types of state to manage React apps:
            <li>Local state</li>
            <li> Global state</li>
            <li>Server state</li>
            <li> URL state</li>
          </Item>
          <Item title="How does prototypical inheritance work?">
            The Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects. It is a method by which an object
            can inherit the properties and methods of another object.
            Traditionally, in order to get and set the [[Prototype]] of an
            object, we use Object. getPrototypeOf and Object.
          </Item>
          <Item title="What is a unit test? Why should we write unit tests?">
            The main objective of unit testing is to isolate written code to
            test and determine if it works as intended. Unit testing is an
            important step in the development process, because if done
            correctly, it can help detect early flaws in code which may be more
            difficult to find in later testing stages.
          </Item>
          <Item title="React vs. Angular vs. Vue?">
            Both - Angular JS and React JS frameworks are used to create web
            interfaces for front end development. Angular is Google's matured
            and advanced JavaScript framework based on TypeScript, whereas Vue
            is a progressive open-source front-end JavaScript framework created
            by Evan You.
          </Item>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
