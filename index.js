let {createRoot}=ReactDOM
let {useState}=React
let url="https://demo2-b0b79-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json"
let App=()=>
{
let [traveldata,settraveldata]=useState({})
let [flag,setFlag]=useState(false)
let [mflag,setmflag]=useState(true)
let [theme,setTheme]=useState(true)
let [search,setsearch]=useState("")

let fetchdata=()=>
    {
       
        axios.get(url)
        .then((res)=>
        {
            
            settraveldata(res.data)
            localStorage.setItem("traveldata",JSON.stringify(res.data))
            
        })
        .catch((error)=>{console.log(error)})


   
    }
    if(!flag)
        {
          fetchdata()
          setFlag(!flag)
            
        }

    let Showdata=({traveldata,fetchdata,mflag,setmflag})=>
    {

        let handledelete=(id)=>
            {
               
                axios.delete(`https://demo2-b0b79-default-rtdb.asia-southeast1.firebasedatabase.app/destinations/${id}.json`)
                .then((res)=>
                {
                    fetchdata()
                   alert("data deleted successfully")
                   
                })
                .catch((error)=>{console.log(error)})
        
        
           
            }
            let handleupdate=(id,ele)=>
                {
                    let updatename=prompt("enter name",ele.name)
                    let updatecountry=prompt("enter country name",ele.country)
                   
                    axios.patch(`https://demo2-b0b79-default-rtdb.asia-southeast1.firebasedatabase.app/destinations/${id}.json`,{...ele,name:updatename,country:updatecountry})
                    .then(()=>
                    {
                        fetchdata()
                       alert("data updated successfully")
                       
                    })
                    .catch((error)=>{console.log(error)})
            
            
               
                }
        let [pagedata,setPagedata]=useState({})
        let [page,setPage]=useState(true)
        console.log(traveldata)

        let handlesinglepage=(ele)=>
            {
               setPagedata(ele)
               setPage(!page)
            }
       
        return(
            
            <>
            <button className="btn btn-primary mx-2" onClick={()=>{setmflag(!mflag)}}>Add Data</button>
            {page?
            <div className="container">
           {
            Object.entries(traveldata).map(([id,ele])=>
            {
                return(
                  <div key={id} className="card" >
                    
                    <img src={ele.profileImg}/>
                   
                    <p><b>Name : </b>{ele.name}</p>
                    <p><b>Country : </b>{ele.country}</p>
                    <p><b>AverageBudget : </b>{ele.averageBudget}</p>
                    {ele.adminFlag?<><button className="btn btn-primary my-2" onClick={()=>{handleupdate(id,ele)}}>Update</button><button className="btn btn-primary my-2" onClick={()=>{handledelete(id)}}>Delete</button></>:<h4>View Access only</h4>}
                    <button className="btn btn-primary my-2" onClick={()=>{handlesinglepage(ele)}}>View Detail</button>
                    
                    </div>
                    
                )
            })
            }
            </div>
            :
            <>
            <button className="btn btn-primary" onClick={()=>{setPage(!page)}}>Back to home</button>
            <div  className="card" >
                    
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={pagedata.profileImg} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={pagedata.additionalImages[0]} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={pagedata.additionalImages[1]} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
                   
                    <p><b>Name : </b>{pagedata.name}</p>
                    <p><b>Country : </b>{pagedata.country}</p>
                    <p><b>AverageBudget : </b>{pagedata.averageBudget}</p>
                    {pagedata.adminFlag?<><button>Update</button><button>Delete</button></>:<h4>View Access only</h4>}
                    
                    </div>
                    </>
           
    }
            </>
        
        )
    }

    let Form=({mflag,setmflag,fetchdata})=>
    {
        let [placename,     setplacename]=useState("")
        let [country  ,   setcountry]=useState("")
        let [description ,    setdescription]=useState("")
        let [profileImg   ,  setprofileImg]=useState("")
        let [additionalImg1  ,   setadditionalImg1]=useState("")
        let [additionalImg2  ,   setadditionalImg2]=useState("")
        let [averageBudget    , setaverageBudget]=useState("")
        let [adminflag,setadminflag]=useState(false)

        let handlesubmit=(e)=>
        {
            e.preventDefault()
            let obj={name:placename,    
                country  ,   
                description , 
                profileImg   ,
                additionalImages: [
                  additionalImg1,
                  additionalImg2
        ],
                
                
                averageBudget ,
                adminFlag:adminflag}

                axios.post(url,obj)
                .then(()=>{
                    fetchdata()
                    setplacename("")   
                    setcountry("")  
                    setdescription("")
                    setprofileImg("")
                    setadditionalImg1("")
                    setadditionalImg2("")
                    setaverageBudget("") 
                    setadminflag(false)
                    alert("data added successfully")
                })
                .catch((error)=>{
                    console.log(error)
                })

        }
        return(
            <>
            <button className="btn btn-primary mx-2" onClick={()=>{setmflag(!mflag)}}>Back to home</button>
            <form onSubmit={handlesubmit}>
            <input placeholder="enter place name" value={placename} onChange={(e)=>{setplacename(e.target.value)}}/>
            <input placeholder="enter country name" value={country} onChange={(e)=>{setcountry(e.target.value)}}/>
            <input placeholder="enter description" value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            <input type="url" placeholder="enter profile image" value={profileImg} onChange={(e)=>{setprofileImg(e.target.value)}}/>
            <input type="url" placeholder="enter additional image-1 link" value={additionalImg1} onChange={(e)=>{setadditionalImg1(e.target.value)}}/>
            <input type="url" placeholder="enter additional image-2 link" value={additionalImg2} onChange={(e)=>{setadditionalImg2(e.target.value)}}/>
            <input placeholder="enter averageBudget" type="number" value={averageBudget} onChange={(e)=>{setaverageBudget(e.target.value)}}/>
          <label>enter Admin access <input type="checkbox" checked={adminflag}  onChange={()=>{setadminflag(!adminflag)}}/>  </label>  
              <input type="submit"/>
            </form>
            
            </>
        )
    }

   
  
    
      function App() {
        return (
          <div className="container mt-5">
            <h1>React Bootstrap Carousel</h1>
            <Carousel />
          </div>
        );
      }

      let handleselect1=(e)=>
      {
        if(e.target.value=="allcountry")
          {
          
           fetchdata()
            
          }
          else 
          {
        let ldata= JSON.parse(localStorage.getItem("traveldata"))
        let narr=Object.entries(ldata).filter(([id,ele])=>ele.country.toLowerCase()==e.target.value.toLowerCase())
console.log(narr)
        let nobj={}
       for(let i=0;i<narr.length;i++)
       {
        
           nobj={...nobj,[narr[i][0]]:narr[i][1]}
       }
       console.log(nobj)
        settraveldata(nobj)
      }
      }
      let handleselect2=(e)=>
      {
        if(e.target.value=="allcategory")
          {
          
           fetchdata()
            
          }
          else if(e.target.value=="category1")
          {
            let ldata= JSON.parse(localStorage.getItem("traveldata"))
            let narr=Object.entries(ldata).filter(([id,ele])=>ele.averageBudget<2000)
    console.log(narr)
            let nobj={}
           for(let i=0;i<narr.length;i++)
           {
            
               nobj={...nobj,[narr[i][0]]:narr[i][1]}
           }
           console.log(nobj)
            settraveldata(nobj)
          }
          else if(e.target.value=="category2")
            {
              let ldata= JSON.parse(localStorage.getItem("traveldata"))
            let narr=Object.entries(ldata).filter(([id,ele])=>ele.averageBudget>=2000&&ele.averageBudget<3000)
    console.log(narr)
            let nobj={}
           for(let i=0;i<narr.length;i++)
           {
            
               nobj={...nobj,[narr[i][0]]:narr[i][1]}
           }
           console.log(nobj)
            settraveldata(nobj)
            }
          else if(e.target.value=="category3")
              {
                let ldata= JSON.parse(localStorage.getItem("traveldata"))
                let narr=Object.entries(ldata).filter(([id,ele])=>ele.averageBudget>=3000)
        console.log(narr)
                let nobj={}
               for(let i=0;i<narr.length;i++)
               {
                
                   nobj={...nobj,[narr[i][0]]:narr[i][1]}
               }
               console.log(nobj)
                settraveldata(nobj)
              }
      }
    return(
      
        <div className={theme?"light":"dark"}>
         
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Travel Destinations</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <select onChange={handleselect1}>
             <option value="allcountry">filter by country</option>
             <option value="allcountry">All Countries</option>
             <option value="japan">Japan</option>
             <option value="france">France</option>
             <option value="australia">Australia</option>

          </select>
          <select onChange={handleselect2}>
             <option value="allcategory">filter by Average Budget</option>
             <option value="allcategory">All Category</option>
             <option value="category1">AvgBudget less than 2000</option>
             <option value="category2">AvgBudget equal to or greater than 2000 and less than 3000</option>
             <option value="category3">AvgBudget greater than 3000</option>
            

          </select>

           <button className="btn btn-primary" onClick={()=>{setTheme(!theme)}}>Theme Toggle</button> 
        </li>
        </ul>
   
      
      <input value={search} placeholder="enter place name" onChange={(e)=>{
          console.log(e.target.value.length)
          if(e.target.value.length==0)
          {
          
           fetchdata()
            
          }
          else 
          {
         
          
            let ldata= JSON.parse(localStorage.getItem("traveldata"))
            let narr=Object.entries(ldata).filter(([id,ele])=>ele.name.toLowerCase()==e.target.value.toLowerCase())
console.log(narr)
            let nobj={}
           for(let i=0;i<narr.length;i++)
           {
            
               nobj={...nobj,[narr[i][0]]:narr[i][1]}
           }
           console.log(nobj)
            settraveldata(nobj)
              
            
            
       
            

          }
          
          setsearch(e.target.value)}}/>
      
    </div>
  </div>
</nav>
       


         
       {mflag?
        
        <Showdata traveldata={traveldata} fetchdata={fetchdata} mflag={mflag} setmflag={setmflag}/>
       :
       <Form mflag={mflag} setmflag={setmflag} fetchdata={fetchdata}/>
      
       }
        </div>
       

)
}
let root=createRoot(document.getElementById("root"))
root.render(<App/>)
