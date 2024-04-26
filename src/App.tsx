import { GlobalStyle } from './app/Styles/PrimaryStyles'
import { Route, Routes } from 'react-router-dom';
import Main from './app/Main';
import Output from './app/features/Output/Output';
import { createRef } from 'react';

function App() {
    const exportRef = createRef<HTMLDivElement>();

	return (
		<>
			<GlobalStyle />
			{/* <Disclaimer /> */}
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/out' element={<Output ExportRef={exportRef}/>} />
			</Routes>
			{/* <DamageCalcPage /> */}
		</>
	);
}


export default App;
