import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import configureStore from './configureStore';

// Containers
import Home from 'containers/Home';
import NotFound from 'containers/NotFound';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';

const App = () => {
	return (
		<Provider store={configureStore}>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='*' component={NotFound} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</Provider>
	);
};

export default App;
