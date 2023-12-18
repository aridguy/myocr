import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import hero from "../Assets/undraw_Filing_system_re_56h6.png";
import Footer from "../Components/Footer";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
    // const texts = "hello";

  const [showHeroDefault, setShowHeroDefault] = useState(true);
  const [showConvertDoc, setShowConvertDoc] = useState(false);
//   const [resultConverted, setResultConverted] = useState("hello world");

  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleShowConvertDoc = () => {
    setShowConvertDoc(true);
    setShowHeroDefault(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    if (!file) {
        Swal.fire({
            title: "Nothing to convert!",
            text: "Please choose atleast a file",
            icon: "error"
          });
      return;
    }

    const data = new FormData();
    data.append("srcImg", file);
    data.append("Session", "string");

    const options = {
      method: 'POST',
      url: 'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/',
      headers: {
        'X-RapidAPI-Key': '9214e4dc39msh9c3202d88ae209ep1394d7jsnc5caea95c235',
        'X-RapidAPI-Host': 'pen-to-print-handwriting-ocr.p.rapidapi.com',
        'Content-Type': 'multipart/form-data', // Set Content-Type manually
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6 mt-5">
              <div className="mt-5">
                <span className="text-black fs-1">
                  Image to text converter is a free OCR tool that allows you to
                  convert image containing handwritings to printable and
                  editable texts.
                </span>
              </div>
              <button
                onClick={toggleShowConvertDoc}
                className="btn btn-info blue btn-lg mt-3"
              >
                Upload to convert
              </button>
            </div>
            <div className="col-md-6 mt-5">
              <div>
                {showHeroDefault && (
                  <img src={hero} alt="" className="w-75 img-fluid" />
                )}
              </div>

              {showConvertDoc && (
                <section className="">
                  <div>
                    {" "}
                    <small className="text-red text-danger">
                      not more than 1mb sized file at a time <br />
                      file object of the image (jpg or png format) to be scanned.
                    </small>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <button type="submit" className="btn btn-info blue">
                        Convert
                      </button>
                    </form>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="">
                          <small className="text-info fs-4">
                            Convert your doc here!
                          </small>
                        </div>
                        <div>
                          <textarea defaultValue={JSON.stringify(result.value)}>
                            
                          </textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
