import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const Home = () => {
  const [data, setdata] = useState([]);
  const [more, setmore] = useState([])
  const [search, setSearch] = useState([])
  const [natija, setnatija] = useState(true)
  const [Kitoblar, setKitoblar] = useState([])
  function addFun(e) {
    let natija = [...Kitoblar]
    natija.push(e)
    setKitoblar(natija)
    console.log(Kitoblar, "kitoblar kelsdi");
  }

  function Rightaddfun(params) {
    let natija = [...more]
    natija.push(params)
    setmore(natija)
    console.log("ishladi", more);
  }

  function Search(params) {
    console.log(params, "Data malumot =>", data);
    // setqidir(params)
    let natija = []
    natija = data.filter((item, key) => {
      return item.Title.toLowerCase().includes(params.toLowerCase())

    })
    setSearch(natija)
    setnatija(false)


    // console.log(qidir.length,"Qidirni lengizi=>", qaytarish);

  }

  useEffect(() => {
    axios.get("https://api.npoint.io/17004af1e46256632540")
      .then((res) => {

        setdata(res.data.Search);
        setqaytarish(res.data.Search)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  return (
    <div>


      <div className='container-fluid'>
        <div className="container">
          <div className='row mt-5'>
            <div className='col-2'>
              <h2> BOOKSHELTER</h2>
            </div>
            <div className='col-8'>
              <input className='Search' onInput={(item) => Search(item.target.value)} type="text" placeholder='Qidiruv uchun nom kiriting' />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-4 text-center mt-5">
              <h4>Bookmarks</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, expedita.</p>
              {
                (Kitoblar.length === 0) ?
                  <></>
                  :
                  <>
                    {
                      Kitoblar.map((item, index) => {
                        return (
                          <div className='mt-5 '>
                            <h5>{item.Title}</h5>
                            <h5>{item.imdbID}</h5>
                          </div>
                        )
                      })
                    }
                  </>
              }
            </div>
            <div className="col-8">
              <div className='row  body'>

                {
                  (natija) && data.map((item) => {
                    return (
                      <div className='col-4 card p-2'>

                        <img width='70%' src={item.Poster} alt={item.Title} />
                        <h5 className='mx-5'>{item.Title}</h5>
                        <div className='d-flex ml-3'>
                          <button onClick={() => addFun(item)} className='btn btn-warning ms-5'>Bookmark</button>

                          <button type="button" onClick={() => Rightaddfun(item)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Batafsil
                          </button>

                        </div>


                      </div>
                    )
                  })
                }
                {
                  (!natija) && search.map((item) => {
                    return (
                      <div className='col-4 card p-2'>
                        <img width='70%' src={item.Poster} alt={item.Title} />
                        <h5 className='mx-5'>{item.Title}</h5>
                        <div className='d-flex ml-3'>
                          <button onClick={() => addFun(item)} className='btn btn-warning ms-5'>Bookmark</button>
                          <button type="button" onClick={() => Rightaddfun(item)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Batafsil
                          </button>
                        </div>
                      </div>
                    )
                  })
                }





                <div class="modal fade kbhj" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Kitob Haqida</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        {
                          (more.length === 0) ?
                            <></>
                            :
                            <>
                              {

                                more.map((item, index) => {
                                  return (
                                    <div className='mt-5 '>
                                      <img src={item.Poster} alt="" />
                                      <h5>{item.Title}</h5>
                                      <h5>{item.Type}</h5>
                                      {/* <h5>{item.imdbID}</h5> */}
                                    </div>
                                  )
                                })

                              }
                            </>
                        }

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;


