# 유저가 장르를 선택하고 최종 결과를 확인하는 라우터
from flask import Blueprint, json, request, session, jsonify
from models import Movies, Genres, Songs, Features
from random import randint

bp = Blueprint('service', __name__, url_prefix='/filter')

# 장르에 따라 랜덤으로 한개의 영화 id와 genre제목을 추출해주는 함수
def select_movie_by_genre(genre_id):
  movie_lists = Genres.query.filter(Genres.genre_id == genre_id).all()

  # movie_lists에서 랜덤으로 한개를 뽑는다.
  random_index = randint(0, len(movie_lists)-1)
  selected_movie = movie_lists[random_index]

  return selected_movie.movie_id, selected_movie.genre

# 전달받은 속성의 값에 따라 db에 조건을 줄 boundary의 시작과 끝을 설정해주는 함수
def make_boundary(value, feature):
  if feature == 'danceability':
    if value <= 30:
      start = 0
      end = 0.197
    elif value <= 50:
      start = 0.197
      end = 0.351
    elif value <= 70:
      start = 0.351
      end = 0.564
    else:
      start = 0.564
      end = 1
  elif feature == 'energy':
    if value <= 30:
      start = 0
      end = 0.104
    elif value <= 50:
      start = 0.104
      end = 0.233
    elif value <= 70:
      start = 0.233
      end = 0.452
    else:
      start = 0.452
      end = 1
  elif feature == 'tempo':
    if value <= 30:
      start = 0
      end = 0.377
    elif value <= 50:
      start = 0.377
      end = 0.498
    elif value <= 70:
      start = 0.498
      end = 0.601
    else:
      start = 0.601
      end = 1
  else:
    if value <= 30:
      start = 0
      end = 0.039
    elif value <= 50:
      start = 0.039
      end = 0.086
    elif value <= 70:
      start = 0.086
      end = 0.272
    else:
      start = 0.272
      end = 1
  return start, end

# 한 특성 (예를들어 energy)을 지정하고 해당 boundary에 값을 갖는 song을 가져오는 함수
# 이때 만약 song에 preview_url값이 없다면 제외 시킨다.
def filter_songs(feature, start, end, song):
  check_song = Songs.query.filter(Songs.movie_id == song.movie_id).first()

  if check_song.preview_url == '':
    return False
  else:
    # Features모델에서 정의한 get_feature를 이용해 특성값을 가져온다.
    attr = song.get_feature(feature)
    if attr >= start and attr <= end:
      return song
  
  return False



# 처음 유저가 서비스를 시작했을때 장르를 선택하게 하는 부분에 필요한 정보를 주는 api이다.
# 음원 주소, 음원 title, 영화 포스터 정보를 response에 담아서 주면 된다.
@bp.route('/genre')
def send_music_data():
  # 장르 테이블에서 5개의 장르를 고르고 리스트 형태로 받아온다.
  # Comedy(2)  Thriller(3)   Romance(4)  Action(5)   Sci-Fi(12) 선택  
  genre_ids = [2, 3, 4, 5, 12]
  
  # 데이터를 찾는 과정에서 음원이나 포스터데이터가 없으면 다시 반복한다.
  
  movie_ids = []  # 선택한 영화가 중복인지 체크하기 위한 리스트
  response = []   # 최종 보낼 데이터를 담을 리스트
  index = 0
  while index < len(genre_ids):
    data = {}  # 하나의 데이터 정보가 담길 예정  {'장르': 'Comedy', '트랙주소': 'preview_url', '포스터': 'poster_url', '트랙이름': 'track_name'} 의 형태

    # 각 장르 아이디를 이용해 영화 id와 장르를 가져온다.
    genre_id = genre_ids[index]
    movie_id, movie_genre = select_movie_by_genre(genre_id)

    # 만약 이미 선택한 아이디라면 다시 뽑는다.
    while movie_id in movie_ids:
      movie_id, movie_genre = select_movie_by_genre(genre_id)
    
    movie_ids.append(movie_id)
    
    # 찾은 movie_id를 통해 movies테이블에서 poster_url를 , songs테이블에서 preview_url와 track_name을 가져온다.
    # 이때 찾는 값들이 없다면 다시 처음으로 돌아가고 모든 값들이 있다면 index값을 1 증가 시킨다.
    movie = Movies.query.filter(Movies.id == movie_id).first()
    if movie.poster_url == '':
      continue

    song = Songs.query.filter(Songs.movie_id == movie_id).first()
    if song.preview_url == '' or song.track_name == '':
      continue

    # 빈 값이 없는것을 확인했다면 data객체에 추가해준다.
    data['id'] = genre_ids[index]
    data['genre'] = movie_genre
    data['track_url'] = song.preview_url
    data['cover_img'] = movie.poster_url
    data['track_title'] = song.track_name

    # response에 추가해주고 index를 1 증가시킨다.
    response.append(data)
    index += 1

  return jsonify(response)


