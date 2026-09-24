import { createContext, useContext, useState } from "react";

/*
 * CONTEXT API in 3 steps:
 * 1. createContext()          -> makes the "container"
 * 2. <Context.Provider value> -> wraps the app and supplies the data
 * 3. useContext()             -> any component reads the data (no prop drilling)
 */

// Step 1
const FormContext = createContext(null);

// Step 2: Provider component holds the shared state
export function FormProvider({ children }) {
  const [formData, setFormData] = useState(null); // null = nothing submitted yet

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

// Step 3: a small custom hook so components can write useFormData()
export function useFormData() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormData must be used inside <FormProvider>");
  return ctx;
}
