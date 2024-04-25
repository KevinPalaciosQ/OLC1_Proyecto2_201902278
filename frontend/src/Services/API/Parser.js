import axios from 'axios'

const instance = axios.create(
    {
        //cambiar localhost:5001 por 5002
        baseURL: 'http://localhost:5001/api',
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

export const parse = async (value) => {
    const { data } = await instance.post("/parse", { peticion: value })
    return data
}

export const ping = async () => {
    const { data } = await instance.get("/ping")
    return data
}
export const tabla=async()=>{
    const {data}=await instance.get("/tabla")
    return data
}