# 유저에게 영화 장르와 음악 세부 정보 데이터를 전달받는다.
# 해당 정보와 비슷한 영화들을 필터링해서 총 12개의 영화 데이터를 보내주는 api이다.
@bp.route('/movies', methods=['POST'])
def send_movies_list():
  result = request.get_json()
  # result 형태
  # result = {
  #   'genre': 12,
  #   "music_features": {
  #     "danceability" : 100,
  #     "energy": 60,
  #     "tempo": 10,
  #     "valence": 70,
  #   }
  # }

  # 변수에 전달받은 값 담기
  # 장르 id는 1, 2, 3, 4, 5, 12 중 하나 [ Comedy(2)  Thriller(3)   Romance(4)  Action(5)  Sci-Fi(12)]
  genre_id = result['genre']
  features = result['music_features']
  danceability = features['danceability']
  energy = features['energy']
  tempo = features['tempo']
  valence = features['valence']

  # 유저가 선택한 장르에 해당하는 영화 id 를 가져온다.
  genre_filter = Genres.query.filter(Genres.genre_id == genre_id).all()

  movie_ids = [genre.movie_id for genre in genre_filter]  
  
  # songs에 유저가 선택한 장르의 영화들의 음악정보들이 담겨있다.
  songs = []
  for movie_id in movie_ids:
    songs += Features.query.filter(Features.movie_id == movie_id).all()


  # 음악 세부정보는 acousticness,danceability,energy,tempo,valence
  cycle = 0
  feature_list1 = [danceability, energy, tempo, valence]   # 실제 특성 값들이 들어감
  feature_list2 = ['danceability', 'energy', 'tempo', 'valence']   # 특성 값들의 이름이 들어감
  while cycle < 4:
    new_songs = []
    for song in songs:
      start, end = make_boundary(feature_list1[cycle], feature_list2[cycle])
      new_song = filter_songs(feature_list2[cycle], start, end, song)

      if new_song:
        new_songs.append(new_song)
    
    # 필터링 된 곡들의 리스트 즉, new_songs가 빈 리스트라면 혹은 3개 이하라면 while문을 멈추고 이전 songs를 반환한다.
    if new_songs == [] or len(new_songs) < 4:
      break
    # new_songs의 값이 하나라도 있으면 cycle을 1 증가시키고 songs를 new_songs로 바꾼다.
    else:
      songs = new_songs
      cycle += 1


  # 여기서 반환된 songs에는 모든 필터를 거친 영화의 음악 특성이 들어있는 배열의 형태이다.
  response = []
  
  for song in songs:
    data = {}
    movie = Movies.query.filter(Movies.id == song.movie_id).first()
    song_url = Songs.query.filter(Songs.movie_id == song.movie_id).first()
    
    data['movie_id'] = song.movie_id
    data['movie_title'] = movie.movie_title
    data['poster_url'] = movie.poster_url
    data['preview_url'] = song_url.preview_url
    response.append(data)

  return jsonify(response)