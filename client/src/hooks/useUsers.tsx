import { useEffect, useState } from "react"
import { UserType } from "../components/types/UserType";

export const useUsers = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('http://localhost:5000/api/getallusers', {method: 'GET'})
        .then(async(response) => {
            const json = await response.json();
            if(json.success){
                setUsers(json.users)
            }
            setLoading(false)
        })
    }, []);
    return {loading, users}
}