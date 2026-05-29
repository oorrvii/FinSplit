import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav style={{backdropFilter: 'blur(10px)', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)'}}>
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-400 tracking-wider">Fin<span className="text-white">split</span></h1>
                <div className="flex gap-8">
                    <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 font-medium">Dashboard</Link>
                    <Link to="/expenses" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 font-medium">Expenses</Link>
                    <Link to="/lendtracker" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 font-medium">Lend Tracker</Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar