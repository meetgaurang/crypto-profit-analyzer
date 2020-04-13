Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application.

Till React 16.3 the standard solution to problems like this one was Redux or Mobx like state management library. But now React Context is embedded in core React library.

https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87

https://www.toptal.com/react/react-context-api

https://reactjs.org/docs/context.html