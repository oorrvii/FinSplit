import {useState,useContext} from 'react'
import AppContext from '../context/AppContext'

function Expenses(){
    const {setexpenses,expenses,deleteExpense} = useContext(AppContext)
    const[amountspent,setamountspent]=useState(0)
    const[date,setdate]=useState("")
    const[place,setplace]=useState("")

function handleSubmit(e){
    e.preventDefault()
    const newExpense = {
       id: Date.now(),
       amountspent,
       date,
       place
    }
    setexpenses([...expenses, newExpense])
    setamountspent(0)
    setdate("")
    setplace("")
}
    return(
    <div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-white mb-8">Expenses</h2>
        
        {/* Form Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
            <h3 className="text-emerald-400 font-semibold mb-6">Add New Expense</h3>
            <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-sm">Amount</label>
                    <input 
                        value={amountspent} 
                        onChange={(e)=>setamountspent(e.target.value)}
                        className="bg-slate-900 border border-slate-700 focus:border-emerald-400 outline-none text-white px-4 py-2 rounded-lg w-36"
                        placeholder="₹ 0"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-sm">Where</label>
                    <input 
                        value={place} 
                        onChange={(e)=>setplace(e.target.value)}
                        className="bg-slate-900 border border-slate-700 focus:border-emerald-400 outline-none text-white px-4 py-2 rounded-lg w-48"
                        placeholder="e.g. Swiggy"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-sm">Date</label>
                    <input 
                        type="date"
                        value={date} 
                        onChange={(e)=>setdate(e.target.value)}
                        className="bg-slate-900 border border-slate-700 focus:border-emerald-400 outline-none text-white px-4 py-2 rounded-lg"
                    />
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                    Add Expense
                </button>
            </form>
        </div>

        {/* Expenses List */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-emerald-400 font-semibold mb-6">Transaction History</h3>
            {expenses.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No expenses yet. Add your first expense above!</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center py-4 border-b border-slate-700 last:border-0">
                        <div>
                            <p className="text-white font-medium">{expense.place}</p>
                            <p className="text-slate-400 text-sm">{expense.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
    <p className="text-red-400 font-bold text-lg">-₹{expense.amountspent}</p>
    <button 
        onClick={() => deleteExpense(expense.id)}
        className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200"
    >
        Delete
    </button>
</div>
                    </div>
                ))
            )}
        </div>
    </div>
)
}
export default Expenses