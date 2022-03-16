# 서비스명
### 음화당 : 음악을 좋아하는 당신께, 이 영화를 드려요.
- 음악적 요소 기반의 영화 추천 서비스 입니다.
<br>

# 프로젝트 구성 안내

### 1. 프로젝트 소개

  - 웹서비스에 대한 자세한 개요 : 영화 타이틀곡의 음악적 요소를 기반으로 데이터 분석을 하여 영화를 추천해주는, 음악적 요소 기반 영화 추천 서비스 입니다.  
  - 평소에 음악을 즐겨 듣는, 특히 영화에서의 음악을 중시하는 사용자가 저희 서비스의 주요 대상입니다. 
  
  1. 유저는 다섯가지의 서로 다른 분위기 영화 타이틀곡 중에 하나를 선택하게 되며, 저희는 그 타이틀곡들이 속해있는 영화의 장르로 데이터베이스를 한번 필터링 합니다. 
  2. 그 다음, 유저가 현재 느끼는 감정 (혹은 유저가 원하는 무드)과 음악의 템포를 입력하게 되면, 저희는 그것을 기반으로 데이터베이스를 한번 더 필터링 합니다. 음악적 요소들은 다음과 같습니다: **energy, danceability, valence, tempo**
  3. 다음으로, 유저는 영화 음악을 선택하게 되고, 저희는 그 영화가 가진 음악 요소들을 이용해 데이터 분석을 해서 유저가 선택한 영화와 가장 비슷한 영화, 두번째, 세번째, 네번째로 비슷한 영화들을 추천해 줍니다. 데이터 분석에 사용되는 음악적 요소들은 다음과 같습니다 : **acousticness, danceability, energy, tempo, valence, instrumentalness, liveness, loudness, speechiness** 


### 2. 프로젝트 개요 
  - 영화의 분위기와 영화의 타이틀곡의 분위기는 상당히 비슷할 것이라는 가정으로 시작합니다. 
  - 영화에서 사용된 음악을 기반으로 영화를 추천해 주기에, 평소에 음악을 즐겨 들으시거나 영화에서의 음악이 차지하는 비중이 크다는 믿음이 있으신 유저에게 유용한 솔루션입니다. 
  - 추천은 보통 추천 받는 사람과 추천 해 주는 사람의 주관에 따라 굉장히 다른 만족을 줍니다. 하지만 데이터를 분석하여 그 결과를 추천해 준다면, 가능한 최대한 객관적인 추천이 될 수 있습니다. 개개인에 최적화 되었다기보다는 많은 사람에게 만족스러운 결과를 주는 것을 목표로 했습니다. 

### 3. DB 스키마
- 영화 장르의 경우 한 개의 영화가 여러 장르를 갖는 경우가 있기 때문에 따로 분리했습니다.
- 음악과 음악에 해당하는 특징과 관련된 테이블은 추후 확장성을 고려하여 따로 분리했습니다.
- movie_pcas 테이블은 이후에 K-means 알고리즘에서 사용한 분류에 필요한 테이블입니다.
<img src="https://user-images.githubusercontent.com/91299082/158537765-ac9270bc-f234-43b4-8f1b-d53365ea6ee2.png" width="80%" height="80%">


