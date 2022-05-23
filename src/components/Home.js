import styled from "styled-components"
import { useState, useEffect } from "react"
import axios from "axios";

export default function Home() {

  const [image, setImage] = useState("");
  const [state, setState] = useState(false);
  const [getImages, setGetImages] = useState([]);

  function handleInputs(e) {
    setImage(e.target.files[0]);
  }

  useEffect(() => {
    const URL = "http://localhost:5000/"
    const promise = axios.get(URL);
    promise.then((response) => {
      const { data } = response;
      setGetImages(data)
    });

    promise.catch((e) => {
      console.log(e.response)
    });
  }, [state])

  function handleSubmit(e) {
    e.preventDefault()
    if (image !== "") {
      const URL = "http://localhost:5000/"

      const formData = new FormData();
      formData.append('file', image);

      const promise = axios.post(URL, formData);
      promise.then((response) => {
        const { data } = response;
        console.log(data);
        setState(!state)
      });

      promise.catch((e) => {
        console.log(e.response.data)
      });
    } else {
      alert("Imagem Vazia")
    }
  }
  return (
    <HomeMain>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleInputs} />
        <button>Submit</button>
      </form>

      <div>
        {getImages.map((image, index) => {
          const { url } = image.imageBody;
          return (
            <img src={url} key={index} alt="imagem" ></img>
          )
        })}
      </div>
    </HomeMain>
  )
}
const HomeMain = styled.main`
  form {
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    margin-top: 200px;

    input {
      padding: 10px 5px;
      background-color: #4285DD;
      color: black;
      font-size: 15px;
      margin-bottom: 15px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      display: block;
      margin-top: 10px;
      border-radius: 10px;
      cursor: pointer;
    }

    button {
      border: none;
      padding: 10px 5px;
      width: 200px;
      background-color: #4285DD;
      color: black;
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      display: block;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  div {
    margin-top: 30px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-wrap: wrap;
    max-width: 800px;
  }

  img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 10px;
    }

`