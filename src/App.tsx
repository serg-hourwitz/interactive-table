// import './App.css'

import Header from './Heder/Header';
import OperationPanel from './OperationPanel/OperationPanel';
import PeopleTable from './Table/Table';

function App() {
  return (
    <div className="font-primary font-normal text-sm text-black max-w-[1956px] mx-12">
      <Header />
      <OperationPanel />
      <PeopleTable />
    </div>
  );
}

export default App;
