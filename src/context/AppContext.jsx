import { createContext, useState, useEffect } from "react";
const AppContext = createContext();

function AppProvider({ children }) {
  const [totalbalance, settotalbalance] = useState(() => {
    const saved = localStorage.getItem('totalbalance')
    return saved ? JSON.parse(saved) : 0
})
  const [expenses, setexpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
})
  const [lends, setlends] = useState(() => {
    const saved = localStorage.getItem('lends')
    return saved ? JSON.parse(saved) : []
})

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem("lends", JSON.stringify(lends));
  }, [lends]);
  useEffect(() => {
    localStorage.setItem("totalbalance", JSON.stringify(totalbalance));
  }, [totalbalance]);


  function deleteExpense(id){
    setexpenses(expenses.filter((expense) => expense.id !== id))
}

  function deleteLend(id){
    setlends(lends.filter((lend) => lend.id !== id))
}

  return (
    <AppContext.Provider
      value={{
        totalbalance,
        settotalbalance,
        expenses,
        setexpenses,
        lends,
        setlends,
        deleteExpense,
        deleteLend
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContext;
export { AppProvider };
