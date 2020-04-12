React.lazy() makes it easy to create components that are loaded using dynamic import() but are rendered like regular components.

React.lazy() takes a function as its argument that must return a promise by calling import() to load the component. The returned Promise resolves to a module with a default export containing the React component.

A component created using React.lazy() only gets loaded when it needs to be rendered.

Hence, there is need to display some form of placeholder content while the lazy component is being loaded — possibly a loading indicator. This is exactly what React.Suspense was created for.

React.Suspense is a component that is meant for wrapping lazy components. You can wrap multiple lazy components at different hierarchy levels with a single Suspense component.


https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52/

https://reactjs.org/docs/code-splitting.html