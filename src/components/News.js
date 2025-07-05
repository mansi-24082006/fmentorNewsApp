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
    try {
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });

      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);

      if (parsedData.status === "ok") {
        this.setState({
          articles: parsedData.articles || [],
          totalResults: parsedData.totalResults || 0,
          loading: false,
        });
      } else {
        console.error("API Error:", parsedData);
        this.setState({ loading: false });
      }

      this.props.setProgress(100);
    } catch (error) {
      console.error("Network/API Error:", error);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  }

  async componentDidMount() {
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    this.updateNews();
  }

  fetchMoreData = async () => {
    try {
      const nextPage = this.state.page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status === "ok") {
        this.setState({
          articles: this.state.articles.concat(parsedData.articles || []),
          totalResults: parsedData.totalResults || 0,
          page: nextPage,
        });
      } else {
        console.error("API Error while fetching more:", parsedData);
      }
    } catch (error) {
      console.error("Fetch More Error:", error);
    }
  };

  render() {
    const { articles, loading, totalResults } = this.state;

    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 10px", marginTop: "90px" }}>
          NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles?.length || 0}
          next={this.fetchMoreData}
          hasMore={articles?.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {Array.isArray(articles) && articles.length > 0 ? (
                articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title || ""}
                      description={element.description || ""}
                      Url={element.urlToImage || ""}
                      newsUrl={element.url}
                      author={element.author || "Unknown"}
                      date={element.publishedAt}
                      source={element.source?.name || "Unknown"}
                    />
                  </div>
                ))
              ) : (
                !loading && <h3 className="text-center">No Articles Available</h3>
              )}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
