import React from 'react'
const Newsitem = (props) => {
    let {title, description,Url,newsUrl,author,date,source} = props;
    return (
      <div className="my-3">
       <div className="card">
       <div style={{display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                  }}>
       <span className="badge rounded-pill bg-danger" >{source}</span></div>
            <img src={!Url ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg":Url} className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} alt="..."/>
       <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className ="btn btn-sm btn-dark">Read More</a>
       </div>
       </div>
    </div>
    )
  }

export default Newsitem
