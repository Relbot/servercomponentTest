import { Suspense, use } from "react"
import ClientChange from "../components/ClientChange"

const getAPIData = async (number: number) => {
  if (number != null) {
    const result = await fetch("https://api.publicapis.org/entries", { next: { revalidate: 0 } })
    const data = await result.json()
    const elem = data.entries as {API: string}[]
    
    return elem[number].API

  } else {
    return null
  }

}

export default function ServerChange(params: {num: string}) {
  

  const elem = use(getAPIData(parseInt(params.num)))

  
  return (
    <div>
          { elem }
      </div>
  )
}

