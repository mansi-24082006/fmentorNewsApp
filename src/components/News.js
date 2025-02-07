// import React, { Component } from "react";
// import Newsitem from "./Newsitem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from 'react-infinite-scroll-component';
// export class News extends Component {
//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
//   constructor(props) {
//     //Constructor runs only one codition making one object it's required..
//     super(props);
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       totalResults:0
//     }
//     document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
//     // this.setState({ articles: parsedData.articles, loading: false, page:1});
//   }
//   async updateNews() {
//     this.props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     this.props.setProgress(30);
//     let parsedData = await data.json();
//     this.props.setProgress(70);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     })
//     this.props.setProgress(100);
//   }
// //   useEffect(() => {
// //     document.title = `${capitalizeFirstLetter(PROPS.category)} - NewsApp`;
// //     updateNews();
// // },[]);
  
//   async componentDidMount() {
//     this.updateNews();
//   }
//   fetchMoreData = async () => {
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     setPage(page+1)
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//     })
//   }

//   render() {
//     return (
//       <>
//         <h1 className="text-center" style={{ margin: "40px 10px" , marginTop : '90px'}}>
//           NewsApp - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines
//         </h1>
//         {this.state.loading && <Spinner />}
//         <InfiniteScroll
//               dataLength={this.state.articles.length}
//               next={this.fetchMoreData}
//               hasMore={this.state.articles.length !== this.state.totalResults}
//               loader={<Spinner />}
//         >
//         <div className="container">
//         <div className="row">
//           {Array.isArray(this.state.articles) &&
//           this.state.articles.length > 0 ? (
//             !this.state.loading &&
//             this.state.articles.map((element, index) => (
//               <div className="col-md-4" key={element.url}>
//                 <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} Url = {element.urlToImage} newsUrl={element.url} author={element.author} date = {element.publishedAt} source={element.source.name} />
//               </div>
//             ))
//           ) : (
//             <h3>Loading or No Articles Available</h3>
//           )}
//         </div>
//         </div>
//         </InfiniteScroll>
//         </>
//     );
//   }
// }
// News.defaultProps = {
//   country: "in",
//   pageSize: 8,
//   category: "general",
// }
// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// }

// export default News;
import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });

    this.props.setProgress(100);
  }

  async componentDidMount() {
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    this.updateNews();
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: nextPage, // Correctly updating the page
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 10px", marginTop: "90px" }}>
          NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {Array.isArray(this.state.articles) && this.state.articles.length > 0 ? (
                this.state.articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title || ""}
                      description={element.description || ""}
                      Url={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                ))
              ) : (
                <h3>Loading or No Articles Available</h3>
              )}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired, // Ensuring apiKey is provided
  setProgress: PropTypes.func.isRequired, // Ensuring setProgress function is provided
};

export default News;
