import { useEffect, useState } from "react"
import memesData from "../memesData"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        memeUrl: ""
    })
    const [allMemeImages, setAllMemeImages] = useState(memesData)

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res=>res.json())
            .then(data=>setAllMemeImages(data))
    }, [])

    // console.log(allMemeImages)

    function getMemeImage() {
        let memeImage =  allMemeImages.data.memes[Math.floor(Math.random()*allMemeImages.data.memes.length)]
        let url = memeImage.url
        setMeme(prevMeme => ({
            ...prevMeme,
            memeUrl: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevFormData => {
            const newFormData = {
                ...prevFormData,
                [name]: value
            }
            return newFormData
        })
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text" 
                    className="form--input"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input 
                    type="text" 
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}    
                >Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img 
                    src={meme.memeUrl}
                    alt={meme.memeUrl}
                    className="meme--image"
                />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}