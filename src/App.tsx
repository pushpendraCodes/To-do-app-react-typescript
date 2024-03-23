import Todo from "./Todo";

function App() {
  return (
    <>
      <div className=" w-2/5 max-h-screen  py-2 px-3  mx-auto">
        <h2 className=" bg-red-600 px-3 rounded-md py-2 font-bold font-serif text-white ">
          ToDo App
        </h2>
        <Todo/>
      </div>
    </>
  );
}

export default App;
