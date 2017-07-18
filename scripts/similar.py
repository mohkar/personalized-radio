from lshash import LSHash
import sys
import json
import time
import hashlib

indexes = sys.argv[1]
point = sys.argv[2]
stringList = []

keys = json.loads(indexes)["keys"]
songMap = json.loads(indexes)["songMap"]
point = json.loads(point)["point"]

lsh = LSHash(6, 420)


for x in xrange(0, len(keys)):
    stringList.append(keys[x])
    lsh.index(keys[x])

result = lsh.query(point, num_results=1)
result = list(result[0][0])

for key, value in songMap.iteritems():
    if value == result :
        print key
        break