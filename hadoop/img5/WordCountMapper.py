#!/usr/bin/env python3

import sys

for line in sys.stdin:
    line = line.strip().lower() # 영어를 소문자로 만듦
    words = line.split()

    for word in words:
        print("{}\t1".format(word))