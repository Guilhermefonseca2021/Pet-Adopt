import { useEffect } from "react";
import { useParams } from "react-router-dom"


export default function Adopt() {
  const id = useParams().id;
  useEffect(() => {
    async function fetchPet(id: string | undefined) {
      const res = await fetch(`http://localhost:3000/pets/${id}`)
      const data = await res.json()
      console.log(data)
    }
    fetchPet(id)
  }, [id])

  return (
<>
</>  )
}