### 4. 서비스 시연 영상
- [프로젝트 와이어프레임](https://whimsical.com/final-wireframe-7USzDdZwGbqwxuBVdz6vHF) 
- 앨범에 마우스를 호버시키면 해당하는 음악이 나오게 됩니다.
<img src="./service_gif.gif" width="100%" height="100%"/>

### 5. 기술 스택
#### 백엔드
|기술|특징|
|:---:|:---:|
|Flask|Django에 비해 구현이 간단한 Flask를 이용하였습니다.|
|Flask_sqlalchemy|ORM을 이용해 객체 형식으로 코드를 작성하기 위해 선택하였습니다.|
|MySQL|가장 널리 사용되는 DB이며 준수한 속도를 보장하기 때문에 선택하였습니다.|
|flask_migrate|ORM으로 DB 스키마를 만들고 수정하기 위해 사용했습니다.|
<br>

# 나의 역할 및 작성한 주요 코드
- DB 스키마 설계
- DB에 데이터 넣기
- 메인 서비스 api 작성
- CSS 작업
```
project
|
|---- back
|       |---- views
|       |       |---- main_service.py
|       |       |---- recommend_view.py
|       |
|       |---- app.py
|       |---- models.py
|
|---- data
|       |---- data_tuning.py
|       |---- genre_data_input.py
|       |---- make_genre_for_data_tuning.py
|       |---- movie_load.py
|       |---- movie_pca_input.py
|       |---- song_data_input.py
|       |---- song_feature_data_input.py
```
### DB에 데이터 넣기
- ORM을 이용하지 않고 직접 pymysql을 이용해 sql쿼리를 이용하여 작성하였습니다.
- for 문을 돌면서 csv파일의 데이터를 하나하나 DB에 insert문을 이용해 넣어주었습니다.
```python
import pymysql.cursors
import csv

connection = pymysql.connect(
  host = 'localhost',
  user = 'root',
  password = 'root',
  database = 'data_project',
  charset = 'utf8',
  cursorclass = pymysql.cursors.DictCursor
)

with connection:
  with connection.cursor() as cursor:
    sql = 'insert into `songs` (`movie_id`, `music_director`, `album_name`, `track_name`, `preview_url`, `popularity`) values (%s, %s, %s, %s, %s, %s)'

    with open('encode_song.csv', encoding='utf-8') as datas:
      records = csv.reader(datas, delimiter=',')
      next(records)
      for row in records:
        new_row = []
        for i in range(1, 8):
          if i == 2:
            continue
          new_row.append(row[i])
        # print(new_row)
        print(new_row)
        cursor.execute(sql, tuple(new_row))
      
  connection.commit()
```
### 유저의 취향에 맞는 영화 12개의 정보를 전달하는 api
- 만약 해당하는 영화가 12개보다 작으면 4개 이상일 때 멈춥니다.
- 유저가 선택한 세부정보들을 차례대로 확인하면서 세부정보에 해당하는 영화들의 목록을 거르는 형태입니다.

```python
# 유저에게 영화 장르와 음악 세부 정보 데이터를 전달받는다.
# 해당 정보와 비슷한 영화들을 필터링해서 총 12개의 영화 데이터를 보내주는 api이다.
@bp.route('/movies', methods=['POST'])
def send_movies_list():
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
```
<br>

# 프로젝트를 진행하며 느낀점 및 아쉬운점
#### 느낀점
- 협업을 처음 진행해보니 정말 팀원간 의사소통이 얼마나 중요한지 느낄 수 있었습니다.
- 어떤 서비스를 만들때 개발자의 입장도 중요하지만, 결국에는 서비스의 이용자에서 기획을 진행해야 좋은 서비스가 만들어 질 수 있다는 것을 느꼈습니다.
- 프로젝트를 진행하기 전까지 많은 공부를 했지만 아직은 많이 부족하다는 것을 느낄 수 있었고, 새로운 기술을 공부하면서 기술을 익히는데에 드는 막연한 두려움을 떨쳐낼 수 있었습니다.

#### 아쉬운점
- swagger 같은 문서 작성 도구를 사용해보지 못한 부분이 좀 아쉬웠습니다.
- 배포를 결국 실패해서 같이 진행한 다른 분이 배포를 성공하셨는데 배포를 진행하며 너무나 많은 에러를 맞이하였고 이를 해결하기 위해 docker를 공부해야겠다고 느꼈습니다.
- 팀원간 얘기한 부분에 대한 문서화가 잘 진행되지 못하여 중간중간 팀원끼리 서로 다르게 이해하는 부분이 발생하였는데, 문서화가 얼마나 중요한지 느낄 수 있었습니다.













