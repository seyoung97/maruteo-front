import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const router =(
  <Route>
    <Route index element={<HomePage/>}/>
  </Route>
)

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;