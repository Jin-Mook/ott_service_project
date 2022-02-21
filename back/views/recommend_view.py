from flask import Blueprint, jsonify
from models import Movies, Songs, Features, Movie_pcas
from cluster import get_nearest_movie
from movie_plot import return_synopsis

bp = Blueprint('recommend', __name__, url_prefix='/filter')

@bp.route('/recommend/<int:movie_id>', methods=["GET"])
def recommend(movie_id):
  movie_id1, movie_id2, movie_id3, movie_id4 = get_nearest_movie(movie_id)

  # 각 영화의 값으로는 movie_id, movie_title, movie_year, movie_director, sound_director, imdb, 
  # ott정보 리스트, country, Language, runtime, movie_age_rating, poster_url 정보를 준다.
  # songs테이블에서는 album_name, track_name, preview_url 값을 준다.

  movie1 = Movies.query.filter(Movies.id == movie_id1).first()
  movie1_song = Songs.query.filter(Songs.movie_id == movie_id1).first()
  movie1_feature = Features.query.filter(Features.movie_id == movie_id1).first()
  movie1_pca = Movie_pcas.query.filter(Movie_pcas.movie_id == movie_id1).first()
  movie2 = Movies.query.filter(Movies.id == movie_id2).first()
  movie2_song = Songs.query.filter(Songs.movie_id == movie_id2).first()
  movie2_feature = Features.query.filter(Features.movie_id == movie_id2).first()
  movie2_pca = Movie_pcas.query.filter(Movie_pcas.movie_id == movie_id2).first()
  movie3 = Movies.query.filter(Movies.id == movie_id3).first()
  movie3_song = Songs.query.filter(Songs.movie_id == movie_id3).first()
  movie3_feature = Features.query.filter(Features.movie_id == movie_id3).first()
  movie3_pca = Movie_pcas.query.filter(Movie_pcas.movie_id == movie_id3).first()
  movie4 = Movies.query.filter(Movies.id == movie_id4).first()
  movie4_song = Songs.query.filter(Songs.movie_id == movie_id4).first()
  movie4_feature = Features.query.filter(Features.movie_id == movie_id4).first()
  movie4_pca = Movie_pcas.query.filter(Movie_pcas.movie_id == movie_id4).first()

  # 이전 영화 정보의 feature들을 추가로 전달한다.
  selected_movie_feature = Features.query.filter(Features.movie_id == movie_id).first()


  response = []
  movies = [[movie1, movie1_song, movie1_feature, movie1_pca], [movie2, movie2_song, movie2_feature, movie2_pca], [movie3, movie3_song, movie3_feature, movie3_pca], [movie4, movie4_song, movie4_feature, movie4_pca]]
  
  for movie, song, feature, pcas in movies:
    data = {}
    data['movie_id'] = movie.id
    data['movie_title'] = movie.movie_title
    data['movie_year'] = movie.movie_year
    data['movie_director'] = movie.movie_director
    data['sound_director'] = movie.sound_director
    data['imdb'] = movie.imdb
    ott = {}
    ott['Netflix'] = movie.Netflix
    ott['Hulu'] = movie.Hulu
    ott['Prime'] = movie.Prime
    ott['Disney'] = movie.Disney
    data['ott'] = ott
    data['country'] = movie.country
    data['Language'] = movie.Language
    data['runtime'] = movie.runtime
    data['movie_age_rating'] = movie.movie_age_rating
    data['poster_url'] = movie.poster_url
    data['like_count'] = movie.like_count
    data['movie_plot'] = return_synopsis(movie.id)
    data['album_name'] = song.album_name
    data['track_name'] = song.track_name
    data['preview_url'] = song.preview_url
    features = {}
    features['acousticness'] = feature.acousticness
    features['danceability'] = feature.danceability
    features['energy'] = feature.energy
    features['tempo'] = feature.tempo
    features['valence'] = feature.valence
    features['instrumentalness'] = feature.instrumentalness
    features['liveness'] = feature.liveness
    features['loudness'] = feature.loudness
    features['speechiness'] = feature.speechiness
    data['features'] = features
    pca = {}
    pca['x'] = pcas.x
    pca['y'] = pcas.y
    data['pca'] = pca

    response.append(data)
  
  selected_movie = {}
  selected_movie['acousticness'] = selected_movie_feature.acousticness
  selected_movie['danceability'] = selected_movie_feature.danceability
  selected_movie['energy'] = selected_movie_feature.energy
  selected_movie['tempo'] = selected_movie_feature.tempo
  selected_movie['valence'] = selected_movie_feature.valence
  selected_movie['instrumentalness'] = selected_movie_feature.instrumentalness
  selected_movie['liveness'] = selected_movie_feature.liveness
  selected_movie['loudness'] = selected_movie_feature.loudness
  selected_movie['speechiness'] = selected_movie_feature.speechiness

  selected_movie_features = {}
  selected_movie_features['selected_features'] = selected_movie
  response.append(selected_movie_features)
  
  return jsonify(response)