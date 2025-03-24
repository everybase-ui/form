import examples from "./examples";

const App = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="py-8">
        <h1 className="text-4xl font-bold">@everybase/form examples</h1>
        <p className="text-gray-500 text-lg mt-2">Start building amazing things with Rsbuild.</p>
      </div>
      
      <ul className="divide-y divide-gray-100 border-t border-gray-200">
        {examples.map((Example, idx) => (
          <li key={idx} className="py-12">
            <h3 className="text-2xl font-bold">{Example.title}</h3>
            <p className="mt-2 text-lg text-gray-600">{Example.description}</p>
            <div className="mt-8 max-w-md bg-gray-100 p-8 rounded-lg">
              <Example />
            </div>
          </li>
        ))}
      </ul>      
    </div>
  );
};

export default App;
