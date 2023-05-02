'use client'
import Image from "next/image"
import { useState } from "react"

const HomePage = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) =>{
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if (!file) return

    try{
      const formData = new FormData()
    formData.set('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if(res.ok){
      console.log('file uploaded')
    }
    const data = await res.json()
    console.log(data)
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-zinc-950 p-5">
        <h1 className="text-4xl text-center my-4 text-zinc-100">Upload file:</h1>

        <form
          className="bg-zinc-950 p-5"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-zinc-900 text-zinc-100 p-2 rounded-md block mb-2"
          />

          <button
            className="bg-green-500 text-zinc-100 p-2 rounded-md block w-full disabled:opacity-50"
            disabled={!file}
          >
            Upload
          </button>
        </form>

        {
          file && (
            <Image src={URL.createObjectURL(file)} alt="uploaded file" className="w-64 h-64 object-cover mx-auto"
            width={256}
            height={256}/>
          )
        }
      </div>
    </div>
  )
}

export default HomePage