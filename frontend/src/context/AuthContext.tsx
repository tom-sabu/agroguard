import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
    id: string
    name: string
    location: string
}

interface AuthContextType {
    user: User | null
    login: (name: string, location: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // Check local storage for user
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (name: string, location: string) => {
        const newUser = { id: Date.now().toString(), name, location }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
