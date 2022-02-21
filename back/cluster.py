# movie index 넣으면 가까운 movie index 출력
from scipy.spatial import distance
import pandas as pd
import ast

# title, 정규화된 features, cluster, feature값들이 들어간 리스트가 들어간 csv
data = pd.read_csv('./feature_id_list.csv') 

# idx는 movie index
def get_nearest_movie(idx):
    cluster = data[data['ID'] == idx].values[0][-2] # movie가 속해있는 cluster 찾기
    clus_data = data[data['cluster'] == cluster]
    feature_list = ast.literal_eval(data[data['ID'] == idx].values[0][-1]) # str -> list
    index = data[data['ID'] == idx].index.values[0]
    
    dist_list = []
    for i, row in clus_data.drop(index).iterrows():
        row_feature_list = ast.literal_eval(row['feature_list'])
        dist = distance.euclidean(feature_list, row_feature_list)
        dist_list.append((row['ID'], dist))
        dist_list = sorted(dist_list, key=lambda x: x[1])
    close1 = dist_list[0][0] # movie index
    close2 = dist_list[1][0]
    close3 = dist_list[2][0]
    close4 = dist_list[3][0]
    
    return close1, close2, close3, close4