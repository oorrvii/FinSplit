import {useContext} from 'react'
import AppContext from '../context/AppContext'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

function Dashboard(){
    const {totalbalance,settotalbalance,expenses,lends} =useContext(AppContext)
    const totalSpent = expenses.reduce((total, expense) => total + Number(expense.amountspent), 0)
    const totalLent = lends.reduce((total, lend) => total + Number(lend.amount), 0)
    const moneyLeft = totalbalance - (totalSpent + totalLent)

    const groupedByDate = expenses.reduce((acc, expense) => {
    const date = expense.date
    if(acc[date]){
        acc[date] += Number(expense.amountspent)
    } else {
        acc[date] = Number(expense.amountspent)
    }
    return acc
}, {})

    const chartData = Object.keys(groupedByDate).map(date => ({
    date,
    amount: groupedByDate[date]
    }))
   return(
    <div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-white mb-8">Overview</h2>
        
        {/* Balance Input */}
        <div className="mb-8">
            <label className="text-slate-400 text-sm font-medium mb-2 block">Set Total Balance</label>
            <input 
                value={totalbalance} 
                onChange={(e)=>settotalbalance(e.target.value)}
                className="bg-slate-800 border border-slate-700 focus:border-emerald-400 outline-none text-white px-4 py-2 rounded-lg w-48"
                placeholder="Enter amount"
            />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-slate-800/50 border border-slate-700 hover:border-emerald-400/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10">
                <p className="text-slate-400 text-sm mb-2">Total Balance</p>
                <p className="text-3xl font-bold text-white">₹{totalbalance}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 hover:border-emerald-400/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10">
                <p className="text-slate-400 text-sm mb-2">Total Spent</p>
                <p className="text-3xl font-bold text-red-400">₹{totalSpent}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 hover:border-emerald-400/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10">
                <p className="text-slate-400 text-sm mb-2">Total Lent</p>
                <p className="text-3xl font-bold text-yellow-400">₹{totalLent}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 hover:border-emerald-400/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10">
                <p className="text-slate-400 text-sm mb-2">Money Left</p>
                <p className={`text-3xl font-bold ${moneyLeft >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>₹{moneyLeft}</p>
            </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-6">Spending Trend</h3>
            <LineChart width={800} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px'}} />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} dot={{fill: '#10b981'}} />
            </LineChart>
        </div>
    </div>
)
}
export default Dashboard