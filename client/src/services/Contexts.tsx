import React from 'react'

type context = {
  jobs: any | null
  addJob: any
  searchJobs: any
}

const AuthContext = React.createContext<Partial<context>>({})

export const ContextProvider = AuthContext.Provider
export const ContextConsumer = AuthContext.Consumer

export default AuthContext
