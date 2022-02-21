import requests
from urllib.error import HTTPError
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
import pandas as pd

movie_info = pd.read_csv('movie_info.csv')
movie_info.head()

def return_synopsis(id):
    row = movie_info[movie_info['id'] == id]
    movie_url = row['movie_url'].values[0]
    if movie_url == '0':
        return "0" # movie_url이 없을 때 return 값
    try:
        session = requests.Session()
        retry = Retry(connect=3, backoff_factor=0.5)
        adapter = HTTPAdapter(max_retries=retry)
        session.mount('https://', adapter)

        url = f"https://movie.naver.com{movie_url}"
        html = session.get(url, timeout=120).text
    except HTTPError as e:
        pass
    else:
        soup = BeautifulSoup(html, 'html.parser')
        if not soup.find('p', {'class':'con_tx'}):
            return '0'
        result = soup.find('p', {'class':'con_tx'}).text.replace('\r\xa0', ' ')
        return result
