
import { useEffect, useState } from "react"
import { UserType } from "../components/types/UserType";

export type Friend = {
    id?: string,
    name: string,
    image: string,
    status: string
}

export const useDebounce = (data: string, timeout: number) => {
    const [debouncedValue, setDebouncedValue] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeOutNumber = setTimeout(async() => {
            setLoading(true)
            if(data){
                fetch(`http://localhost:5000/api/debounce/${data}`, {method: 'GET'}).then((response) => {
                    response.json().then((json) => {setDebouncedValue(json.users); setLoading(false)})
                })
            }
            else{
                setDebouncedValue([])
                setLoading(false)
            }
        }, timeout);
        return () => {
            clearTimeout(timeOutNumber);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return {loading, users:debouncedValue};

}