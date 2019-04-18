import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/MovieService";
import { getGenres } from "../services/GenreService";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/SearchBox";
import { toast } from "react-toastify";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  async componentDidMount() {
    const { data: dbGenres } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All genres" }, ...dbGenres];

    this.setState({
      movies,
      genres
    });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  filterOnGenre = allMovies => {
    const { selectedGenre } = this.state;
    return allMovies.filter(m => m.genre._id === selectedGenre._id);
  };

  filterOnSearch = allMovies => {
    const { searchQuery } = this.state;
    return allMovies.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered;
    if (selectedGenre && selectedGenre._id) {
      filtered = this.filterOnGenre(allMovies);
    } else if (searchQuery) {
      filtered = this.filterOnSearch(allMovies);
    } else {
      filtered = allMovies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;
    const { user } = this.props;

    if (!(allMovies.length > 0)) {
      return (
        <React.Fragment>
          <h1>Movie Database</h1>
          <h3>There are no movies in the database.</h3>
        </React.Fragment>
      );
    }

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <h1>Movie Database</h1>
          <h3>Showing {totalCount} movies in the database.</h3>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
