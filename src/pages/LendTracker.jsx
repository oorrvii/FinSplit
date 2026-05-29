import {useState,useContext} from 'react'
import AppContext from '../context/AppContext'

function LendTracker(){
    const[person,setperson]=useState("")
    const[amount,setamount]=useState(0)
    const[date,setdate]=useState("")
    const[status,setstatus]=useState("pending")
    const{lends,setlends,deleteLend} =useContext(AppContext)

    function HandleSubmit(e){
        e.preventDefault()
        const newlend={
            id: Date.now(),
            person,
            amount,
            date,
            status,
        }
        setlends([...lends,newlend])
        setperson("")
        setamount(0)
        setdate("")
        setstatus("pending")
    }
    
    function markAsReturned(id){
       setlends(lends.map((lend) => 
       lend.id === id ? { ...lend, status: "returned" } : lend
    ))}

    return(
    <div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-white mb-8">Lend Tracker</h2>
        
        {/* Form Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
            <h3 className="text-emerald-400 font-semibold mb-6">Add New Lend</h3>
            <form onSubmit={HandleSubmit} className="flex gap-4 items-end">
                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-sm">Person</label>
                    <input 
                        value={person} 
                        onChange={(e)=>setperson(e.target.value)}
                        className="bg-slate-900 border border-slate-700 focus:border-emerald-400 outline-none text-white px-4 py-2 rounded-lg w-40"
                        placeholder="Name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-sm">Amount</label>
                    <input 
                        value={amount} 
                        onChange={(e)=>setamount(e.target.value)}
                        className="bg-slate-900 border border-slate-700 focus:border-emerald-400 outline-none text-white px-4 py-2 rounded-lg w-36"
                        placeholder="₹ 0"
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
                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-sm">Status</label>
                    <select 
                        value={status} 
                        onChange={(e)=>setstatus(e.target.value)}
                        className="bg-slate-900 border border-slate-700 focus:border-emerald-400 outline-none text-white px-4 py-2 rounded-lg"
                    >
                        <option value="pending">Pending</option>
                        <option value="returned">Returned</option>
                    </select>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                    Add Lend
                </button>
            </form>
        </div>

        {/* Lends List */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-emerald-400 font-semibold mb-6">Active Lends</h3>
            {lends.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No lends yet. Add your first lend above!</p>
            ) : (
                lends.map((lend) => (
                    <div key={lend.id} className="flex justify-between items-center py-4 border-b border-slate-700 last:border-0">
                        <div>
                            <p className="text-white font-medium">{lend.person}</p>
                            <p className="text-slate-400 text-sm">{lend.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-yellow-400 font-bold text-lg">₹{lend.amount}</p>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${lend.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-emerald-400/10 text-emerald-400'}`}>
                                {lend.status}
                            </span>
                            {lend.status === 'pending' && (
                                <>
                                <button 
                                    onClick={() => markAseturned(lend.id)}
                                    className="text-xs bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full transition-colors duration-200"
                                >
                                    Mark Returned
                                </button>
                                <button 
                                   onClick={() => deleteLend(lend.id)}
                                   className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200"
                                   >
    Delete
</button>
                               </> 
                            )}
                            
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
)
}
export default LendTracker